import db from "@db";
import { renderPage } from "@main";
import type { SessionRequest } from "@session";

async function page(id: number) {
  const problem = await db.problem.findFirst({
    where: { id }
  })

  if (!problem) {
    return (
      <div>
        <h1>Úloha neexistuje</h1>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <script src="/static/problemAds.js"></script>
      <h1 className="text-center">{problem.name}</h1>
      <iframe src={problem.link} width="100%" height="100%"></iframe>
    </div>
  )
}


export async function get(req: SessionRequest) {
  const id = parseInt(req.params.id)
  return renderPage(await page(id), req)
}
