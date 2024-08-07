import db from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function allVideos() {
  const videos = await db.video.findMany({
    select: {
      name: true,
      id: true,
      rating: true,
      users: true,
      CreatedBy: {
        select: {
          name: true,
          team: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    }
  })

  const teams = await db.team.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      id: 'asc'
    }
  })

  return (
    <section className="mx-2">
      <h1 className="text-2xl">Všetky Videá</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="top-0 w-full bg-gray-500 overflow-hidden">
                <h2 className="text-lg text-center mb-3 mt-1 font-semibold">
                  <a href={`/videos/${video.id}`}>{video.name}</a>
                </h2>
              </div>
              <div className="mx-5 mt-3 mb-1.5">
                Hodnotenie:{' '}
                {video.users.length == 0
                  ? 'Žiadne hodnotenie'
                  : `${video.rating}`}
              </div>
              <div className="mx-5 my-1.5">
                Autor: {video.CreatedBy.team.name} ({video.CreatedBy.name})
              </div>
            </div>
          ))
        ) : (
          <p>Žiadne videá</p>
        )}
      </div>
      <div className="m-2">
        <h2 className="font-bold ml-6 mb-1">Staty</h2>
        <table className="border-collapse">
          <thead className="table-header-group bg-gray-400 border-b-2">
            <tr>
              <th>Družinka</th>
              <th className="px-3">Súčet bodov</th>
            </tr>
          </thead>
          {teams.map((team) => {
            return (
              <tr className="border-t-gray-200 border-t border">
                <td className="p-2 border">{team.name}</td>
                <td className="p-2 border text-end">
                  {videos
                    .filter((video) => video.CreatedBy.team.id == team.id)
                    .reduce((partialSum, vid) => partialSum + vid.rating, 0)}
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </section>
  )
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await allVideos(), req)
}
