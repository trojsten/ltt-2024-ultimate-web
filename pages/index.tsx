import { renderPage } from '@/main'
import db from '@db'
import { type SessionRequest } from '@session'

async function home(req: SessionRequest) {
  const user = await db.user.findUnique({
    where: {
      id: req.session!.user.id
    }
  })
  const myItems = (
    await db.transaction.findMany({
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
    })
  )
    .map((e) => e.item)
    .filter((e) => e != null)

  console.log(myItems)

  return (
    <div className="m-0">
      <div className="bg-red-500">
        <h1 className="m-0 p-2">Legálne Transakcie Trojstenu</h1>
      </div>
      <section className="mx-2">
        <h2>Moje kúpené veci</h2>
        <ul>
          {myItems.map((item) => (
            <li
              key={item!.id}
              className="bg-gray-300 rounded-2xl p-2 m-1 flex items-center"
            >
              {item!.image && (
                <img
                  src={item!.image}
                  alt={item!.name}
                  className="w-12 h-12 mr-3 rounded-2xl"
                />
              )}
              {item!.name}
            </li>
          ))}
        </ul>
      </section>
      <hr className="" />
      <section className="mx-2 mt-4">
        <p>Do hovna som stúpil {user!.hovna}-krát</p>
        <form method="post" action="/user/hovna">
          <button type="submit" className="bg-green-500 px-2 py-1 rounded-md">
            Pridať
          </button>
          <button
            type="submit"
            name="remove"
            value="true"
            className="bg-red-500 px-2 py-1 rounded-md"
          >
            Odobrať
          </button>
        </form>
        <a className="btn my-3" href={'/games/' + 'hovna' + '/leaderboard'}>
          Rebricek
        </a>
      </section>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await home(req), req)
}
