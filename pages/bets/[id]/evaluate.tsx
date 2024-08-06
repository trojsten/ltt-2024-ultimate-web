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
      <form method="post">
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
        <button type="submit" className="btn">
          Vyhodnotiť
        </button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getHTML(req), req)
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
  for (const outcome of bet.possileOutcomes) {
    if (req.data.get('outcome' + outcome.id) !== 'on') continue
    await db.bet.update({
      where: {
        id: bet.id
      },
      data: {
        eveluated: true,
        finalOutcomes: {
          connect: {
            id: outcome.id
          }
        }
      }
    })

    const transactions = await db.transaction.findMany({
      where: {
        betId: outcome.id
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
            increment: transaction.amount * outcome.odds
          }
        }
      })
      await db.transaction.update({
        where: {
          id: transaction.id
        },
        data: {
          amount: -transaction.amount * outcome.odds
        }
      })
    }
  }

  return Response.redirect(`/bets`)
}
