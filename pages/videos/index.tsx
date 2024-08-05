import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function myVideos(userId: number) {
  const videos = await db.video.findMany({
    where: {
      userId: userId
    },
    select: {
      name: true,
      content: true,
      id: true
    },
    orderBy: {
      id: 'desc'
    }
  })

  return (
    <section className="mx-2">
      <h1 className="text-2xl">Moje Videá</h1>
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
            </div>
          ))
        ) : (
          <p>Žiadne videá</p>
        )}
      </div>
      <a href="/videos/new" className="btn">
        Nové video
      </a>
    </section>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await myVideos(req.session!.user.id), req)
}
