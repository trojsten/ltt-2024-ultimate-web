import fs from 'fs'

type ModuleVisibility = 'admin' | true | false | string

export interface Game {
  name: string
  iframeUrl: string
  sourceUrl: string
  thumbnail: string
  cost: number
  leaderboard: {
    enabled: boolean
    order: 'asc' | 'desc'
  }
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
    cancelRefund: number
    currentDay: string
    sameRoommateMultiplier: number
  }
  ads: {
    enabled: boolean
    adBoostCost: number
    adBoostAmount: number
    earnPerAdWatch: number
    adCreationCost: number
    initialViews: number
    adShowProbability: number
  }
  transactions: {
    transactionUnlockCost: number
  }
}

let config: Config = loadConfig()

export function loadConfig(): Config {
  const str = fs.readFileSync('uploads/config.json', 'utf-8')
  return JSON.parse(str) as Config
}

const watcher = fs.watch(import.meta.dir + '/uploads', (event, filename) => {
  console.log(`Detected ${event} in ${filename}`)
  if (event !== 'change' || filename !== 'config.json') return
  const currConfig = JSON.parse(JSON.stringify(config))
  try {
    config = loadConfig()
  } catch (err) {
    console.error(err)
    config = currConfig
    fs.writeFileSync('uploads/config.json', JSON.stringify(config, null, 2))
  }
})

process.on('SIGINT', () => {
  watcher.close()
})

export default function getConfig(): Config {
  return config
}
