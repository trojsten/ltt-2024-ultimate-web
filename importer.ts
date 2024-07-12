/* eslint-disable @typescript-eslint/no-unused-vars */
import db from '@db'
import type { Sex } from '@prisma/client'

const system_tags = ['transactions', 'drift-boss', 'capybara']

export async function importTags() {
  await Promise.all(
    system_tags.map(async (tag) => {
      await db.tag.upsert({
        where: {
          name: tag
        },
        update: {},
        create: {
          name: tag
        },
      })
    })
  )
}

export async function importUsersFromCsv(file: string) {
  const f = Bun.file(file)
  const data = (await f.text()).trim()
  const lines = data.split('\n')

  await Promise.all(
    lines.map(async (line) => {
      const x = line.split(',')

      const user = await db.user.findFirst({ where: { email: x[2] } })

      if (!user) {
        const team = await db.team.create({
          data: {
            name: x[0].trim(),
            money: 0
          }
        })
        await db.user.create({
          data: {
            name: x[0].trim(),
            password: await Bun.password.hash(x[1]),
            email: x[2],
            sex: x[3] as Sex,
            teamId: team.id
          }
        })
      }
    })
  )
}
