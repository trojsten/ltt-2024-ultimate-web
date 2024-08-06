import db from "@db";
import type { SessionRequest } from "@session";


export async function post(req: SessionRequest) {
  if (!req.session?.user.admin) {
    return new Response("neda sa", { status: 403 });
  }

  const { id } = req.params;
  await db.bet.update({ data: { blocked: true }, where: { id: parseInt(id) } });
  return Response.redirect('/bets');
}
