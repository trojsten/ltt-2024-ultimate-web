import db, { getTeamForUser } from "@db";
import { renderPage } from "@main";
import type { Item } from "@prisma/client";
import type { SessionRequest } from "@session";


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

    const team = await getTeamForUser(req.session!.user.id);

    return (
        <div>
            <h1>Shop</h1>
            <div className="grid grid-cols-3 gap-4">
                {items.length == 0 ? <p className="text-red-500">Momentálne sa nič nedá kúpiť</p> : null}
                {items.map(e=>itemHTML(e, true, team!.money >= e.cost))}
            </div>
            {req.session?.user.admin ? <a href="/shop/new">Vytvoriť nový produkt</a> : null}
        </div>
    )
}



export function itemHTML(item: Item, buyButton: boolean = true, canbuy: boolean = false): JSX.Element {
    return (
        <div className="bg-gray-200 rounded-md">
            <img src={item.image} className="w-32 h-32"/>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.cost} peňazí</p>
            <p>{item.amount} kusov</p>
            {buyButton ? 
            <form action={'/shop/buy/'+item.id} method="post">
                <button type="submit" disabled={!canbuy}>Kúpiť</button>
            </form>: null}
        </div>
    )
}

export async function get(req: SessionRequest) {
    return renderPage(await getShop(req), req);
}