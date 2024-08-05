import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function Page(req: SessionRequest) {
  let items = await db.transaction.findMany({
    where: {
      consumed: false,
      NOT: {
        item: null
      },
      item: {
        consumable: true
      }
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      item: {
        select: {
          name: true,
          tags: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  if (
    req.parsedUrl.searchParams.has('tag') &&
    req.parsedUrl.searchParams.get('tag') != 'any'
  ) {
    items = items.filter((e) =>
      e.item!.tags.some((e) => e.name == req.parsedUrl.searchParams.get('tag'))
    )
  }
  const tags = await db.tag.findMany()

  return (
    <div>
      <h1>Nevybavené objednávky</h1>
      <form method="get">
        <select
          name="tag"
          value={req.parsedUrl.searchParams.get('tag') ?? 'any'}
        >
          <option value="any">Všetky</option>
          {tags.map((e) => (
            <option value={e.name}>{e.name}</option>
          ))}
        </select>
        <button type="submit" className="btn">
          Filtrovať
        </button>
      </form>
      <table>
        <thead className="table-header-group bg-gray-400 border-b-2">
          <tr>
            <th>Meno</th>
            <th>Produkt</th>
            <th>Čas</th>
            <th>Vybaviť</th>
          </tr>
        </thead>
        {items.map((e) => {
          return (
            <tr className="border-t-gray-200 border-t border">
              <td className="p-2">{e.user.name}</td>
              <td className="p-2">{e.item?.name}</td>
              {timeHTML(e.createdAt)}
              <td className="p-2">
                <form method="post">
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className="btn">
                    Vybaviť
                  </button>
                </form>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

function timeHTML(time: Date) {
  const diff = Date.now() - time.getTime()
  const day = 1000 * 60 * 60 * 24
  return (
    <td className="flex justify-center items-center">
      {diff > day ? time.toDateString() : time.toLocaleTimeString()}
    </td>
  )
}

export async function get(req: SessionRequest) {
  if (!req.session?.user.admin) {
    return new Response('Unauthorized', { status: 403 })
  }
  return renderPage(await Page(req), req)
}

export async function post(req: SessionRequest) {
  if (!req.session?.user.admin) {
    return new Response('Unauthorized', { status: 403 })
  }

  const id = parseInt(req.data!.get('id'))
  await db.transaction.update({
    where: {
      id
    },
    data: {
      consumed: true
    }
  })

  return renderPage(await Page(req), req)
}
