import db, { buy } from '@db'
import type { SessionRequest } from '@session'

export async function post(req: SessionRequest): Promise<Response> {
  const user = req.session!.user
  const team = await db.team.findFirst({
    where: {
      users: {
        some: {
          id: user.id
        }
      }
    }
  })
  const item = await db.item.findUnique({
    where: {
      id: parseInt(req.params.itemID)
    }
  })

  if (!team || !item || item.amount == 0) {
    return new Response('Item or team not found', { status: 404 })
  }

  if (team!.money < item!.cost) {
    return new Response('Nemáš dostatok peňazí', { status: 400 })
  }

  await db.item.update({
    where: {
      id: item!.id
    },
    data: {
      amount: {
        decrement: 1
      }
    }
  })

  await buy(user.id, item!.cost, item)

  return Response.redirect('/shop')
}
