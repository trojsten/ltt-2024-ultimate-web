import db, { getTeamForUser } from '@db'
import { renderPage } from '@main'
import { itemHTML } from '@pages/shop'
import type { SessionRequest } from '@session'

async function getPage(req: SessionRequest): Promise<JSX.Element> {
  const id = parseInt(req.params.id)
  const user = await db.user.findUnique({
    where: {
      id: id
    }
  })

  const team = await getTeamForUser(id)
  if (!user) {
    return <div>User with id {id} not found</div>
  }

  const myItems = await db.transaction.findMany({
    where: {
      user: {
        id: user.id
      },
      description: null
    },
    include: {
      item: true
    }
  })

  return (
    <div>
      <h1 className="text-2xl">{user.name}</h1>
      {user.name == req.session?.user.name ? <p>That's you!</p> : null}
      <h2 className="text-lg">Družinka</h2>
      <p>{team?.name}</p>
      {user.name == req.session?.user.name ? <p>{team?.money}</p> : null}
      <h2 className="text-lg">Moje kúpené veci</h2>
      <div className="grid grid-cols-3 gap-4">
        {myItems.length > 0 ? (
          myItems.map((e) => itemHTML(e.item!, false, false))
        ) : (
          <p>Žiadne kúpené veci</p>
        )}
      </div>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await getPage(req), req)
}
