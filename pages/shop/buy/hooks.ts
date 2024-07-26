import type { Item, User } from "@prisma/client";

interface HookArgs extends Record<string, unknown> {
  item: Item,
  user: User,
}


export const hooks: Record<string, (args: HookArgs) => Promise<void>> = {
  "internet": async (args: HookArgs) => {
    await fetch("http://10.85.255.4/rest/ip/firewall/address-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic ltt:yJy0zY8x"
      },
      body: JSON.stringify({
        list: "purchased",
        address: args.ip,
        timeout: args.timeout + "m",
      })
    })
  },
  "lootbox": async () => {
  }
}
