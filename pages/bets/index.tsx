import db from '@db'
import { renderPage } from '@main'
import type { Bet } from '@prisma/client'
import type { SessionRequest } from '@session'

async function getPage(req: SessionRequest) {
  const bets = await db.bet.findMany()
  return (
    <div className="container w-full md:w-2/3 m-auto">
      <h1 className="text-2xl my-2">Stávky</h1>
      <ul className="flex flex-col m-2">
        {bets.filter((bet) => !bet.eveluated).map(e => betHTML(e, req.session!.user?.admin))}
      </ul>
      <h1 className="text-xl my-2">Hotové stávky</h1>
      <ul className="flex flex-col m-2">
        {bets.filter((bet) => bet.eveluated).map(e => betHTML(e))}
      </ul>
      <a href="/bets/new" className="text-xl btn">
        Pridať stávku
      </a>
    </div>
  )
}

export function betHTML(bet: Bet, canFinish: boolean = false) {
  const classes = ['m-2', 'border-2', 'rounded-md', 'p-2', 'flex', 'justify-between', 'items-center']
  if (bet.eveluated) {
    classes.push('border-blue-500', 'opacity-70')
  }
  return (
    <li className={classes.join(' ')}>
      <a href={'/bets/' + bet.id + '/bet'} className="text-md">
        {bet.description}
      </a>
      {canFinish ? <a href={'/bets/' + bet.id + '/evaluate'} className='btn'>Vyhodnotiť</a> : null}
    </li>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getPage(req), req)
}

export async function post(req: SessionRequest) { }
