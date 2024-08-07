import db from '@db'
import { renderPage } from '@main'
import type { User } from '@prisma/client'
import type { SessionRequest } from '@session'

async function watchVideos(user: User) {
  const videos = (
    await db.video.findMany({
      select: {
        name: true,
        content: true,
        id: true,
        rating: true,
        users: true
      }
    })
  ).filter((video) => !video.users.some((u) => u.id == user.id))
  return (
    <section className="mx-2">
      <h1 className="text-2xl">Videá na pozretie</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="top-0 w-full bg-gray-500 overflow-hidden">
                <h2 className="text-lg text-center mb-3 mt-1 font-semibold">
                  {video.name}
                </h2>
              </div>
              <video
                src={video.content}
                className="h-48 w-auto m-auto"
                disablePictureInPicture
                controls
              />
              <form
                method="post"
                action="/videos/watch"
                encType="multipart/form-data"
                className="flex flex-col"
              >
                <label className="mx-5 mt-3">
                  Zadaj hodnotenie (1-10):
                  <input
                    type="number"
                    defaultValue={1}
                    id="rating"
                    name="rating"
                    min={1}
                    max={10}
                    required
                  />
                </label>
                <input
                  type="hidden"
                  value={video.id}
                  name="id"
                  id="id"
                  required
                />
                <button type="submit" className="btn">
                  Ohodnoť
                </button>
              </form>
            </div>
          ))
        ) : (
          <p>Videl si všetko</p>
        )}
      </div>
    </section>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  if (!req.session!.user.admin) {
    return Response.redirect('/videos')
  }
  return renderPage(await watchVideos(req.session!.user), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  if (!req.session || !req.session.user.admin) {
    return new Response('Unauthorized', { status: 403 })
  }
  const formdata = req.data!

  const videoId = Number(formdata.get('id'))
  const rating = Number(formdata.get('rating'))
  const ratedByUser = req.session!.user

  await db.video.update({
    where: { id: videoId },
    data: {
      rating: { increment: rating * rating * rating },
      users: {
        connect: {
          id: ratedByUser.id
        }
      }
    }
  })
  return Response.redirect('/videos/watch')
}
