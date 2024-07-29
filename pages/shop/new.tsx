import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function newItem() {
  const tags = await db.tag.findMany()
  return (
    <div>
      <h1>Nový produkt</h1>
      <form
        action="/shop/new"
        method="post"
        encType="multipart/form-data"
        className="flex flex-col p-2 border-2 border-blue-500 rounded-md m-2"
      >
        <label htmlFor="image">Obrázok</label>
        <input
          type="file"
          name="image"
          placeholder="Obrázok"
          id="image"
          accept="image/*"
        />
        <label htmlFor="name">Názov</label>
        <input type="text" name="name" placeholder="Názov" id="name" />
        <label htmlFor="cost">Cena</label>
        <input type="number" name="cost" placeholder="Cena" id="cost" />
        <label htmlFor="amount">Maximálny počet zakúpení (celkovo)</label>
        <input type="number" name="amount" placeholder="Množstvo" id="amount" />
        <label htmlFor="amountPerUser">Maximálny počet zakúpení (na osobu)</label>
        <input type="number" name="amountPerUser" placeholder="Množstvo na osobu" id="amountPerUser" />
        <label htmlFor="description">Popis</label>
        <textarea
          name="description"
          id="description"
          placeholder="popis"
        ></textarea>
        <label htmlFor="tags">Tagy (kto si môže tento item kúpiť)</label>
        <select name='tags' multiple id='tags'>
          {tags.map(e => {
            return <option value={e.id}>{e.name}</option>
          })}
        </select>
        <button type="submit" className="btn">
          Vytvoriť
        </button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  if (req.session?.user.admin) {
    return renderPage(await newItem(), req)
  }
  return new Response('Unauthorized', { status: 403 })
}

export async function post(req: SessionRequest): Promise<Response> {
  const formdata = req.data!

  let imageId: string | null = 'uploads/' + crypto.randomUUID()
  try {
    await Bun.write(imageId, formdata.get('image')!)
    imageId = '/' + imageId
  } catch (error) {
    imageId = null
  } finally {
    await db.item.create({
      data: {
        cost: parseInt(formdata.get('cost') as string),
        amount: parseInt(formdata.get('amount') as string),
        name: formdata.get('name') as string,
        description: formdata.get('description') as string,
        image: imageId,
        amountPerUser: parseInt(formdata.get('amountPerUser') as string),
        consumable: formdata.get('consumable') === 'on',
        tags: {
          connect: formdata.getAll('tags').map(e => {
            return { id: e }
          })
        }
      }
    })
  }

  return Response.redirect('/shop')
}
