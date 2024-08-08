import type { Leaderboard } from "@prisma/client"
import type { SessionRequest } from "@session"
import getConfig from "@config"
import { getLeaderboardForUser } from "./leaderboard"
import db from "@db"
import crypto from 'node:crypto'
import { updateLeaderboard } from "./score-parser"

export async function getEncryptionKey(userid: number) {
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  )

  const res = await crypto.subtle.exportKey('jwk', key)
  keys[userid] = key
  return btoa(JSON.stringify(res))
}

async function decrypt(key: crypto.webcrypto.CryptoKey, msg: {
  iv: string,
  msg: string
}) {
  const buffer = await crypto.subtle.decrypt({
    name: 'AES-GCM',
    iv: Buffer.from(msg.iv, 'base64')
  },
    key,
    Buffer.from(msg.msg, 'base64')
  )

  return new TextDecoder().decode(buffer)
}

async function encrypt(key: crypto.webcrypto.CryptoKey, data: string) {
  const iv = crypto.randomBytes(12)
  const buffer = new TextEncoder().encode(data)
  const encrypted = Buffer.from(await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    buffer
  )).toString('base64')

  return { encrypted, iv: Buffer.from(iv).toString('base64') }
}

export async function get(req: SessionRequest) {
  const user = req.session?.user
  if (user == null) {
    return Response.json(
      {
        message: 'You must be logged in to submit a score'
      },
      {
        status: 401
      }
    )
  }

  const key = keys[user.id]
  if (key == undefined) {
    return Response.json(
      {
        message: 'Key not found'
      },
      {
        status: 404
      }
    )
  }

  const data = await getLeaderboardForUser(user.id, req.params.id)
  const msg = await encrypt(key, data.gameData)

  return Response.json(msg,
    {
      status: 200
    }
  )
}

export const keys: Record<number, crypto.webcrypto.CryptoKey> = {}

export async function post(req: SessionRequest) {
  if (!req.body) {
    return {
      status: 400,
      body: {
        message: 'No score provided'
      }
    }
  }

  const gameId = req.params.id
  const user = req.session?.user


  if (user == null) {
    return Response.json(
      {
        message: 'You must be logged in to submit a score'
      },
      {
        status: 401
      }
    )
  }
  const userKey = keys[user.id]

  const data = await decrypt(userKey, req.data.data)

  await updateLeaderboard(gameId, user.id, data)
  return Response.json(
    {
      message: 'Score submitted'
    },
    {
      status: 200
    }
  )
}
