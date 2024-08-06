import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { cancelReservation, getReservation } from '../functions'
import db from '@db'
import getConfig from '@config'

async function cancelPage(reservationId: number | undefined) {
  try {
    if (!reservationId) return <p>'Rezervácia neexistuje'</p>
    const res = await db.reservation.findUnique({
      where: { id: reservationId },
      select: { cost: true, bedId: true }
    })
    if (!res) return <p>'Rezervácia neexistuje'</p>

    return (
      <div>
        <h1>Rezervovať posteľ #{res.bedId}</h1>
        <p>Naozaj rezervovať túto posteľ?</p>
        <form method="post">
          <a href="/reservations" className="btn">
            Späť
          </a>
          <button type="submit" className="btn">
            Zrusit (+{res.cost * getConfig().reservations.cancelRefund})
          </button>
        </form>
      </div>
    )
  } catch (e) {
    return (
      <div>
        <p className="text-red-500 m-2">Chyba: {(e as Error).message}</p>
        <a href="/reservations" className="btn">
          Späť
        </a>
      </div>
    )
  }
}

export async function get(req: SessionRequest) {
  if (new Date().getHours() >= 19 || new Date().getHours() <= 8) {
    return new Response('Unauthorized', { status: 401 })
  }
  const res = await getReservation(req.session!.user.id)
  return renderPage(await cancelPage(res?.id), req)
}

export async function post(req: SessionRequest) {
  if (new Date().getHours() >= 19 || new Date().getHours() <= 8) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { user } = req.session!
  try {
    await cancelReservation(user.id)
  } catch (e) {
    return get(req)
  }
  return Response.redirect('/reservations')
}
