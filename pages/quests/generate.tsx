import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { kamzik, obrazok, osprchuj } from '@utils/questy/image'

export async function getGenerate(req: SessionRequest) {
  return (
    <div>
      <form action="/quests/generate" method="post">
        <button type="submit">Generate</button>
      </form>
      <form action="/quests/delete" method="post">
        <button type="submit">Delete</button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getGenerate(req), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  await obrazok()
  // await kamzik()
  // await osprchuj()
  return Response.redirect('/quests/generate')
}
