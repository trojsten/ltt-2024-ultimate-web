import db from "@db";
import { renderPage } from "@main";
import type { SessionRequest } from "@session";


async function getPage(req: SessionRequest) {
  const teams = await db.team.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return <div>
    <h1>Manažment peňazí</h1>
    <form className="p-10" method="post">
      <div className="flex flex-col mb-3">
        <label htmlFor="note">Poznámka</label>
        <input type="text" name="note" id="note" className="w-full" required />
      </div>
      {teams.map(team => <div className="flex items-center justify-between mb-3" key={team.id}>
        {team.name} ({team.money})
        <input type="number" name={'money' + team.id} placeholder="Peniaze" defaultValue={req.parsedUrl.searchParams.get('money' + team.id) ?? undefined} />
      </div>)}
      <input type="submit" className="btn" />
    </form>
    <h3>Inflácia</h3>
    <form action="/inflation" className="p-10" method="post">
      <div className="flex flex-col mb-3">
        <label htmlFor="inflation">Inflácia</label>
        <input type="number" name="inflation" id="inflation" className="w-full" required step={0.001} />
      </div>
      <input type="submit" className="btn" />
    </form>
  </div>
}

export async function get(req: SessionRequest): Promise<Response> {
  return renderPage(await getPage(req), req)
}

export async function post(req: SessionRequest) {
  if (!req.session || !req.session.user.admin) {
    return new Response('Unauthorized', { status: 403 });
  }
  const data = req.data as FormData;
  const note = data.get('note') as string;

  // @ts-expect-error keys are strings
  for (const key of data.keys() as string[]) {
    if (!key.startsWith("money")) continue;
    const teamId = parseInt(key.slice(5));
    if (data.get(key) == '') continue;
    const money = parseInt(data.get(key) as string);
    await db.transaction.create({
      data: {
        amount: -money,
        description: note,
        teamId: teamId,
        userId: req.session!.user.id
      }
    })

    await db.team.update({
      where: { id: teamId },
      data: {
        money: {
          increment: money
        }
      }
    })
  }

  return renderPage(await getPage(req), req)
}
