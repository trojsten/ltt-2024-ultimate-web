import config from '@config'
import { getTeamForUser, userHasTag } from '@db'
import type { Team, User } from '@prisma/client'
import type { SessionRequest } from '@session'

export async function navbar(req: SessionRequest) {
  const user = req.session?.user
  let team: Team | null = null
  if (user) {
    team = await getTeamForUser(user.id)
  }

  const visibleModules = await Promise.all(
    modules.map((module) => isVisible(module.key, user))
  )

  return (
    <nav className="bg-gray-500 w-full p-2">
      <ul className="flex items-center justify-around flex-col-reverse md:flex-row">
        {modules
          .filter((_, i) => visibleModules[i])
          .map((module) => renderModule(module))}
        <li className="flex items-center">
          <span className="material-symbols-outlined">person</span>
          {user?.name} | {team?.money}
          <span className="material-symbols-outlined">monetization_on</span>
        </li>
      </ul>
    </nav>
  )
}

async function isVisible(module: string, user: User | undefined) {
  if (user === undefined) {
    return false
  }

  const visible = config().visibleModules[module]
  if (visible === undefined) {
    return false
  }

  if (visible === 'admin') {
    return user.admin === true
  } else if (visible === true) {
    return true
  } else if (visible === false) {
    return false
  } else {
    return await userHasTag(user.id, visible)
  }
}

function renderModule(module: Module) {
  return (
    <li key={module.key}>
      <a className="hover:bg-gray-600 transition-all" href={module.url}>
        {module.name}
      </a>
    </li>
  )
}

interface Module {
  name: string
  url: string
  key: string
}

const modules: Module[] = [
  {
    name: 'Profil',
    url: '/user',
    key: 'profile'
  },
  {
    name: 'Obchod',
    url: '/shop',
    key: 'shop'
  },
  {
    name: 'Transakcie',
    url: '/transactions',
    key: 'transactions'
  },
  {
    name: 'Hry',
    url: '/games',
    key: 'games'
  }
]
