import { PrismaClient } from '@prisma/client'

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
