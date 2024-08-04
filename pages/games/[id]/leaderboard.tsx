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
            <p className="font-bold w-1/3">{entry.score.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await leaderBoard(req.params.id), req)
}

export async function getLeaderboardForUser(
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
