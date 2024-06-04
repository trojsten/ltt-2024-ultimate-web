import config from '@config'
import type { SessionRequest } from '@session'

function getType(path: string) {
  if (path.endsWith('.js')) {
    return 'application/javascript'
  } else if (path.endsWith('.css')) {
    return 'text/css'
  } else if (path.endsWith('.html')) {
    return 'text/html'
  } else if (path.endsWith('.json')) {
    return 'application/json'
  } else if (path.endsWith('.png')) {
    return 'image/png'
  } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
    return 'image/jpeg'
  } else {
    return 'text/plain'
  }
}

export async function get(req: SessionRequest): Promise<Response> {
  const id = req.params.id
  const gameId = config().games[id!]
  if (!id || !gameId) {
    return new Response('No game ID specified', { status: 404 })
  }
  const path = req.parsedUrl.pathname.slice(`/games/${id}/`.length)
  const res = await fetch(gameId.sourceUrl + path)
  console.log(req.url + ': ' + res.status)

  if (
    path.endsWith('.js') ||
    path.endsWith('.css') ||
    path.endsWith('.html') ||
    path.endsWith('.json')
  ) {
    return new Response(await res.text(), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': getType(path),
        'Cache-Control': 'public, max-age=31536000, immutable',
        Expires: 'Thu, 31 Dec 2099 23:59:59 GMT'
      }
    })
  } else {
    return new Response(await res.blob(), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': getType(path),
        'Cache-Control': 'public, max-age=31536000, immutable',
        Expires: 'Thu, 31 Dec 2099 23:59:59 GMT'
      }
    })
  }
}
