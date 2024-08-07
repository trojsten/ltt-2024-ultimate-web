import db from "@db";
import { renderPage } from "@main";
import type { Problem, ProblemType } from "@prisma/client";
import type { SessionRequest } from "@session";


async function page() {
  const problems = await db.problem.findMany({
    orderBy: {
      id: "asc"
    }
  })

  return (
    <div>
      <h1>Úlohy</h1>
      <ul>
        {problems.map(problemHTML)}
      </ul>
    </div>
  )
}

function problemHTML(problem: Problem) {
  const colors: Record<ProblemType, string> = {
    Informatics: "bg-blue-500",
    Math: "bg-red-500",
    Physics: "bg-green-500",
  }

  const names = {
    Informatics: "Informatika",
    Math: "Matematika",
    Physics: "Fyzika",
  }
  return (
    <li className="flex justify-between items-center p-2 bg-gray-200 first:rounded-t-2xl last:rounded-b-2xl">
      <a href={'/problems/' + problem.id} className="text-lg pl-3 text-blue-500">{problem.name}</a>
      <span className={`px-2 py-1 text-white rounded-full ${colors[problem.type]}`}>{names[problem.type]}</span>
    </li>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await page(), req)
}
