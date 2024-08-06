import db, { getTeamForUser } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function getHTML(req: SessionRequest) {
  if (req.params.id == undefined)
    return <div>Invalid bet id</div>

  const bet = await db.bet.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      description: true,
      possileOutcomes: true,
      finalOutcomes: {
        select: {
          id: true
        }
      },
      eveluated: true
    }
  })

  if (!bet) {
    return <div>Invalid bet id</div>
  }

  const team = await getTeamForUser(req.session!.user.id)
  const hasBet = await db.transaction.findFirst({
    where: {
      teamId: team.id,
      bet: {
        PossileBet: {
          id: bet.id
        }
      }
    }
  })

  if (!bet.eveluated && hasBet != null) {
    return (<p>Už si stávil na túto stávku</p>)
  }


  return (
    <div className='mx-2'>
      <h1 className='my-2'>Stav si</h1>
      <form method='post' className='m-3 flex justify-center flex-col'>
        <p className='mb-3'>{bet!.description}</p>
        <ul>
          {bet!.possileOutcomes.map((outcome, index) => {
            if (bet.eveluated) {
              return (
                <li key={index} className='flex justify-start items-center'>
                  <input
                    id={'outcome' + outcome.id}
                    name={'outcome' + outcome.id}
                    type="checkbox"
                    defaultChecked={bet.finalOutcomes.some(o => o.id == outcome.id)}
                    className="w-24 mr-3"
                    disabled
                  />
                  <label htmlFor={'outcome' + outcome.id}>
                    {outcome.description} ({outcome.odds})
                  </label>
                </li>
              )
            } else {
              return (
                <li key={index} className='flex justify-start items-center'>
                  <input
                    id={'outcome' + outcome.id}
                    name={'outcome' + outcome.id}
                    type="number"
                    min="0"
                    max={outcome.limit!}
                    className="w-24 mr-3"
                  />
                  <label htmlFor={'outcome' + outcome.id}>
                    {outcome.description} ({outcome.odds})
                  </label>
                </li>
              )
            }
          })}
        </ul>
        {bet.eveluated ? <p className='mt-3 text-green-500'>Vyhodnotené</p> : <button type="submit" className='btn mt-3'>Staviť</button>}

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

  const team = await getTeamForUser(req.session!.user.id)


  if (!bet) {
    return Response.redirect(`/bets`)
  }

  const hasBet = await db.transaction.findFirst({
    where: {
      teamId: team.id,
      bet: {
        PossileBet: {
          id: bet.id
        }
      }
    }
  })

  if (hasBet != null) {
    return renderPage((<p>Už si stávil na túto stávku</p>), { status: 400 })
  }

  for (const outcome of req.data.entries()) {
    const [key, value] = outcome
    if (key.startsWith('outcome')) {
      const outcomeId = parseInt(key.slice(7))
      const amount = parseInt(value)
      if (amount > 0) {
        if (team.money < amount) {
          return renderPage(<div>Nemáš dosť peňazí</div>, req)
        }
        await db.transaction.create({
          data: {
            amount,
            userId: req.session!.user.id,
            betId: outcomeId,
            teamId: team.id,
            description: `Stávka na ${bet.possileOutcomes.find(o => o.id == outcomeId)!.description}`
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
