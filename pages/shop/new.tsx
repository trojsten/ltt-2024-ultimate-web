import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

function newItem() {
  return (
    <div>
      <h1>Nový produkt</h1>
      <form action="/shop/new" method="post" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Názov" />
        <input type="number" name="cost" placeholder="Cena" />
        <input type="number" name="amount" placeholder="Množstvo" />
        <input type="file" name="image" placeholder="Obrázok" />
        <textarea name="description">Popis</textarea>
        <button type="submit">Vytvoriť</button>
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  if (req.session?.user.admin) {
    return renderPage(newItem(), req)
  }
  return new Response('Unauthorized', { status: 403 })
}

export async function post(req: SessionRequest): Promise<Response> {
  const formdata = req.data!
  console.log(formdata.get('image'))
  const imageId = 'uploads/' + crypto.randomUUID()

  await Bun.write(imageId, formdata.get('image')!)

  await db.item.create({
    data: {
      cost: parseInt(formdata.get('cost') as string),
      amount: parseInt(formdata.get('amount') as string),
      name: formdata.get('name') as string,
      description: formdata.get('description') as string,
      image: '/' + imageId
    }
  })

  return Response.redirect('/shop')
}
