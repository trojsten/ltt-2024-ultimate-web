import fs from 'fs'

type ModuleVisibility = 'admin' | true | false | string

export interface Game {
  name: string
  iframeUrl: string
  sourceUrl: string
  thumbnail: string
  cost: number
}

export interface Config {
  visibleModules: {
    [key: string]: ModuleVisibility
  }
  system_tags: string[]
  games: Record<string, Game>
  reservations: {
    differentSexMultiplier: number
    sameBedMultiplier: number
    sameRoomMultiplier: number
  }
  ads: {
    enabled: boolean
    adBoostCost: number
    adBoostAmount: number
    earnPerAdWatch: number
    adCreationCost: number
    initialViews: number
  }
  transactions: {
    transactionUnlockCost: number
  }
}

let config: Config = loadConfig()

export function loadConfig(): Config {
  const str = fs.readFileSync('config.json', 'utf-8')
  return JSON.parse(str) as Config
}

const watcher = fs.watch(import.meta.dir, (event, filename) => {
  console.log(`Detected ${event} in ${filename}`)
  if (event !== 'change' || filename !== 'config.json') return
  console.log('Reloading config')
  const currConfig = JSON.parse(JSON.stringify(config))
  try {
    config = loadConfig()
  } catch (err) {
    console.error(err)
    config = currConfig
  }
})

process.on('SIGINT', () => {
  watcher.close()
})

export default function getConfig(): Config {
  return config
}
