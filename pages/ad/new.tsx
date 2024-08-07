import config from '@config'
import db, { buy } from '@db'
import { renderPage } from '@main'
import type { AdType } from '@prisma/client'
import type { SessionRequest } from '@session'
import getDuration from 'get-video-duration'

async function NewAd() {
  const tags = await db.tag.findMany({
    where: {
      hidden: false
    }
  })
  return (
    <div className="container w-full md:w-2/3 m-auto">
      <script src='/static/fileSizeCheck.js'></script>
      <h1>Pridať novú reklamu</h1>
      <form
        method="post"
        action="/ad/new"
        encType="multipart/form-data"
        className="flex flex-col"
      >
        <label htmlFor="name">Titulok</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="link">Link (Kam ma to hodí, ak kliknem na reklamu) - nepovinné</label>
        <input type="text" name="link" id="link" />

        <label htmlFor="content">Content</label>
        <input
          type="file"
          name="content"
          id="content"
          accept="image/*, video/*"
          className="mb-4"
          required
        />
        <label htmlFor="tags">Komu sa má zobrazovať (Zobrazuje sa všetkým, ktorí majú aspoň jednu z uvedených vlastností)</label>
        <select
          name="tags"
          id="tags"
          multiple
          className="mb-4 border-2 border-gray-200 rounded-md p-2"
          required
        >
          {tags.map((tag) => (
            <option
              value={tag.id}
              key={tag.id}
              className="active:bg-blue-400 active:border-none"
            >
              {tag.name}
            </option>
          ))}
        </select>
        <label htmlFor="type">Typ Reklamy</label>
        <select
          name="type"
          id="type"
          className="mb-4 border-2 border-gray-200 rounded-md p-2"
          required
        >
          <option value="IMAGE">Obrázok</option>
          <option value="VIDEO">Video</option>
        </select>
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
          Vytvoriť ({config().ads.adCreationCost})
        </button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await NewAd(), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  const formdata = req.data!

  const name = formdata.get('name') as string
  const tags = formdata.getAll('tags') as string[]
  const type = formdata.get('type') as AdType
  const contentId = crypto.randomUUID()
  await Bun.write('uploads/' + contentId, formdata.get('content')!)
  const duration =
    type == 'IMAGE'
      ? 10
      : Math.min(await getDuration('uploads/' + contentId), 10)
  try {
    await buy(
      req.session!.user.id,
      config().ads.adCreationCost,
      new String('Vytvorenie reklamy ' + name)
    )
    await db.ad.create({
      data: {
        name: name,
        content: '/uploads/' + contentId,
        type: type,
        tags: {
          connect: tags.map((tag) => ({ id: parseInt(tag) }))
        },
        viewRemaining: config().ads.initialViews,
        views: 0,
        createdById: req.session!.user.id,
        link: formdata.get('link') as string,
        length: duration * 1000
      }
    })
  } catch (err) {
    console.log(err)

    return get(req)
  }

  return Response.redirect('/ad/myads')
}
