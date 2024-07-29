import db, { getItemsForUser, getTeamForUser } from '@db'
import { renderPage } from '@main'
import type { Item } from '@prisma/client'
import type { SessionRequest } from '@session'

async function getShop(req: SessionRequest) {
  const userItems = await getItemsForUser(req.session!.user.id)
  const counts: Record<number, number> = {}

  console.log(userItems)

  for (const item of userItems) {
    if (counts[item.id] == undefined) {
      counts[item.id] = 0
    }
    counts[item.id]++
  }

  console.log(counts)

  const items = (await db.item.findMany({
    where: {
      tags: {
        every: {
          users: {
            some: {
              id: req.session?.user.id
            }
          }
        }
      },
      amount: {
        gt: 0
      }
    }
  })).filter(e => e.amountPerUser == null || counts[e.id] == undefined || counts[e.id] < e.amountPerUser)



  const team = await getTeamForUser(req.session!.user.id)

  return (
    <div>
      <h1 className="text-xl text-center mb-8 mt-3 font-bold">Obchod</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
        {items.length == 0 ? (
          <p className="text-red-500">Momentálne sa nič nedá kúpiť</p>
        ) : null}
        {items.map((e) => itemHTML(e, true, team!.money >= e.cost))}
      </div>
      {req.session?.user.admin ? (
        <div className="flex justify-center">
          <a href="/shop/new" className="btn bg-green-400">
            Vytvoriť nový produkt
          </a>
          <a href="/shop/orders" className="btn bg-green-400">
            Nevybavené objednávky
          </a>
        </div>
      ) : null}
    </div>
  )
}

export function itemHTML(
  item: Item,
  buyButton: boolean = true,
  canbuy: boolean = false
): JSX.Element {
  if (item == null) return <div></div>
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden relative">
      <div className="top-0 w-full bg-gray-500 overflow-hidden">
        <h2 className="text-lg text-center mb-3 mt-1 font-semibold">
          {item.name}
        </h2>
      </div>
      {item.image == null ? (
        <div className="h-48"></div>
      ) : (
        <img src={item.image} className="h-48 w-auto m-auto" />
      )}
      <div className="p-2">
        <p className="mb-4 mt-2">{item.description}</p>
        <div className="flex justify-between">
          <p>{item.amount} kusov</p>
          <p className="font-bold flex items-center">
            {item.cost}{' '}
            <span className="material-symbols-outlined">monetization_on</span>
          </p>
        </div>
        {buyButton ? (
          <form action={'/shop/buy/' + item.id} method="post">
            <button
              type="submit"
              disabled={!canbuy}
              className="btn disabled:opacity-50 w-full"
            >
              Kúpiť
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getShop(req), req)
}
