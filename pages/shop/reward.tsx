import db, { getItemsForUser, getTeamForUser, buy } from '@db'
import { renderPage } from '@main'
import { keys } from '@pages/games/[id]/data';
import type { Item } from '@prisma/client'
import type { SessionRequest } from '@session'

const rewards: [number, Function][] = [
  [0.1, reward_item_common], // 10 %
  [0.03, reward_item_uncommon], // 3 %
  [0.01, reward_item_rare], // 1 %
  [0.001, reward_item_legendary], // 0.1 %
  [0.2, reward_one_box],
  [0.4, reward_more_boxes],
  [0.05, reward_money_small], // 5 %
  [0.02, reward_money_medium], // 2 %
  [0.005, reward_money_big], // 0.5 %
  [0.0005, reward_money_huge], // 0.05 %
  [0.10, reward_nothing]
];

async function generate_lootbox_reward(req: SessionRequest){
  let value = Math.random();
  for (let i=0; i < rewards.length; i++){
      if (value <= rewards[i][0]){
          return await rewards[i][1](req);
      } else {
          value -= rewards[i][0];
      }
  }
  return reward_nothing(req);
}

async function getItemsWithTag(tag: string) {
  let items = await db.item!.findMany({
    where: {
      tags: {
        some: {
          name: tag
        }
      }
    }
  })
  console.log(items);
  return items;
}

async function reward_item_common(req: SessionRequest){
  let items = await getItemsWithTag("lootbox-item-common");
  items.sort(() => Math.random());
  let item = items[0];
  buy(req.session!.user.id, 0, item);
  return [item.name, 0, item.image]; // Number means rarity here
}

async function reward_item_uncommon(req: SessionRequest){
  let items = await getItemsWithTag("lootbox-item-uncommon");
  items.sort(() => Math.random());
  let item = items[0];
  buy(req.session!.user.id, 0, item);
  return [item.name, 1, item.image]; // Number means rarity here
}

async function reward_item_rare(req: SessionRequest){
  let items = await getItemsWithTag("lootbox-item-rare");
  items.sort(() => Math.random());
  let item = items[0];
  buy(req.session!.user.id, 0, item);
  return [item.name, 2, item.image]; // Number means rarity here
}

async function reward_item_legendary(req: SessionRequest){
  let items = await getItemsWithTag("lootbox-item-legendary");
  items.sort(() => Math.random());
  let item = items[0];
  buy(req.session!.user.id, 0, item);
  return [item.name, 3, item.image]; // Number means rarity here
}

function reward_one_box(req: SessionRequest){
  add_lootboxes(req, 1);
  return ["lootbox", 1];
}

function reward_more_boxes(req: SessionRequest){
  let number = Math.floor(Math.random() * 2 + 1);
  add_lootboxes(req, number);
  return ["lootbox", number];
}

function reward_money_small(req: SessionRequest){
  let number = Math.floor(Math.random() * 15 + 1);
  add_money(req, number);
  return ["money", number];
}

function reward_money_medium(req: SessionRequest){
  let number = Math.floor(Math.random() * 50 + 1);
  add_money(req, number);
  return ["money", number];
}

function reward_money_big(req: SessionRequest){
  let number = Math.floor(Math.random() * 250 + 1);
  add_money(req, number);
  return ["money", number];
}

function reward_money_huge(req: SessionRequest){
  let number = Math.floor(Math.random() * 2500 + 1);
  add_money(req, number);
  return ["money", number];
}

function reward_nothing(req: SessionRequest){
  return ["nothing", 0];
}


async function add_money(req: SessionRequest, value: number) {
  const teamId = (await getTeamForUser(req.session!.user.id)).id;
  
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

async function add_lootboxes(req: SessionRequest, count: number){
  const lootboxItem = await db.item.findFirst({
    where:{
      tags: {
        some:{
          name: "lootbox"
        }
      }
    }
  })

  for (let i=0; i < count; i++) await buy(req.session!.user.id, 0, lootboxItem!);
}

export async function post(req: SessionRequest) {
  const user = req.session!.user;

  let reward: [string, number] = await generate_lootbox_reward(req);
  let lootboxType = reward[0];
  let number = reward[1];

  if (reward.length == 2){
    return new Response(JSON.stringify({
      "lootboxType": lootboxType,
      "itemValue": number
    }))
  }
  else if (reward.length == 3){
    return new Response(JSON.stringify({
      "lootboxType": lootboxType,
      "itemValue": number,
      "imageLink": reward[2]
    }))
  }
}
