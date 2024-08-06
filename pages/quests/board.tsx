import db from "@db";
import { renderPage } from "@main";
import type { SessionRequest } from "@session";

async function getPage() {
  const quests = await db.quest.findMany({
    where: {
      NOT: {
        user: null
      }
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  })

  quests.sort((a, b) => a.user!.name.localeCompare(b.user!.name))
  return (
    <table className="table w-full">
      <thead className="table-header-group bg-gray-400 border-b-2">
        <tr>
          <th>Meno</th>
          <th>Quest</th>
        </tr>
      </thead>
      <tbody>
        {quests.map(quest => (
          <tr className="border-r-2">
            <td>{quest.user!.name}</td>
            <td className="min-w-48">{quest.task}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export async function get(req: SessionRequest) {
  if (!req.session?.user.admin) {
    return new Response("Unauthorized", { status: 401 })
  }
  return renderPage(await getPage(), req)
}
