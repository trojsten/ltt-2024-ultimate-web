import db from "@db";
import type { SessionRequest } from "@session";

export async function post(req: SessionRequest) {
  let current = (await db.user.findUnique({
    where: {
      id: req.session!.user.id
    },
    select: {
      hovna: true
    }
  }))!.hovna


  if (req.data.get("remove")) {
    current--;
    current = Math.max(0, current)
  } else {
    current++;
  }

  await db.user.update({
    where: {
      id: req.session!.user.id
    },
    data: {
      hovna: current
    }
  })

  return Response.redirect('/')
}
