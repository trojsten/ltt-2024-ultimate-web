import db, { getTeamForUser } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Transactions(transactions: any[], showAll: boolean, isAdmin: boolean) {
  return (
    <div>
      <h1 className="text-xl font-bold text-center">Vykonané transakcie</h1>

      <table className="table w-full">
        <thead className="table-header-group bg-gray-400 border-b-2">
          <tr>
            <th>Hodnota</th>
            <th>Meno</th>
            <th>Produkt</th>
            {showAll ? <th>Družinka</th> : null}
            <th>Čas</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((e) => (
            <tr className="text-center">
              <td>{e.amount}</td>
              <td>{e.user.name}</td>
              <td>{e.item.name}</td>
              {showAll ? <td>{e.team.name}</td> : null}
              <td>{e.createdAt.toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin ? (
        <a
          href={showAll ? '/transactions' : '/transactions?all'}
          className="btn"
        >
          {showAll ? 'Zobraziť len moje' : 'Zobraziť všetky'}
        </a>
      ) : null}
    </div>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  req.parsedUrl.searchParams.get('all')
  let showAll = false
  if (
    req.parsedUrl.searchParams.get('all') != null &&
    req.session?.user.admin
  ) {
    showAll = true
  }

  if (showAll) {
    const transactions = await db.transaction.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        },
        item: {
          select: {
            name: true
          }
        },
        team: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return renderPage(Transactions(transactions, showAll, true), req)
  }

  const team = await getTeamForUser(req.session!.user.id)

  const transactions = await db.transaction.findMany({
    where: {
      teamId: team!.id
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      item: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return renderPage(
    Transactions(transactions, showAll, req.session!.user.admin),
    req
  )
}
