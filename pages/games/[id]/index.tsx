import { userHasTag } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { getEncryptionKey } from './data'

async function getPage(id: string, req: SessionRequest) {
  const enckey = await getEncryptionKey(req.session!.user.id)
  console.log(enckey)
  return (
    <div className="min-h-screen">
      <script src="/static/gameData.js"></script>
      <input type="hidden" id="gameId" value={id} />
      <div>
        <iframe
          src={'/games/' + id + '/game-source'}
          className="w-full h-screen"
          name={enckey}
        ></iframe>
      </div >
    </div>
  )
}

function Unauthorized() {
  return <div>K tejto hre nemáš prístup</div>
}

export async function get(req: SessionRequest): Promise<Response> {
  if (await userHasTag(req.session!.user.id, req.params.id)) {
    return renderPage(await getPage(req.params.id, req), req)
  }

  return renderPage(Unauthorized(), req)
}
