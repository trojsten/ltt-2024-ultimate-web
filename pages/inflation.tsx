import db from "@db";
import type { SessionRequest } from "@session";


export async function post(req: SessionRequest) {
  if (!req.session || !req.session.user.admin) {
    return new Response('Unauthorized', { status: 403 });
  }
  const amount = parseFloat(req.data.get("inflation"))

  const items = await db.item.findMany()

  for (const item of items) {
    await db.item.update({
      where: { id: item.id },
      data: {
        cost: Math.round(item.cost * amount)
      }
    })
  }

  const beds = await db.bed.findMany()

  for (const bed of beds) {
    await db.bed.update({
      where: { id: bed.id },
      data: {
        cost: Math.round(bed.cost * amount)
      }
    })
  }

  return Response.redirect("/")
}
