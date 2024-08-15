import config from '@config'
import { getTeamForUser, userHasTag } from '@db'
import type { Team, User } from '@prisma/client'
import type { SessionRequest } from '@session'
import { Icon } from '@iconify-icon/react'

export async function navbar(req: SessionRequest) {
  const user = req.session?.user
  let team: Team | null = null
  if (user) {
    team = await getTeamForUser(user.id)
  }

  return (
    <aside className="shrink-0 md:w-64 bg-gray-800 flex flex-col">
      <header className="bg-blue-500 flex items-center h-14">
        <a href="/" className="pl-4 flex gap-1 justify-center items-center">
          <Icon icon="mdi:person-outline" width="1.2em" height="1.2em" />
          {user?.name} | {team?.money}
          <Icon icon="mdi:dollar" width="1.2em" height="1.2em" />
          <span
            className="icon-[mdi--attach-money]"
            style={{ width: '1.2em', height: '1.2em;' }}
          ></span>
        </a>
        <div
          className="flex justify-center items-center ml-auto mr-2 text-white text-sm md:hidden px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer"
          id="toggle"
        >
          <Icon icon="mdi:menu" width="1.5em" height="1.5em" />
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
    name: 'Nákup',
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
        name: 'Rezervácie',
        url: '/reservations',
        key: 'reservations'
      }
    ]
  },

  {
    name: 'fun',
    items: [
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
        name: 'Videá',
        url: '/videos',
        key: 'videos'
      },
      {
        name: 'Stávky',
        url: '/bets',
        key: 'bets'
      },
      {
        name: 'Questy',
        url: '/quests',
        key: 'quests'
      },
      {
        name: 'Chat',
        url: '/chat',
        key: 'chat'
      }
    ]
  },
  {
    name: 'peniaze',
    items: [
      {
        name: 'Transakcie',
        url: '/transactions',
        key: 'transactions'
      },
      {
        name: 'Platby',
        url: '/payments/quickPay',
        key: 'payments'
      },
      {
        name: 'Pridaj Peniaze družinkám',
        url: '/management',
        key: 'management'
      }
    ]
  },
  {
    name: 'Admin management',
    items: [
      {
        name: 'Mergovanie družiniek',
        url: '/teams',
        key: 'teams'
      },
      {
        name: 'Aktuálne questy',
        url: '/quests/board',
        key: 'quests-admin'
      },
      {
        name: 'Fix upload',
        url: '/upload',
        key: 'upload'
      }
    ]
  }
]
