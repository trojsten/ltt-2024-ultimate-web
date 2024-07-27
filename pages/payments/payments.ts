import db, { getTeamForUser } from "@db";
import type { User } from "@prisma/client";

export async function pay(sender: User, receiver: User, amount: number, message: string) {
  if (amount < 0) {
    throw new Error('Amount must be positive')
  }
  const team = await getTeamForUser(sender.id)
  if (team.money < amount) {
    throw new Error('Not enough money')
  }

  await db.transaction.create({
    data: {
      amount,
      userId: receiver.id,
      teamId: (await getTeamForUser(receiver.id)).id,
      description: message
    }
  })

  await db.transaction.create({
    data: {
      amount: -amount,
      userId: sender.id,
      teamId: team.id,
      description: message
    }
  })

  await db.team.update({
    where: {
      id: team.id
    },
    data: {
      money: {
        decrement: amount
      }
    }
  })

  await db.team.update({
    where: {
      id: (await getTeamForUser(receiver.id)).id
    },
    data: {
      money: {
        increment: amount
      }
    }
  })
}
