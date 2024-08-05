import db, { getTeamForUser } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function getHTML(req: SessionRequest) {
  const bet = await db.bet.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      description: true,
      possileOutcomes: true
    }
  })

  return (
    <div>
      <h1>Vyhodnotiť stávku</h1>
      <form>
        <ul>
          {bet!.possileOutcomes.map((outcome, index) => (
            <li key={index}>
              <input
                id={'outcome' + outcome.id}
                name={'outcome' + outcome.id}
                type="checkbox"
                className="w-16"
              />
              <label htmlFor={'outcome' + outcome.id}>
                {outcome.description}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Vyhodnotiť</button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(getHTML(req), req)
}

export async function post(req: SessionRequest) {
  const bet = await db.bet.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      possileOutcomes: true
    }
  })
  if (!bet) {
    return Response.redirect(`/bets`)
  }

  let outcomeId = 0

  for (const outcome of bet.possileOutcomes) {
    if (req.data.get('outcome' + outcome.id) === 'on') {
      outcomeId = outcome.id
      break
    }
  }

  await db.bet.update({
    where: {
      id: bet.id
    },
    data: {
      eveluated: true,
      finalOutcomes: {
        connect: {
          id: outcomeId
        }
      }
    }
  })

  const transactions = await db.transaction.findMany({
    where: {
      betId: bet.id
    },
    select: {
      id: true,
      userId: true,
      amount: true
    }
  })

  for (const transaction of transactions) {
    const team = await getTeamForUser(transaction.userId)
    await db.team.update({
      where: {
        id: team.id
      },
      data: {
        money: {
          increment: transaction.amount
        }
      }
    })
  }

  return Response.redirect(`/bets`)
}
