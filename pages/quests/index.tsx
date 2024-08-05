import db, { getQuestForUser } from '@db'
import { renderPage } from '@main'
import type { User } from '@prisma/client'
import type { SessionRequest } from '@session'

async function AssignNewQuest(req: SessionRequest) {
  return db.$transaction(async (db) => {
    const newQuests = await db.quest.findMany({
      select: { id: true, priority: true },
      where: {
        requiring: { none: {} },
        user: null
      }
    })

    let newQuest = newQuests[0]
    for (const quest of newQuests) {
      if (quest.priority < newQuest.priority) {
        newQuest = quest
      }
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
    quest = await AssignNewQuest(req)
  }

  return (
    <form method="post">
      <input type="hidden" name="id" value={quest.id} />
      <h1>{quest.task}</h1>
      {quest.type === 'text' && <input type="text" name="answer" />}
      {quest.type === 'number' && <input type="number" name="answer" />}
      <button type="submit">Submit</button>)
    </form>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getQuest(req), req)
}

export async function post(req: SessionRequest): Promise<Response> {
  const formdata = req.data!

  const quest = getQuestForUser(req.session!.user.id)
  /*
  if (quest?.answer == formdata.get('answer')) {
    await db.quest.update({
      where: {
        id: quest.id
      },
      data: {
        requiredBy: {
          disconnect: {}
        }
      }
    })
  }
*/
  return Response.redirect('/shop')
}
