import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { createReservation, getReservationCost } from '../functions'
import type { User } from '@prisma/client'

async function confirmPage(user: User, bedid: number) {
  try {
    const result = await getReservationCost(user, bedid)
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='mb-3'>Rezervovať posteľ #{bedid}</h1>
        <div>
          <ul className='my-3'>
            {result.sameBed ? (<li className='text-red-500'>Príplatok za repetitívne použitie postele</li>) : null}
            {result.sameRoom ? (<li className='text-red-500'>Príplatok za repetitívne použitie izby</li>) : null}
            {result.sameSex ? (<li className='text-red-500'>Príplatok za zmiešanú izbu</li>) : null}
            {result.sameRoommate ? (<li className='text-red-500'>Príplatok za repetitívnu zostavu izby</li>) : null}
          </ul>
          <p>Naozaj rezervovať túto posteľ?</p>
          <form method="post" className='flex w-full justify-between'>
            <a href="/reservations" className="btn">
              <span>Späť</span>
            </a>
            <button type="submit" className="btn">
              <span>Rezervovať ({result.cost})</span>
            </button>
          </form>
        </div>
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
    console.log(e)
    return get(req)
  }
  return Response.redirect('/reservations')
}
