import db, { getAdsForUser } from '@db'
import { renderPage } from '@main'
import type { Ad, User } from '@prisma/client'
import { setSession, type SessionRequest } from '@session'

function renderAd(ad: Ad) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black">
      {ad.type == 'IMAGE' ? (
        <img src={ad.content} className="w-full h-full" />
      ) : (
        <video
          src={ad.content}
          autoPlay
          className="w-full h-full"
          disablePictureInPicture
        />
      )}

      <button className="btn absolute right-2 top-2" id="skipBtn">
        <span className="material-symbols-outlined">cancel</span>
      </button>
      <script src="/static/adSync.js"></script>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  if (req.session?.ad == undefined)
    return new Response('No ad is currently being watched', { status: 400 })
  req.session.ad.timeRemaining = req.session.ad.adWatched.length
  return setSession(
    await renderPage(renderAd(req.session.ad.adWatched), req),
    req.session
  )
}

export async function pickAd(user: User) {
  const adsAvailable = await getAdsForUser(user.id)
  const viewSum = adsAvailable.reduce((acc, ad) => acc + ad.viewRemaining, 0)
  const rand = Math.floor(Math.random() * viewSum)
  let sum = 0
  for (const ad of adsAvailable) {
    sum += ad.viewRemaining
    if (sum >= rand) {
      return ad
    }
  }
}

export async function startAdWatch(req: SessionRequest) {
  if (req.session?.ad !== undefined) {
    return new Response('An ad is already being watched', { status: 400 })
  } else if (req.session?.user === undefined) {
    return new Response('User not logged in', { status: 400 })
  }

  const ad = await pickAd(req.session.user)
  if (!ad) {
    throw 'no ad available'
  }

  req.session.ad = {
    timeRemaining: ad.length,
    lastUpdated: Date.now(),
    adWatched: ad,
    nextPage: req.url
  }

  console.log('Ad started', ad.id, ad.name, ad.length)

  return setSession(Response.redirect('/ad'), req.session)
}
