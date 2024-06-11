import getConfig from '@config'
import db from '@db'
import { renderPage } from '@main'
import type { Leaderboard } from '@prisma/client'
import type { SessionRequest } from '@session'

async function leaderBoard(gameId: string) {
  const entries = await db.leaderboard.findMany({
    where: {
      gameId
    },
    orderBy: {
      score: getConfig().games[gameId].leaderboard.order
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <div>
      <h1>Rebricek hry {getConfig().games[gameId].name}</h1>
      <ul>
        {entries.map((entry, i) => (
          <li className="flex m-1" key={i}>
            <p className="w-1/6 text-right pr-2">{i + 1}.</p>{' '}
            <p className="w-1/2">{entry.user.name}</p>{' '}
            <p className="font-bold w-1/3">{entry.score}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await leaderBoard(req.params.id), req)
}

export async function post(req: SessionRequest) {
  if (!req.body) {
    return {
      status: 400,
      body: {
        message: 'No score provided'
      }
    }
  }

  const score = req.data.score
  console.log(score)
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

  const leaderboard = await getLeaderboardForUser(user.id, gameId, score)
  if (isBetterScore(score, leaderboard, gameId)) {
    await db.leaderboard.update({
      where: {
        id: leaderboard.id
      },
      data: {
        score,
        gameData: req.jsonBody.data,
        createdAt: new Date()
      }
    })
  } else {
    await db.leaderboard.update({
      where: {
        id: leaderboard.id
      },
      data: {
        gameData: req.jsonBody.data
      }
    })
  }

  return Response.json(
    {
      message: 'Score submitted'
    },
    {
      status: 200
    }
  )
}

function isBetterScore(
  score: number,
  leaderboard: Leaderboard,
  gameId: string
) {
  if (getConfig().games[gameId].leaderboard.order == 'asc') {
    return score < leaderboard.score
  } else {
    return score > leaderboard.score
  }
}

async function getLeaderboardForUser(
  userid: number,
  gameId: string,
  score: number = 0
): Promise<Leaderboard> {
  const ld = await db.leaderboard.findFirst({
    where: {
      gameId,
      userId: userid
    }
  })

  if (ld == null) {
    return db.leaderboard.create({
      data: {
        gameId,
        userId: userid,
        score: score,
        gameData: '{}'
      }
    })
  } else {
    return ld
  }
}
