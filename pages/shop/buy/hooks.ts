import db, { buy, getTeamForUser } from '@db'
import type { Item, User } from '@prisma/client'

interface HookArgs extends Record<string, unknown> {
  item: Item
  user: User
}

/// lootbox item type:
// {
//  "itemId": 1, // if type is item
//  "type": "coins" | "item" | "none"
//  "amount": 100, // if type is coins
//  "count": 10 // for probability
// }

interface LootboxItem {
  itemId?: number
  type: 'coins' | 'item' | 'none'
  amount?: number
  count: number
}

export const adblockers: Set<number> = new Set()

export const hooks: Record<string, (args: HookArgs) => Promise<void>> = {
  internet: async (args: HookArgs) => {
    const body = {
      list: 'purchased',
      address: args.ip,
      timeout: args.timeout + 'm'
    }
    await fetch('http://10.85.255.4/rest/ip/firewall/address-list', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic bHR0OnlKeTB6WTh4'
      },
      body: JSON.stringify(body)
    })
  },
  adBlock: async (args: HookArgs) => {
    adblockers.add(args.user.id)
    console.log('adblock active')
    setTimeout(() => {
      adblockers.delete(args.user.id)
      // @ts-expect-error timeout is not in the type
    }, args.item.data!.timeout! * 60 * 1000)
  }
}
