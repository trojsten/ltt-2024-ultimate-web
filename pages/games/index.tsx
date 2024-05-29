import db, { userHasTag } from '@db'
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
                <a href={'/games/'}>
                  <img src={games[gameId].thumbnail} />
                  <h2>{games[gameId].name}</h2>
                </a>
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

interface Game {
  name: string
  iframeUrl: string
  sourceUrl: string
  thumbnail: string
  cost: number
}

export const games: Record<string, Game> = {
  'drift-boss': {
    name: 'Drift Boss',
    sourceUrl: 'https://www.onlinegames.io/games/2023/mjs/drift-boss/',
    iframeUrl: './static/drift-boss.html',
    thumbnail: 'https://www.onlinegames.io/media/posts/378/Drift-Boss-Game.jpg',
    cost: 200
  },
  capybara: {
    name: 'Capybara',
    sourceUrl: 'https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/',
    iframeUrl: 'https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/',
    thumbnail:
      'https://www.onlinegames.io/media/posts/554/Capybara-Clicker-Pro.jpg',
    cost: 200
  }
}
