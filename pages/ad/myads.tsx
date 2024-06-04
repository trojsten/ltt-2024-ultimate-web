import config from '@config'
import db, { buy } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function myAds(userId: number) {
  const ads = await db.ad.findMany({
    where: {
      createdById: userId
    }
  })

  return (
    <div>
      {config().ads.enabled ? null : (
        <p className="text-red-500">
          Reklamy sú vypnuté, zapni ich v konfiguračnom súbore
        </p>
      )}
      <h1 className="text-2xl">Moje Reklamy</h1>
      <div className="grid grid-cols-3 gap-4 mb-32">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div>
              <h2>{ad.name}</h2>
              {ad.type == 'IMAGE' ? (
                <img src={ad.content} className="w-full h-full" />
              ) : (
                <video
                  src={ad.content}
                  className="w-full h-full"
                  disablePictureInPicture
                  controls
                />
              )}
              <p>Skóre: {ad.viewRemaining}</p>
              <p>Pozretia: {ad.views}</p>
              <form method="post">
                <input type="hidden" name="adId" value={ad.id} />
                <button type="submit" className="btn">
                  Boost ({config().ads.adBoostCost})
                </button>
              </form>
            </div>
          ))
        ) : (
          <p>Žiadne reklamy</p>
        )}
      </div>
      <a href="new" className="btn">
        Nová reklama
      </a>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await myAds(req.session!.user.id), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  const adId = parseInt(req.data!.get('adId') as string)
  if (!adId) {
    return get(req)
  }

  const ad = await db.ad.findUnique({
    where: {
      id: adId
    }
  })

  if (!ad) {
    return get(req)
  }

  try {
    await buy(
      req.session!.user.id,
      config().ads.adBoostCost,
      new String(`Boost reklamy #${ad.name}`)
    )
    await db.ad.update({
      where: {
        id: adId
      },
      data: {
        viewRemaining: ad.viewRemaining + config().ads.adBoostAmount
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    return get(req)
  }
}
