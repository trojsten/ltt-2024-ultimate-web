import db, { getQuestForUser, getTeamForUser } from '@db'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

async function AssignNewQuest(req: SessionRequest) {
  await db.$transaction(async (db) => {
    const newQuests = await db.quest.findMany({
      select: { id: true, priority: true },
      where: {
        requiring: { none: {} },
        user: null
      }
    })

    const newQuestsMultiple = []
    for (const quest of newQuests) {
      for (let i = 0; i < quest.priority; i++) {
        newQuestsMultiple.push(quest)
      }
    }

    const newQuest =
      newQuestsMultiple[Math.floor(Math.random() * newQuestsMultiple.length)]

    let quest = await getQuestForUser(req.session!.user.id)
    if (quest) {
      const team = await getTeamForUser(req.session!.user.id)
      await db.transaction.create({
        data: {
          amount: -quest!.reward,
          userId: req.session!.user.id,
          teamId: team.id,
          description: 'Splnený quest'
        }
      })

      await db.team.update({
        where: {
          id: team.id
        },
        data: {
          money: {
            increment: quest!.reward
          }
        }
      })
      await db.quest.delete({
        where: {
          id: quest!.id
        }
      })
    }

    await db.user.update({
      where: {
        id: req.session!.user.id
      },
      data: {
        Quest: {
          connect: {
            id: newQuest!.id
          }
        }
      }
    })
  })
}

async function getQuest(req: SessionRequest) {
  let quest = await getQuestForUser(req.session!.user.id)
  if (!quest) {
    await AssignNewQuest(req)
    quest = await getQuestForUser(req.session!.user.id)
  }

  return (
    <form action="/quests" method="post">
      <h1>{quest!.task}</h1>
      {quest!.type === 'text' && <input type="text" name="answer" />}
      {quest!.type === 'number' && <input type="number" name="answer" />}
      <button type="submit">Submit</button>
    </form>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getQuest(req), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  const formdata = req.data!

  const quest = await getQuestForUser(req.session!.user.id)

  if (quest?.answer == formdata.get('answer')) {
    await AssignNewQuest(req)
  }

  return Response.redirect('/quests')
}
