import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

export async function getChannelList(req: SessionRequest) {
  const channels = await db.channel.findMany({
    where: {
      users: {
        some: {
          id: req.session!.user.id
        }
      }
    },
    select: {
      id: true,
      name: true
    }
  })

  return (
    <div className="container w-full md:w-2/3 m-auto">
      <h1 className="text-2xl my-2">Chaty</h1>
      <ul className="flex flex-col m-2">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="m-2 border-2 rounded-md p-2 flex justify-between items-center border-blue-500"
          >
            <a href={`/chat/${channel.id}`}>{channel.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getChannelList(req), req)
}
