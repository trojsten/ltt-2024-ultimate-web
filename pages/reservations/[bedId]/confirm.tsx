import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { createReservation, getReservationCost } from '../functions'
import type { User } from '@prisma/client'

async function confirmPage(user: User, bedid: number) {
  const cost = await getReservationCost(user, bedid)
  return (
    <div>
      <h1>Rezervovať posteľ #{bedid}</h1>
      <p>Naozaj rezervovať túto posteľ?</p>
      <form method="post">
        <a href="/reservations" className="btn">
          Späť
        </a>
        <button type="submit" className="btn">
          Rezervovať ({cost})
        </button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(
    await confirmPage(req.session!.user, parseInt(req.params.bedId)),
    req
  )
}

export async function post(req: SessionRequest) {
  const { bedId } = req.params
  const { user } = req.session!
  try {
    await createReservation(user, parseInt(bedId))
  } catch (e) {
    return get(req)
  }
  return Response.redirect('/reservations')
}
