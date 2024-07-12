import db from "@db"
import { getLeaderboardForUser } from "./leaderboard"
import type { Leaderboard } from "@prisma/client"
import getConfig from "@config"

function getScore(gameId: string, gameData: Record<string, string>) {
  console.log(gameId, gameData)
  switch (gameId) {
    case 'drift-boss':
      return JSON.parse(gameData['mjs-drift-boss-game-v1.0.1-dailyreward']).score
    case 'spect':
      return JSON.parse(gameData['BestScore'])
    case 'cookie-clicker':
      {
        const save = atob(gameData['cookieCandy'].split('%')[0])
        console.log(save)
        return Math.round(parseFloat(save.split('|')[4].split(';')[0]))
      }
    case 'galaxie':
      return JSON.parse(gameData['result']).score
    case 'bridges':
      return JSON.parse(gameData['result']).score
    default:
      console.log('Unknown game', gameId)
      return 0
  }
}

export async function updateLeaderboard(
  gameId: string,
  userId: number,
  gameData: string
) {
  let score = getScore(gameId, JSON.parse(gameData))
  const leaderboard = await getLeaderboardForUser(userId, gameId, score)
  if (!isBetterScore(score, leaderboard, gameId)) {
    score = leaderboard.score
  }
  await db.leaderboard.update({
    where: {
      id: leaderboard.id
    },
    data: {
      score,
      gameData,
    }
  })
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
