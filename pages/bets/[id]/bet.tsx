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
      blocked: true,
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
        {hasBet ? <p className='mt-3 text-green-500'>Už si stávil na túto stávku</p> : null}
        {bet.eveluated ? <p className='mt-3 text-green-500'>Vyhodnotené</p> : <button type="submit" className='btn mt-3' disabled={hasBet || bet.blocked}>Staviť</button>}
      </form>
      {bet.blocked ? (<p className='text-red-500'>Stávka bola zablokovaná</p>) : null}
      {req.session?.user.admin && !bet.blocked ? (
        <form action={'/bets/' + bet!.id + '/block'} method='post'>
          <button type='submit' className='btn'>
            Zablokovať
          </button>
        </form>
      ) : null}
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


  if (!bet || bet.blocked) {
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
