import { renderPage } from '@main'
import type { SessionRequest } from '@session'

function getPage(id: string) {
  return (
    <div className="min-h-screen">
      <script src="/static/gameData.js"></script>
      <input type="hidden" id="gameId" value={id} />
      <div>
        <iframe
          src={'/games/' + id + '/game-source'}
          className="w-full h-screen"
        ></iframe>
      </div>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(getPage(req.params.id), req)
}
