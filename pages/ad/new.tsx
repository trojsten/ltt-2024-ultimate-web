import config from '@config'
import db, { buy } from '@db'
import { renderPage } from '@main'
import type { AdType } from '@prisma/client'
import type { SessionRequest } from '@session'
import getDuration from 'get-video-duration'

async function NewAd() {
  const tags = await db.tag.findMany()
  return (
    <div>
      <h1>Pridať novú reklamu</h1>
      <form method="post" action="/ad/new" encType="multipart/form-data">
        <label htmlFor="name">Titulok</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="content">Content</label>
        <input
          type="file"
          name="content"
          id="content"
          accept="image/*, video/*"
        />
        <label htmlFor="tags">Komu sa má zobrazovať</label>
        <select name="tags" id="tags" multiple>
          {tags.map((tag) => (
            <option value={tag.id} key={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <label htmlFor="type">Typ Reklamy</label>
        <select name="type" id="type">
          <option value="IMAGE">Obrázok</option>
          <option value="VIDEO">Video</option>
        </select>
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
    type == 'IMAGE' ? 10 : await getDuration('uploads/' + contentId)
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
        length: duration * 1000
      }
    })
  } catch (err) {
    console.log(err)

    return get(req)
  }

  return Response.redirect('/ad/myads')
}
