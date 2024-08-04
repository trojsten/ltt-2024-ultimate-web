import { renderPage } from '@/main'
import db from '@db'
import { type SessionRequest } from '@session'

async function home(req: SessionRequest) {
  const myItems = (await db.transaction.findMany({
    where: {
      userId: req.session!.user.id,
      consumed: false,
      NOT: {
        item: null
      }
    },
    select: {
      item: true
    }
  })).map(e => e.item).filter(e => e != null)

  console.log(myItems)

  return (
    <div>
      <div className="bg-red-500">
        <h1>Legálne Transakcie Trojstenu</h1>
      </div>
      <section className='mx-2'>
        <h2>Moje kúpené veci</h2>
        <ul>
          {myItems.map((item) => (
            <li key={item!.id} className='bg-gray-300 rounded-2xl p-2 m-1 flex items-center'>
              {item!.image && (
                <img src={item!.image} alt={item!.name} className='w-12 h-12 mr-3 rounded-2xl' />
              )}
              {item!.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await home(req), req)
}
