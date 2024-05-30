import db from '@db'
import type { Sex } from '@prisma/client'

const system_tags = ['transactions', 'drift-boss', 'capybara']

async function importTags() {
  await db.tag.createMany({
    data: system_tags.map((e) => {
      return {
        name: e
      }
    })
  })
}

async function importUsersFromCsv(file: string) {
  const f = Bun.file(file)
  const data = f.stream().toString()
  const lines = data.split('\n')

  db.user.createMany({
    data: lines.map((e) => {
      const x = e.split(',')
      return {
        name: x[0],
        password: x[1],
        email: x[2],
        sex: x[3] as Sex,
        teamId: parseInt(x[4])
      }
    })
  })
}
