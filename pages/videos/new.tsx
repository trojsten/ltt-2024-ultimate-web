import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function NewAd() {
  return (
    <div className="container w-full md:w-2/3 m-auto">
      <script src="/static/fileSizeCheck.js" defer async />
      <h1>Pridať nové video</h1>
      <form
        method="post"
        action="/videos/new"
        encType="multipart/form-data"
        className="flex flex-col"
      >
        <label htmlFor="name">Titulok</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="content">Content</label>
        <input
          type="file"
          name="content"
          id="content"
          accept="image/*, video/*"
          className="mb-2"
          required
        />
        <p id="warning" className="mb-3 text-red" hidden>
          Pred nahratím videa ho skomprimuj (
          <a
            className="text-blue"
            href="https://play.google.com/store/apps/details?id=com.arthur.hritik.proton.video.compressor"
          >
            napríklad touto appkou
          </a>{' '}
          - internet si choď vypítať), aby malo najviac 10MB
        </p>
        <button type="submit" className="btn">
          Vytvoriť
        </button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await NewAd(), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  /*const formdata = req.data!

  const name = formdata.get('name') as string
  const contentId = crypto.randomUUID()
  await Bun.write('uploads/' + contentId, formdata.get('content')!)

  await db.video.create({
    data: {
      name: name,
      content: '/uploads/' + contentId,
      userId: req.session!.user.id
    }
  })*/

  return Response.redirect('/videos')
}
