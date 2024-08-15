import { getAdsForUser } from '@db'
import { renderPage } from '@main'
import type { Ad, User } from '@prisma/client'
import { setSession, type SessionRequest } from '@session'
import { Icon } from '@iconify-icon/react'
import getDuration from 'get-video-duration'

function renderAd(ad: Ad) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black">
      <h1 className="absolute top-3 left-5 text-3xl text-white">{ad.name}</h1>
      <a href={ad.link ?? ''} id="link"></a>
      {ad.type == 'IMAGE' ? (
        <img
          src={ad.content}
          className="w-full h-full object-contain"
          id="ad"
        />
      ) : (
        <video
          src={ad.content}
          className="w-full h-full object-contain"
          disablePictureInPicture
          id="ad"
        />
      )}

      <button className="btn absolute right-2 top-2" id="skipBtn">
        <Icon icon="mdi:cancel-circle-outline" width="1.2em" height="1.2em" />
      </button>
      <script src="/static/adSync.js"></script>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  if (req.session?.ad == undefined)
    return new Response('No ad is currently being watched', { status: 400 })
  req.session.ad.timeRemaining = await getAdLength(
    req.session.ad.adWatched,
    req.session.ad.skippable
  )
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

export async function startAdWatch(
  req: SessionRequest,
  backUrl?: string,
  skippable: boolean = true
) {
  if (req.session?.ad !== undefined) {
    return new Response('An ad is already being watched', { status: 400 })
  } else if (req.session?.user === undefined) {
    return new Response('User not logged in', { status: 400 })
  }

  const ad = await pickAd(req.session.user)
  if (!ad) {
    throw 'no ad available'
  }

  let length = ad.length

  if (!skippable) {
    length =
      ad.type == 'VIDEO'
        ? (await getDuration(ad.content.substring(1))) * 1000
        : 10
    console.log('Ad length', length)
  }

  req.session.ad = {
    timeRemaining: await getAdLength(ad, skippable),
    lastUpdated: Date.now(),
    adWatched: ad,
    nextPage: backUrl ?? req.url,
    skippable
  }

  console.log('Ad started', req.session.ad)

  return setSession(Response.redirect('/ad'), req.session)
}

async function getAdLength(ad: Ad, skippable: boolean) {
  if (!skippable) {
    return ad.type == 'VIDEO'
      ? (await getDuration(ad.content.substring(1))) * 1000
      : 30
  }
  return ad.length
}
