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
    <nav>
      <ul className="flex justify-center">
        <li>
          <a href={'/user/' + user?.id}>Profil</a>
        </li>
        <li>
          <a href="/shop">Obchod</a>
        </li>
        <li>
          <a href="/transactions">Vykonané transakcie</a>
        </li>
        <li>{team?.money}</li>
      </ul>
    </nav>
  )
}
