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
      <h1>Stav si</h1>
      {bet!.description}
      <form>
        <ul>
          {bet!.possileOutcomes.map((outcome, index) => (
            <li key={index}>
              <input
                id={'outcome' + outcome.id}
                name={'outcome' + outcome.id}
                type="number"
                min="0"
                max={outcome.limit!}
                className="w-16"
              />
              <label htmlFor={'outcome' + outcome.id}>
                {outcome.description}
              </label>
            </li>
          ))}
        </ul>
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

  for (const outcome of req.data.entries()) {
    const [key, value] = outcome
    if (key.startsWith('outcome')) {
      const outcomeId = parseInt(key.slice(7))
      const amount = parseInt(value)
      if (amount > 0) {
        const team = await getTeamForUser(req.session!.user.id)
        if (team.money < amount) {
          return renderPage(<div>Nemáš dosť peňazí</div>, req)
        }
        await db.transaction.create({
          data: {
            amount,
            userId: req.session!.user.id,
            betId: outcomeId,
            teamId: team.id
          }
        })

        await db.team.update({
          where: {
            id: team.id
          },
          data: {
            money: {
              decrement: amount
            }
          }
        })
      }
    }
  }

  return Response.redirect(`/bets`)
}
