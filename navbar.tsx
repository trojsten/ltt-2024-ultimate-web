import { getTeamForUser } from '@db'
import type { Team } from '@prisma/client'
import type { SessionRequest } from '@session'

export async function navbar(req: SessionRequest) {
  const user = req.session?.user
  let team: Team | null = null
  if (user) {
    team = await getTeamForUser(user.id)
  }

  return (
    <nav className="bg-gray-500 w-full p-2">
      <ul className="flex items-center justify-around flex-col-reverse md:flex-row">
        <li>
          <a
            className="hover:bg-gray-600 transition-all"
            href={'/user/' + user?.id}
          >
            Profil
          </a>
        </li>
        {/* TODO: add button to collapse navbar on mobile. */}
        <li>
          <a className="hover:bg-gray-600 transition-all" href="/shop">
            Obchod
          </a>
        </li>
        <li>
          <a className="hover:bg-gray-600 transition-all" href="/transactions">
            Vykonané transakcie
          </a>
        </li>
        <li>
          <a className="hover:bg-gray-600 transition-all" href="/games">
            Hry
          </a>
        </li>
        <li className="flex items-center">
          <span className="material-symbols-outlined">person</span>
          {user?.name} | {team?.money}
          <span className="material-symbols-outlined">monetization_on</span>
        </li>
      </ul>
    </nav>
  )
}
