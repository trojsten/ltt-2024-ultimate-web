import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

function getHTML() {
  return (
    <div className='mx-3'>
      <script src="/static/newbet.js"></script>
      <h1>Pridať novú stávku</h1>
      <form className='flex flex-col p-24'>
        <input type="text" name="description" className='w-full' placeholder='popis' />
        <div className="outcomes"></div>
        <button className="btn add-outcome" type='button'>Pridať možný výsledok</button>
        <button type="submit" className='btn'>Pridať</button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(getHTML(), req)
}

export async function post(req: SessionRequest) {
  const bet = await db.bet.create({
    data: {
      description: req.data.get('description'),
      eveluated: false,
    }
  })

  for (const outcome of JSON.parse(req.data.get("outcomes"))) {
    const { description, odds, limit } = outcome
    console.log(outcome)
    await db.betOutcome.create({
      data: {
        description,
        odds: parseFloat(odds),
        limit: parseInt(limit),
        PossileBet: {
          connect: {
            id: bet.id
          }
        }
      }
    })
  }

  return Response.redirect(`/bets`)
}
