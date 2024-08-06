import db from '@db'

const image = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5,
    5, 5
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 6, 6, 4,
    4, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5,
    5, 5
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 6, 6, 6, 6,
    6, 4, 4, 4, 6, 6, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5,
    5, 5
  ],
  [
    0, 0, 0, 0, 0, 4, 4, 6, 6, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5,
    5, 5
  ],
  [
    0, 0, 0, 0, 4, 6, 6, 6, 6, 6, 6, 6, 4, 0, 0, 0, 0, 0, 4, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5,
    5, 5
  ],
  [
    0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,
    5, 5
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0,
    0, 5
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    5, 0
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4,
    0, 0
  ],
  [
    3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 4, 0,
    0, 0
  ],
  [
    4, 4, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 4, 0,
    0, 0
  ],
  [
    1, 4, 4, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 6, 6, 4,
    0, 0
  ],
  [
    3, 1, 4, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 7, 7, 7, 0, 1, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 6, 6, 4,
    0, 0
  ],
  [
    3, 1, 4, 4, 3, 1, 0, 0, 0, 0, 0, 0, 1, 7, 7, 1, 7, 7, 1, 7, 7, 1, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 6, 6, 6, 6,
    4, 0
  ],
  [
    3, 3, 1, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 7, 7, 7, 7, 7, 1, 0, 1, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 4, 6, 4, 6,
    4, 0
  ],
  [
    3, 3, 3, 1, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 7, 7, 7, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 4, 4, 4, 6,
    4, 0
  ],
  [
    3, 3, 3, 3, 1, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    7, 7, 7, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, 4, 6, 4, 6,
    4, 0
  ],
  [
    3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
    1, 7, 7, 7, 1, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 6, 4, 6, 4, 6,
    4, 0
  ],
  [
    3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 6, 6, 6, 6, 6,
    4, 0
  ],
  [
    3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 3, 3, 3, 0, 0, 2, 0, 0, 0, 0, 4, 6, 6, 6, 4,
    0, 2
  ],
  [
    3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 2, 0, 2, 0, 2, 0, 1, 1, 1, 0, 1, 1, 1, 0,
    1, 1, 1, 0, 1, 1, 1, 2, 0, 3, 3, 3, 3, 3, 0, 2, 0, 2, 0, 2, 0, 4, 4, 4, 0,
    0, 2
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2
  ]
]
//generate random permutation of 0 to len(image)

const mapr = [...Array(image.length).keys()]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
const maps = [...Array(image[0].length).keys()]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

async function createQuest(task, type, answer, priority, reward, requiring) {
  if (requiring) {
    return (
      await db.quest.create({
        data: {
          task: task,
          type: type,
          answer: answer,
          priority: priority,
          reward: reward,
          requiring: {
            connect: requiring.map((id) => ({
              id
            }))
          }
        }
      })
    ).id
  } else {
    return (
      await db.quest.create({
        data: {
          task: task,
          type: type,
          answer: answer,
          priority: priority,
          reward: reward
        }
      })
    ).id
  }
}
let mapf = [
  'čierna',
  'zelená',
  'hnedá',
  'modrá',
  'žltá',
  'bledo fialová',
  'ružová'
]
export async function obrazok() {
  let poziadavky = []
  for (let i = 0; i < image.length; i++) {
    poziadavky.push(
      await createQuest(
        `Napíš pred ${i + 1}-ty riadok číslo ${mapr[i] + 1}.`,
        'normal',
        undefined,
        3,
        10,
        undefined
      )
    )
  }
  for (let i = 0; i < image[0].length; i++) {
    poziadavky.push(
      await createQuest(
        `Napíš nad ${i + 1}-ty stĺpec číslo ${maps[i] + 1}.`,
        'normal',
        undefined,
        3,
        10,
        undefined
      )
    )
  }
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++)
      if (image[i][j] != 0) {
        await createQuest(
          `Vyfarbi políčko na riadku označenom ${mapr[i] + 1} a stĺpci ${maps[j] + 1} farbou ${mapf[image[i][j]]}.`,
          'normal',
          undefined,
          3,
          10,
          poziadavky
        )
      }
  }
}

export const mazemQuesty = async () => {
  await db.quest.deleteMany()
}

export async function kamzik() {
  let poziadavky = []
  poziadavky.push(
    await createQuest(
      `Vezmi lepiacu pásku od vedúcich a odnes ju pred záchody v spoločenskej.`,
      'normal',
      undefined,
      3,
      10,
      undefined
    )
  )
  poziadavky.push(
    await createQuest(
      `Pred záchodmi v spoločenskej pomocou lepiacej pásky, ktorú tam nájdeš, vyznač číslo 1.`,
      'normal',
      undefined,
      3,
      10,
      poziadavky
    )
  )

  for (let i = 1; i < 6; i++) {
    poziadavky.push(
      await createQuest(
        `Pred záchodmi v spoločenskej pomocou lepiacej pásky, ktorú tam nájdeš, vyznač číslo ${i + 1}, tak aby bolo na pravo od čísla ${i}.`,
        'normal',
        undefined,
        3,
        10,
        poziadavky
      )
    )
  }
  let stara_sestica = poziadavky
  for (let i = 0; i < 2 ** 6; i++) {
    let s = i.toString(2).padStart(6, '0')

    let nova_sestica = []
    for (let i = 1; i <= 6; i++) {
      nova_sestica.push(
        await createQuest(
          s[i] == '0'
            ? `Pred záchodmi v spoločenske sa postav na vyznačené číslo ${i} a stoj tam 5 sekúnd.`
            : `Pred záchodmi v spoločenske sa postav na vyznačené číslo ${i} a urob tam drep.`,
          'normal',
          undefined,
          3,
          10,
          stara_sestica
        )
      )
    }
    stara_sestica = nova_sestica
  }
}

export async function generateChain(popisy, priority, reward) {
  let poziadavka
  for (let i = 0; i < 1000; i++) {
    for (let popis of popisy) {
      poziadavka = await createQuest(
        popis,
        'normal',
        undefined,
        priority,
        reward,
        poziadavka ? [poziadavka] : undefined
      )
    }
  }
}

export async function generateChains() {
  await generateChain(['Choď sa osprchovať!'], 1, 50)
  await generateChain(
    ['Na TODO miesto je sudoku, doplň doň jedno číslo.'],
    1,
    50
  )
  await generateChain(
    [
      'Na TODO miesto je doska s perom. Na doske je papier, na ktorý sa píše príbeh, doplň doň jedno slovo.'
    ],
    1,
    50
  )
  await generateChain(
    [
      'Na TODO miesto je doska s perom. Na doske je papier, na ktorom sa hrá slovný futbal, doplň doň jedno slovo.'
    ],
    1,
    50
  )
  await generateChain(['Umy si zuby.'], 1, 50)
  await generateChain(
    [
      'Vezmi pohár z TODO miesto, umy ho hubkou a vylož pred dvere kúpeľne. ',
      'Vezmi pohár z pred kúpeľne, napusti ho vodou a odnes na TODO miesto.',
      'Vypi pohár vody na TODO miesto.'
    ],
    1,
    50
  )
  await generateChain(['Ľahni si na 30 sekúnd na zem.'], 1, 50)
  await generateChain(['Chod na TODO1, vezmi papier, sprav z neho štvorec a odnes ho na TODO2.', 'Choď na TODO2'], 1, 50)
}
