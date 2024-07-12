import db, { getTeamForUser } from "@db";
import { renderPage } from "@main";
import type { SessionRequest } from "@session";
import { pay } from "./payments";


async function paymentPage(req: SessionRequest, error?: string) {
  const users = await db.user.findMany()
  const team = await getTeamForUser(req.session!.user.id)
  const amount = req.parsedUrl.searchParams.get("amount") ?? undefined
  const recipient = parseInt(req.parsedUrl.searchParams.get("recipient") ?? "NaN")

  return <div>
    <h1>Payment</h1>
    {error && <p>{error}</p>}
    <form method="post">
      <label htmlFor="amount">Amount</label>
      <input type="number" name="amount" min="0" max={team.money} id="amount" value={amount} />
      <label htmlFor="recipient">Recipient</label>
      <select name="recipient" id="recipient">
        {users.map(user => <option value={user.id} selected={user.id == recipient}>{user.name}</option>)}
      </select>
      <label htmlFor="message">Message</label>
      <input type="text" id="message" name="message" />
      <button type="submit">Pay</button>
    </form>
  </div>
}

export async function get(req: SessionRequest) {
  return renderPage(await paymentPage(req), req)
}

export async function post(req: SessionRequest) {
  try {
    const data = req.data as FormData
    const recipient = await db.user.findUniqueOrThrow({ where: { id: parseInt(data.get("recipient") as string) } })
    await pay(req.session!.user, recipient, parseInt(data.get("amount") as string), data.get("message") as string ?? `Platba od ${req.session!.user.name} pre ${recipient.name}`)
    return renderPage(await paymentPage(req, "Platba prebehla ůspešne"), req)
  } catch (e: unknown) {
    return renderPage(await paymentPage(req, (e as Error).message ?? e), req)
  }
}
