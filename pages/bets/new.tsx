import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

function getHTML() {
  return (
    <div>
      <script src="/static/newbet.js"></script>
      <h1>Pridať novú stávku</h1>
      <form>
        <input type="text" name="description" />
        <div className="outcomes"></div>
        <button className="btn add-outcome">Pridať možný výsledok</button>
        <button type="submit">Pridať</button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(getHTML(), req)
}

export async function post(req: SessionRequest) {
  await db.bet.create({
    data: {
      description: req.data.get('description'),
      eveluated: false,
      possileOutcomes: JSON.parse(req.data.get('outcomes'))
    }
  })

  return Response.redirect(`/bets`)
}
