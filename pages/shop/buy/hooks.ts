import db, { buy, getTeamForUser } from "@db";
import type { Item, User } from "@prisma/client";

interface HookArgs extends Record<string, unknown> {
  item: Item,
  user: User,
}


/// lootbox item type:
// {
//  "itemId": 1, // if type is item
//  "type": "coins" | "item" | "none"
//  "amount": 100, // if type is coins
//  "count": 10 // for probability
// }

interface LootboxItem {
  itemId?: number,
  type: "coins" | "item" | "none",
  amount?: number,
  count: number
}

export const hooks: Record<string, (args: HookArgs) => Promise<void>> = {
  "internet": async (args: HookArgs) => {
    const body = {
      list: "purchased",
      address: args.ip,
      timeout: args.timeout + "m",
    }
    console.log(body)
    await fetch("http://10.85.255.4/rest/ip/firewall/address-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic ltt:yJy0zY8x"
      },
      body: JSON.stringify(body)
    })
  },
  "lootbox": async (args: HookArgs) => {
    const items = args.items as LootboxItem[]
    const itemCount = items.reduce((acc, e) => acc + e.count, 0)
    let rand = Math.floor(Math.random() * itemCount)
    let item: LootboxItem | undefined
    for (let i = 0; i < items.length; i++) {
      if (rand < items[i].count) {
        item = items[i]
        break
      }
      rand -= items[i].count
    }

    if (item?.type == "coins") {
      await buy(args.user.id, -item.amount!, "Výhra z lootboxu")
    } else if (item?.type == "item") {
      await db.transaction.create({
        data: {
          amount: 0,
          userId: args.user.id,
          itemId: item.itemId!,
          teamId: (await getTeamForUser(args.user.id)).id
        }
      })
    }
  }
}
