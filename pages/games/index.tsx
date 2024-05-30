import config from '@config'
import db, { buyAddTag, userHasTag } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function getPage(req: SessionRequest) {
  const tags = await db.tag.findMany({
    where: {
      users: {
        some: {
          id: req.session!.user.id
        }
      }
    }
  })
  const games = config().games
  return (
    <div>
      <h1>Game</h1>
      <div className="flex">
        {Object.keys(games).map((gameId) => {
          if (tags.find((e) => e.name == gameId)) {
            return (
              <div>
                <a href={'/games/' + gameId}>
                  <img src={games[gameId].thumbnail} />
                  <h2>{games[gameId].name}</h2>
                </a>
              </div>
            )
          } else {
            return (
              <div>
                <form method="post">
                  <img src={games[gameId].thumbnail} />
                  <h2>{games[gameId].name}</h2>
                  <input type="hidden" name="gameId" value={gameId} />
                  <button type="submit">Kúpiť ({games[gameId].cost})</button>
                </form>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await getPage(req), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  const user = req.session!.user.id
  const gameId = (req.data!.get('gameId') as string) ?? 'null'
  if (await userHasTag(user, gameId)) {
    return get(req)
  }
  try {
    await buyAddTag(
      user,
      config().games[gameId].cost,
      'Prístup ku hre ' + config().games[gameId].name,
      gameId
    )
  } catch (err) {
    return new Response(err as string)
  }

  return get(req)
}
