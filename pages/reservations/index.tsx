import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { getCurrentReservations, getToday } from './functions'
import db from '@db'
import type { Bed } from '@prisma/client'

let request: SessionRequest

async function Reservations() {
  const today = getToday()
  const rooms = await db.room.findMany({
    select: {
      beds: true,
      features: true,
      name: true,
      id: true,
      bed_count: true
    }
  })
  const currentReservations = await getCurrentReservations()
  console.log(currentReservations)
  return (
    <div>
      <h1>Reservácie</h1>
      <p>
        Momentálne sa rezervuje na: {today.getUTCDate()}.{today.getMonth() + 1}.
        {today.getFullYear()}
      </p>
      <ul className="flex flex-col border-2 border-blue-500 rounded-md p-2">
        {rooms.map((room) => roomHTML(room, currentReservations))}
      </ul>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function roomHTML(room: any, reservations: any[]) {
  const hasReservation = reservations.find(
    (e) => e.user.id === request.session!.user.id
  )
  return (
    <li>
      <h2 className="text-xl">{room.name}</h2>
      <p>
        Počet postelí: <strong>{room.bed_count}</strong>
      </p>
      <ul className="list-disc">
        {room.features.map((feature: string) => (
          <li className="text-green-500">{feature}</li>
        ))}
      </ul>
      <h4 className="text-lg text-center font-semibold">Postele:</h4>
      {room.beds.map((bed: Bed) => {
        const reservation = reservations.find((e) => e.bedId === bed.id)
        return (
          <div className="flex justify-around">
            <h3>Posteľ #{bed.id}</h3>
            <p>{bed.location}</p>
            <ul>
              {reservation == null ? (
                <li className="text-green-500">
                  Voľná
                  {hasReservation ? null : (
                    <a
                      href={'reservations/' + bed.id + '/confirm'}
                      className="btn"
                    >
                      Rezervovať
                    </a>
                  )}
                </li>
              ) : (
                <li className="text-red-500">
                  {reservation.user.id === request.session!.user.id ? (
                    <a href={'reservations/' + bed.id + '/cancel'}>
                      Zrušiť Rezerváciu
                    </a>
                  ) : request.session?.user.admin ? (
                    'Obsadil: ' + reservation.user.name
                  ) : (
                    'Obsadená'
                  )}
                </li>
              )}
            </ul>
          </div>
        )
      })}
    </li>
  )
}

export async function get(req: SessionRequest) {
  request = req
  return renderPage(await Reservations(), req)
}
