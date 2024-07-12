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

  return (
    <aside className="shrink-0 md:w-64 bg-gray-800 flex flex-col">
      <header className="pl-4 bg-blue-500 flex gap-1 justify-center items-center h-14">
        <span className="block material-symbols-outlined">person</span>
        {user?.name} | {team?.money}
        <span className="block material-symbols-outlined">monetization_on</span>
        <div
          className="flex justify-center items-center ml-auto mr-2 text-white text-sm md:hidden px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer"
          id="toggle"
        >
          <span className="block material-symbols-outlined">menu</span>
        </div>
      </header>
      <div className="md:block overflow-y-auto hidden" id="nav">
        {await Promise.all(
          modules.map(async (nav_group) => (
            <nav className="p-4 flex flex-col gap-1 border-b border-gray-700">
              <header className="font-bold uppercase text-gray-400 text-sm mb-1">
                {nav_group.name}
              </header>
              {await Promise.all(
                nav_group.items.map(async (module) =>
                  (await isVisible(module.key, user))
                    ? renderModule(module)
                    : null
                )
              )}
            </nav>
          ))
        )}
      </div>
    </aside>
  )
}
async function isVisible(module: string, user: User | undefined) {
  console.log(module)
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
    <a
      className="font-medium text-gray-200 px-2 py-1 hover:bg-gray-900 rounded gap-2"
      href={module.url}
    >
      {module.name}
    </a>
  )
}

interface Module {
  name: string
  url: string
  key: string
}

interface NavGroup {
  name: string
  items: Module[]
}

const modules: NavGroup[] = [
  {
    name: 'default',
    items: [
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
      },
      {
        name: 'Moje Reklamy',
        url: '/ad/myads',
        key: 'ads'
      },
      {
        name: 'Rezervácie',
        url: '/reservations',
        key: 'reservations'
      },
      {
        name: 'Platby',
        url: '/payments/quickPay',
        key: 'payments'
      }
    ]
  }
]
