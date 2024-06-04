import config from '@config'
import { type SessionRequest } from '@session'

export async function get(req: SessionRequest): Promise<Response> {
  const gameId = req.params.id
  if (!gameId) {
    return new Response('No game ID specified', { status: 404 })
  }

  if (!config().games[gameId]) {
    return new Response('Game ' + gameId + ' not found', { status: 404 })
  }

  if (config().games[gameId].iframeUrl.startsWith('http')) {
    const res = await fetch(config().games[gameId].iframeUrl)
    return new Response(await res.text(), {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  } else {
    return new Response(Bun.file(config().games[gameId].iframeUrl), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html'
      }
    })
  }
}
