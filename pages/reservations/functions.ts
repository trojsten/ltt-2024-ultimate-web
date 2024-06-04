import getConfig from '@config'
import db, { buy } from '@db'
import type { Reservation, User } from '@prisma/client'

export function getToday() {
  const now = getConfig().reservations.currentDay
  const today = Date.parse(now)
  return new Date(today)
}

export function getTomorrow() {
  return new Date(getToday().getTime() + 1000 * 60 * 60 * 24)
}

export async function getReservation(
  userid: number
): Promise<Reservation | null> {
  return db.reservation.findFirst({
    where: {
      date: {
        gte: getToday()
      },
      userId: userid
    }
  })
}

export async function createReservation(
  user: User,
  bedid: number
): Promise<Reservation> {
  const cost = await getReservationCost(user, bedid)
  await buy(user.id, cost, 'Rezervácia postele #' + bedid)
  return db.reservation.create({
    data: {
      userId: user.id,
      bedId: bedid,
      date: getToday(),
      cost: cost
    }
  })
}

export async function cancelReservation(userid: number): Promise<void> {
  const reservation = await getReservation(userid)
  if (!reservation) {
    throw new Error('No reservation found to cancel')
  }
  const refund = reservation.cost * getConfig().reservations.cancelRefund
  await buy(userid, -refund, 'Zrušenie rezervácie')

  await db.reservation.delete({
    where: {
      id: reservation.id
    }
  })
}

export async function getCurrentReservations() {
  return db.reservation.findMany({
    where: {
      date: {
        gte: getToday()
        // lte: getTomorrow()
      }
    },
    select: {
      user: {
        select: {
          name: true,
          sex: true,
          id: true
        }
      },
      bedId: true
    }
  })
}

export async function getReservationCost(user: User, bedid: number) {
  const bed = await db.bed.findUnique({
    where: {
      id: bedid
    }
  })
  if (!bed) {
    throw new Error('Bed not found')
  }
  const reservation = await getReservation(user.id)
  if (reservation) {
    throw new Error('User already has a reservation')
  }

  let bedCost = bed.cost

  const roommates = await db.reservation.findMany({
    where: {
      bed: {
        roomId: bed.roomId
      },
      date: {
        gte: getToday(),
        lte: getTomorrow()
      }
    },
    select: {
      user: {
        select: {
          sex: true
        }
      }
    }
  })
  let hasDifferentSexInRoom = false
  for (const roommate of roommates) {
    if (roommate.user.sex != user.sex) {
      hasDifferentSexInRoom = true
      break
    }
  }

  if (hasDifferentSexInRoom) {
    bedCost *= getConfig().reservations.differentSexMultiplier
  }

  const pastReservations = await getPastReservationsInRoom(bed.roomId)
  let wasInThisRoom = false
  let wasInThisBed = false

  for (const reservation of pastReservations) {
    if (reservation.user.id != user.id) continue
    if (reservation.bed.id == bed.id) {
      wasInThisBed = true
      wasInThisRoom = true
      break
    }
    if (reservation.bed.roomId == bed.roomId) {
      wasInThisRoom = true
    }
  }

  if (wasInThisRoom) {
    bedCost *= getConfig().reservations.sameRoomMultiplier
  }

  if (wasInThisBed) {
    bedCost *= getConfig().reservations.sameBedMultiplier
  }

  return bedCost
}

async function getPastReservationsInRoom(roomid: number) {
  return db.reservation.findMany({
    where: {
      bed: {
        roomId: roomid
      },
      date: {
        lt: getToday()
      }
    },
    select: {
      user: true,
      bed: true
    }
  })
}
