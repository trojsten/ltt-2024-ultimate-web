import { renderPage } from '@main'
import type { SessionRequest } from '@session'

function getPage() {
  return (
    <div>
      <h1>Game</h1>
      <div>
        {Object.keys(games).map((gameId) => (
          <div>
            <a href={'/games/' + gameId}>
              <img src={games[gameId].thumbnail} />
              <h2>{games[gameId].name}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(getPage(), req)
}

interface Game {
  name: string
  iframeUrl: string
  sourceUrl: string
  thumbnail: string
}

export const games: Record<string, Game> = {
  'drift-boss': {
    name: 'Drift Boss',
    sourceUrl: 'https://www.onlinegames.io/games/2023/mjs/drift-boss/',
    iframeUrl: './static/drift-boss.html',
    thumbnail: 'https://www.onlinegames.io/media/posts/378/Drift-Boss-Game.jpg'
  },
  capybara: {
    name: 'Capybara',
    sourceUrl: 'https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/',
    iframeUrl: 'https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/',
    thumbnail:
      'https://www.onlinegames.io/media/posts/554/Capybara-Clicker-Pro.jpg'
  }
}
