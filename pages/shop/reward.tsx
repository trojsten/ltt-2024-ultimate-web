import db, { getItemsForUser, getTeamForUser, buy } from '@db'
import type { JsonObject } from '@prisma/client/runtime/library'
import { renderPage } from '@main'
import { keys } from '@pages/games/[id]/data'
import { hooks } from '@pages/shop/buy/hooks'
import type { Item } from '@prisma/client'
import type { SessionRequest } from '@session'

const rewards: [number, Function][] = [
  [0.1, reward_money_small], // 10 %
  [0.03, reward_money_medium], // 3 %
  [0.01, reward_money_big], // 1 %
  [0.001, reward_money_huge], // 0.1 %
  [0.3, reward_one_box],
  [0.3, reward_more_boxes],
  [0.05, reward_item_common], // 5 %
  [0.02, reward_item_uncommon], // 2 %
  [0.005, reward_item_rare], // 0.5 %
  [0.0005, reward_item_legendary], // 0.05 %
  [0.1, reward_nothing]
]

async function generate_lootbox_reward(req: SessionRequest) {
  let value = Math.random()
  for (let i = 0; i < rewards.length; i++) {
    if (value <= rewards[i][0]) {
      return await rewards[i][1](req)
    } else {
      value -= rewards[i][0]
    }
  }
  return reward_nothing(req)
}

async function get_items_with_tag(tag: string) {
  const items = await db.item!.findMany({
    where: {
      tags: {
        some: {
          name: tag
        }
      },
      amount: {
        gt: 0
      }
    }
  })
  return items
}

async function buy_free_and_remove_from_shop(req: SessionRequest, item: Item) {
  await buy(req.session!.user.id, 0, item)

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

  const user = req.session!.user
  const hook = (item.data as JsonObject)?.hook as string | undefined
  if (hook) {
    await hooks[hook]({
      user,
      item,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.ip,
      ...(item.data as JsonObject)
    })
  }
}

async function reward_item_common(req: SessionRequest) {
  const items = await get_items_with_tag('lootbox-item-common')
  const item = items[Math.floor(Math.random() * items.length)]
  await buy_free_and_remove_from_shop(
    req,
    items[Math.floor(Math.random() * items.length)]
  )
  return [item.name, 0, item.image] // Number means rarity here
}

async function reward_item_uncommon(req: SessionRequest) {
  const items = await get_items_with_tag('lootbox-item-uncommon')
  const item = items[Math.floor(Math.random() * items.length)]
  await buy_free_and_remove_from_shop(
    req,
    items[Math.floor(Math.random() * items.length)]
  )
  return [item.name, 1, item.image] // Number means rarity here
}

async function reward_item_rare(req: SessionRequest) {
  const items = await get_items_with_tag('lootbox-item-rare')
  const item = items[Math.floor(Math.random() * items.length)]
  await buy_free_and_remove_from_shop(
    req,
    items[Math.floor(Math.random() * items.length)]
  )
  return [item.name, 2, item.image] // Number means rarity here
}

async function reward_item_legendary(req: SessionRequest) {
  const items = await get_items_with_tag('lootbox-item-legendary')
  const item = items[Math.floor(Math.random() * items.length)]
  await buy_free_and_remove_from_shop(
    req,
    items[Math.floor(Math.random() * items.length)]
  )
  return [item.name, 3, item.image] // Number means rarity here
}

function reward_one_box(req: SessionRequest) {
  add_lootboxes(req, 1)
  return ['lootbox', 1]
}

function reward_more_boxes(req: SessionRequest) {
  const number = Math.floor(Math.random() * 2 + 2)
  add_lootboxes(req, number)
  return ['lootbox', number]
}

async function reward_money_small(req: SessionRequest) {
  const team = await getTeamForUser(req.session!.user.id)
  const number = Math.floor(((Math.random() * team.money) / 1000) * 2 + 1)

  add_money(req, number)
  return ['money', number]
}

async function reward_money_medium(req: SessionRequest) {
  const team = await getTeamForUser(req.session!.user.id)
  const number = Math.floor(((Math.random() * team.money) / 300) * 2 + 1)

  add_money(req, number)
  return ['money', number]
}

async function reward_money_big(req: SessionRequest) {
  const team = await getTeamForUser(req.session!.user.id)
  const number = Math.floor(((Math.random() * team.money) / 100) * 2 + 1)
  add_money(req, number)
  return ['money', number]
}

async function reward_money_huge(req: SessionRequest) {
  const team = await getTeamForUser(req.session!.user.id)
  const number = Math.floor(((Math.random() * team.money) / 10) * 2 + 1)

  add_money(req, number)
  return ['money', number]
}

function reward_nothing(req: SessionRequest) {
  return ['nothing', 0]
}

async function add_money(req: SessionRequest, value: number) {
  const teamId = (await getTeamForUser(req.session!.user.id)).id

  await db.team!.update({
    where: {
      id: teamId
    },
    data: {
      money: {
        increment: value
      }
    }
  })
}

async function add_lootboxes(req: SessionRequest, count: number) {
  const lootboxItem = await db.item.findFirst({
    where: {
      tags: {
        some: {
          name: 'lootbox'
        }
      }
    }
  })

  for (let i = 0; i < count; i++)
    await buy(req.session!.user.id, 0, lootboxItem!)
}

export async function post(req: SessionRequest) {
  const user = req.session!.user

  let reward: [string, number] = await generate_lootbox_reward(req)
  let lootboxType = reward[0]
  let number = reward[1]

  if (reward.length == 2) {
    return new Response(
      JSON.stringify({
        lootboxType: lootboxType,
        itemValue: number
      })
    )
  } else if (reward.length == 3) {
    return new Response(
      JSON.stringify({
        lootboxType: lootboxType,
        itemValue: number,
        imageLink: reward[2]
      })
    )
  }
}
