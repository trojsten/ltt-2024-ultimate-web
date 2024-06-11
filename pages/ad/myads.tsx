import config from '@config'
import db, { buy } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function myAds(userId: number) {
  const ads = await db.ad.findMany({
    where: {
      createdById: userId
    },
    select: {
      content: true,
      id: true,
      name: true,
      type: true,
      viewRemaining: true,
      views: true,
      tags: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      id: 'desc'
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div className="bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="top-0 w-full bg-gray-500 overflow-hidden">
                <h2 className="text-lg text-center mb-3 mt-1 font-semibold">
                  {ad.name}
                </h2>
              </div>
              {ad.type == 'IMAGE' ? (
                <img src={ad.content} className="h-48 w-auto m-auto" />
              ) : (
                <video
                  src={ad.content}
                  className="h-48 w-auto m-auto"
                  disablePictureInPicture
                  controls
                />
              )}
              <div className="p-2">
                <p>Skóre: {ad.viewRemaining}</p>
                <p>Pozretia: {ad.views}</p>
                {ad.viewRemaining > 0 ? null : (
                  <p className="text-red-500">
                    Reklama je neaktívna. Boostni ju, aby sa zobrazovala
                  </p>
                )}
                <p className="mt-1">
                  {ad.tags.map((tag) => (
                    <span className="bg-gray-400 rounded-full px-2 py-1 m-1">
                      {tag.name}
                    </span>
                  ))}
                </p>
              </div>
              <form method="post">
                <input type="hidden" name="adId" value={ad.id} />
                <button type="submit" className="btn w-full">
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
  console.log(adId)
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
    return new Response(err as string, { status: 400 })
  }
  return get(req)
}
