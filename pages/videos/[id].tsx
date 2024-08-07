import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function getPage(req: SessionRequest): Promise<JSX.Element> {
  const id = parseInt(req.params.id)
  const video = await db.video.findUnique({
    where: {
      id: id
    }
  })

  if (!video) {
    return <div>No video with this id</div>
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black">
      <h1 className="absolute top-3 left-5 text-3xl text-white">
        {video.name}
      </h1>
      <video
        src={video.content}
        className="w-full h-full object-contain"
        disablePictureInPicture
        controls
      />
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await getPage(req), req)
}
