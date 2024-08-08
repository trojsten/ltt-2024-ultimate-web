import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function getPage(req: SessionRequest): Promise<JSX.Element> {
  const teams = await db.team.findMany()

  return (
    <div>
      <form
        className="flex flex-col m-3 gap-1 justify-center items-center min-h-screen"
        action="/teams"
        method="post"
      >
        <label className="text-3xl text-center" htmlFor="teams">
          Vyber družinky, ktoré chceš spojiť:
        </label>
        <select name="teams" id="teams" multiple>
          {teams.map((team) => (
            <option value={team.id}>{team.name}</option>
          ))}
        </select>
        <label className="text-xl text-center" htmlFor="name">
          Meno novej družinky
        </label>

        <input name="name" id="name"></input>
        <input className="btn" type="submit" value="Spoj Družinky" />
        <p className="text-xl text-center">Pozor táto akcia je nevratná!!!</p>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  if (req.session?.user.admin) return renderPage(await getPage(req), req)
  return new Response('You are not Admin', { status: 403 })
}

export async function post(req: SessionRequest): Promise<Response> {
  if (!req.session?.user.admin)
    return new Response('You are not Admin', { status: 403 })
  const team_ids: Array<number> = req.data
    .getAll('teams')
    .map((e: string) => parseInt(e))
  const teams = await db.team.findMany({
    where: {
      id: {
        in: team_ids
      }
    },
    select: { users: true, money: true, transactions: true }
  })
  const new_team = await db.team.create({
    data: {
      name: req.data.get('name'),
      money: 0
    }
  })

  const suma = await teams.reduce(async (sum, team) => {
    team.users.map(async (user) => {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          teamId: new_team.id
        }
      })
    })
    team.transactions.map(async (transaction) => {
      await db.transaction.update({
        where: {
          id: transaction.id
        },
        data: {
          teamId: new_team.id
        }
      })
    })
    const syncSum = await sum
    return new Promise((resolve) => resolve(syncSum + team.money))
  }, Promise.resolve(0))

  await db.team.update({
    where: {
      id: new_team.id
    },
    data: {
      money: suma
    }
  })
  await db.team.deleteMany({
    where: {
      id: {
        in: team_ids
      }
    }
  })
  return Response.redirect('/teams')
}
