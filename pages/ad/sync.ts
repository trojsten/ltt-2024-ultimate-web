import db from '@db'
import { SessionRequest, setSession } from '@session'

export async function get(req: SessionRequest): Promise<Response> {
  if (req.session?.ad?.timeRemaining === undefined) {
    return new Response('No ad watching currently', { status: 400 })
  } else if (Date.now() - req.session.ad.lastUpdated < 800) {
    req.session.ad.lastUpdated = Date.now()
    return setSession(
      new Response(
        'Takto ma hacknúť nevieš 🙂, predsa len niečo za pokus dostaneš, príď sa pochváliť vedúcim',
        { status: 200 }
      ),
      req.session
    )
  }

  const timeRemaining = req.session.ad.timeRemaining - 1000
  let res = Response.json(
    { status: 'Ad state updated successfully', timeRemaining: timeRemaining },
    { status: 200 }
  )
  req.session.ad.timeRemaining = timeRemaining
  req.session.ad.lastUpdated = Date.now()
  if (timeRemaining <= 0) {
    await db.ad.update({
      where: { id: req.session.ad.adWatched.id },
      data: {
        views: req.session.ad.adWatched.views + 1,
        viewRemaining: req.session.ad.adWatched.viewRemaining - 1
      }
    })

    res = Response.json(
      {
        status: 'Ad watched successfully',
        timeRemaining: 0,
        nextUrl: req.session.ad.nextPage
      },
      { status: 200 }
    )

    req.session.ad = undefined
  }

  return setSession(res, req.session)
}
