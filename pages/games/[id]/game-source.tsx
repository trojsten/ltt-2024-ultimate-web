import { setSession, type SessionRequest } from '@session'
import { games } from '..'

export async function get(req: SessionRequest): Promise<Response> {
  const gameId = req.params.id
  if (!gameId) {
    return new Response('No game ID specified', { status: 404 })
  }

  if (!games[gameId]) {
    return new Response('Game ' + gameId + ' not found', { status: 404 })
  }

  req.session!.gameId = gameId ?? undefined

  if (games[gameId].iframeUrl.startsWith('http')) {
    const res = await fetch(games[gameId].iframeUrl)
    return new Response(await res.text(), {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  } else {
    return new Response(Bun.file(games[gameId].iframeUrl), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html'
      }
    })
  }
}
