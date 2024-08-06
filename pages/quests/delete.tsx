import { renderPage } from '@main'
import type { SessionRequest } from '@session'
import { mazemQuesty } from '@utils/questy/image'

export async function getGenerate(req: SessionRequest) {
  return (
    <form action="/quests/delete" method="post">
      <button type="submit">Delete</button>
    </form>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getGenerate(req), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  await mazemQuesty()
  return Response.redirect('/quests/delete')
}
