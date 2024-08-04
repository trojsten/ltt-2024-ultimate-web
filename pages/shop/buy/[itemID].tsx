import db, { buy, getItemsForUser } from '@db'
import type { JsonObject } from '@prisma/client/runtime/library'
import type { SessionRequest } from '@session'
import { hooks } from './hooks'
import { server } from '@index'

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

  if (item.amountPerUser != null) {
    const itemCount = (await getItemsForUser(user.id)).filter(e => e.id === item.id).length
    if (itemCount >= item.amountPerUser) {
      return new Response('Bought already max allowed copies of ' + item.name, { status: 404 })
    }
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

  const hook = (item.data as JsonObject)?.hook as string | undefined
  if (hook) {
    await hooks[hook]({
      user,
      item,
      ip: req.headers.get("X-Forwarded-For")?.split(',')[0] ?? req.ip,
      ...(item.data as JsonObject)
    })
  }

  return Response.redirect('/shop')
}
