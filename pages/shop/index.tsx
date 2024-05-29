import db, { getTeamForUser } from '@db'
import { renderPage } from '@main'
import type { Item } from '@prisma/client'
import type { SessionRequest } from '@session'

async function getShop(req: SessionRequest) {
  const items = await db.item.findMany({
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
  })

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
        <a href="/shop/new" className="btn bg-green-400">
          Vytvoriť nový produkt
        </a>
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
    <div className="bg-gray-200 rounded-lg overflow-hidden p-2">
      <h2 className="text-lg text-center mb-3 mt-1">{item.name}</h2>
      <img src={item.image} className="h-48 w-auto" />
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
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getShop(req), req)
}
