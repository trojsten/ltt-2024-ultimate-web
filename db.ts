import { PrismaClient, type Item } from '@prisma/client'

const db = new PrismaClient()

export default db

export async function getTeamForUser(userId: number) {
  return db.team.findFirstOrThrow({
    where: {
      users: {
        some: {
          id: userId
        }
      }
    }
  })
}

export async function getQuestForUser(userId: number) {
  return await db.quest.findFirst({
    where: {
      userId: userId
    },
    select: {
      id: true,
      task: true,
      type: true,
      answer: true
    }
  })
}

export async function getItemsForUser(userId: number) {
  return (
    await db.transaction.findMany({
      where: {
        userId: userId,
        NOT: {
          itemId: null
        }
      },
      select: {
        item: true
      }
    })
  ).map((transaction) => transaction.item)
}

export async function getAdsForUser(userId: number) {
  const tags = await db.tag.findMany({
    where: {
      users: {
        some: {
          id: userId
        }
      },
      ads: {
        every: {
          viewRemaining: {
            gt: 0
          }
        }
      }
    },
    include: {
      ads: true
    }
  })
  return tags.map((tag) => tag.ads).flat()
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function buy(userId: number, cost: number, item: Item | String) {
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
      money: {
        decrement: cost
      }
    }
  })

  const data = {
    amount: cost,
    userId: userId,
    teamId: team.id
  }

  if (item instanceof String) {
    //@ts-expect-error add description to data if item is a string
    data.description = item.toString()
  } else {
    //@ts-expect-error add itemId to data if item is an Item
    data.itemId = item.id
  }

  return db.transaction.create({
    data
  })
}

export async function userHasTag(userId: number, tagName: string) {
  const tag = await db.tag.findFirst({
    where: {
      name: tagName,
      users: {
        some: {
          id: userId
        }
      }
    }
  })

  return tag != null
}

export async function buyAddTag(
  userId: number,
  cost: number,
  description: string,
  tag: string
) {
  await buy(userId, cost, new String(description))
  const id = await db.tag.findFirstOrThrow({
    where: {
      name: tag
    }
  })

  await db.user.update({
    where: {
      id: userId
    },
    data: {
      tags: {
        connect: {
          id: id!.id
        }
      }
    }
  })
}
