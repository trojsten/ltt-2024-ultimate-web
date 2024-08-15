import { renderPage } from '@/main'
import db from '@db'
import { type SessionRequest } from '@session'

function addProfilePicture() {
  return (
    <div className="container w-full md:w-1/3 mr-auto ml-2 mt-3">
      <form
        method="post"
        action=""
        encType="multipart/form-data"
        className="flex flex-col"
      >
        <label htmlFor="content">Nová fotka</label>
        <input
          type="file"
          name="content"
          id="content"
          accept="image/*"
          className="mb-4"
          required
        />
        <button type="submit" className="btn">
          Zmeniť fotku
        </button>
      </form>
    </div>
  )
}

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
        },
        OR: [
          {
            item: {
              consumable: true
            }
          },
          {
            item: {
              tags: {
                some: {
                  name: 'lootbox'
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        item: {
          select: {
            tags: true,
            id: true,
            name: true,
            image: true
          }
        }
      }
    })
  )
    .map((e) => e.item)
    .filter((e) => e != null)

  let itemTransactionsPromises = []
  myItems.forEach((e) => {
    itemTransactionsPromises.push(
      db.transaction.findFirst({
        where: {
          userId: req.session!.user.id,
          consumed: false,
          NOT: {
            item: null
          },
          item: {
            id: e.id
          }
        }
      })
    )
  })
  const itemTransactions = await Promise.all(itemTransactionsPromises)

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
              <div className="flex justify-between grow">
                <p>{item!.name}</p>
                {item!.tags.some((e) => e.name == 'lootbox') ? (
                  <p>
                    <a
                      type="button"
                      className="bg-green-500 px-2 py-1 rounded-md"
                      href={
                        '/ad/show?back=/lootboxes/open/' +
                        itemTransactions[myItems.indexOf(item)].id
                      }
                    >
                      Otvoriť
                    </a>
                  </p>
                ) : null}
              </div>
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
      {addProfilePicture()}
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await home(req), req)
}

export async function post(req: SessionRequest) {
  const user = await db.user.findUnique({
    where: {
      id: req.session!.user.id
    }
  })
  const formdata = req.data!

  const contentId = user?.profileImage?.split('/')[2] ?? crypto.randomUUID()
  await Bun.write('uploads/' + contentId, formdata.get('content')!)

  await db.user.update({
    data: {
      profileImage: '/uploads/' + contentId
    },
    where: {
      id: user?.id
    }
  })
  return Response.redirect('/')
}
