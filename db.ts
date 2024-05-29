import { PrismaClient, type Team, type User } from '@prisma/client'

const db = new PrismaClient()

export default db

export async function getTeamForUser(userId: number) {
  return db.team.findFirst({
    where: {
      users: {
        some: {
          id: userId
        }
      }
    }
  })
}

export async function getAdsForUser(userId: number) {
  const tags = await db.tag.findMany({
    where: {
      users: {
        some: {
          id: userId
        }
      }
    },
    include: {
      ads: true
    }
  })
  return tags.map((tag) => tag.ads).flat()
}

export async function buy(
  userId: number,
  cost: number,
  description: string | undefined
) {
  const team = await getTeamForUser(userId)
  if (!team) {
    throw new Error('No team')
  }
  if (team.money < cost) {
    throw new Error('Team has not enough money')
  }

  await db.team.update({
    where: {
      id: team.id
    },
    data: {
      money: team.money - cost
    }
  })

  return db.transaction.create({
    data: {
      amount: cost,
      userId: userId,
      teamId: team.id,
      description
    }
  })
}
