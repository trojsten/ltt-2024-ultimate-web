import { userHasTag } from '@db'
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

function Unauthorized() {
  return <div>K tejto hre nemáš prístup</div>
}

export async function get(req: SessionRequest): Promise<Response> {
  if (await userHasTag(req.session!.user.id, req.params.id)) {
    return renderPage(getPage(req.params.id), req)
  }

  return renderPage(Unauthorized(), req)
}
