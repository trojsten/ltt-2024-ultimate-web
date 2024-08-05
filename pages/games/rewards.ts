import getConfig from "@config";
import db, { buy } from "@db";
import type { SessionRequest } from "@session";

async function claimRewards() {
  for (const gameId of Object.keys(getConfig().games)) {
    const game = getConfig().games[gameId]
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
            id: true
          }
        }
      }
    })

    const rewards = [500, 300, 200, 150, 100]
    for (let i = 0; i < Math.min(entries.length, rewards.length); i++) {
      const user = entries[i].userId
      await buy(user, -rewards[i], new String(`Odmena za ${i + 1}. miesto v hre ${game.name}`))
    }
  }
}

export async function get(req: SessionRequest) {
  if (!req.session!.user.admin) {
    return Response.json({ message: 'You must be an admin to claim rewards' })
  }
  await claimRewards()
  return Response.json({ message: 'Rewards claimed' })
}
