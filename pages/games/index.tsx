import config, { type Game } from '@config'
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
      <h1 className="text-2xl mb-4 mt-2 text-center">Hry</h1>
      <div className="flex flex-wrap justify-center">
        {Object.keys(games).map((gameId) => {
          if (tags.find((e) => e.name == gameId)) {
            return gameUI(
              games[gameId],
              <div className="flex flex-col text-center">
                <a className="btn" href={'/games/' + gameId}>
                  Hrať
                </a>
                {games[gameId].leaderboard?.enabled ? (
                  <a
                    className="btn my-3"
                    href={'/games/' + gameId + '/leaderboard'}
                  >
                    Rebricek
                  </a>
                ) : null}
              </div>
            )
          } else {
            return gameUI(
              games[gameId],
              <form method="post" className="flex flex-col">
                <input type="hidden" name="gameId" value={gameId} />
                <button type="submit" className="btn">
                  Kúpiť ({games[gameId].cost})
                </button>
                {games[gameId].leaderboard?.enabled ? (
                  <a
                    className="btn my-3"
                    href={'/games/' + gameId + '/leaderboard'}
                  >
                    Rebricek
                  </a>
                ) : null}
              </form>
            )
          }
        })}
      </div>
    </div>
  )
}

function gameUI(game: Game, inner: JSX.Element) {
  return (
    <div className="relative m-2 max-h-48 max-w-48">
      <img src={game.thumbnail} className="rounded-md" />
      <div className="absolute w-full h-full hover:opacity-100 bg-gray-900 rounded-md bg-opacity-40 opacity-0 text-white top-0 flex items-center justify-center flex-col transition-all">
        <h2 className="text-lg font-bold mb-2">{game.name}</h2>
        {inner}
      </div>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  console.log(req.headers.get('Cookie'))
  const res = renderPage(await getPage(req), req)
  return res
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
