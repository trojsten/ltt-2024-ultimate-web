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
        `Prídi ku stolu v strede spoločenskej a na štvorčekový papier napíš pred ${i + 1}-ty riadok číslo ${mapr[i] + 1}.`,
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
        `Prídi ku stolu v strede spoločenskej a na štvorčekový papier napíš nad ${i + 1}-ty stĺpec číslo ${maps[i] + 1}.`,
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
          `Prídi ku stolu v strede spoločenskej a na štvorčekovom papieri vyfarbi políčko na riadku označenom ${mapr[i] + 1} a stĺpci ${maps[j] + 1} farbou ${mapf[image[i][j]]}.`,
          'normal',
          undefined,
          3,
          15,
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
      20,
      undefined
    )
  )
  poziadavky.push(
    await createQuest(
      `Pred záchodmi v spoločenskej pomocou lepiacej pásky, ktorú tam nájdeš, vyznač číslo 1.`,
      'normal',
      undefined,
      3,
      20,
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
        20,
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
          20,
          stara_sestica
        )
      )
    }
    stara_sestica = nova_sestica
  }
}

export async function generateChain(popisy, priority, reward, pocet = 1000) {
  let poziadavka
  for (let i = 0; i < pocet; i++) {
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

export async function fotenie() {
  let poziadavka = []
  for (let i = 0; i < 500; i++) {
    let zaciatok = await createQuest(
      'Vyber kostym zo skrinky pri TV a zaves ho na TV.',
      'normal',
      undefined,
      4,
      10,
      poziadavka
    )
    poziadavka.push(
      await createQuest(
        'Nájdi kostým na TV a obleč si ho.',
        'normal',
        undefined,
        100,
        20,
        [zaciatok]
      )
    )
    poziadavka.push(
      await createQuest('odfot cloveka tam ', 'normal', undefined, 100, 20, [
        zaciatok
      ])
    )
    poziadavka = [
      await createQuest('vrat kostym', 'normal', undefined, 4, 10, poziadavka)
    ]
  }
}

export async function generateChains() {
  await generateChain(['Choď sa osprchovať!'], 1, 150)
  await generateChain(
    [
      'Na parapete pri trojuholníkovom okne s výhľadom na les je sudoku, doplň doň jedno číslo.'
    ],
    5,
    25
  )
  await generateChain(
    [
      'Na parapete pri trojuholníkovom okne s výhľadom na roľnícke družstvo je doska s perom. Na doske je papier, na ktorý sa píše príbeh, doplň doň jedno slovo.'
    ],
    5,
    15
  )
  await generateChain(
    [
      'Na výdajnom okienku je doska s perom. Na doske je papier, na ktorom sa hrá slovný futbal, doplň doň jedno slovo.'
    ],
    5,
    15
  )
  await generateChain(['Umy si zuby.'], 2, 30)
  await generateChain(
    [
      'Vezmi pohár, ktorý je vedľa popolníku na terase, umy ho hubkou a vylož pred dvere kúpeľne. ',
      'Vezmi pohár, ktorý je pred kúpeľňou, napusti ho vodou a odnes ho ku popolníku na terase.',
      'Vypi pohár vody, ktorý je vedľa popolníka na terase mieste.'
    ],
    3,
    15
  )
  await generateChain(['Ľahni si na 30 sekúnd na zem.'], 2, 8)
  for (let i = 0; i < 6; i++) {
    await generateChain(
      [
        'Nájdi papier na skrinke pri dverách, oddeľ z neho štvorec zhruba 1/6 A4 a odnes ho na parapet pod obdĺžnikovým oknom.',
        'Choď ku parapetu pod obdĺžnikovým oknom, vezmi papier, prelož ho na polovicu po uhlopriečke a odnes ho na radiátor pri topánkach.',
        'Choď ku radiatoru pri topánkach, vezmi papier, prilož k sebe 45° a 90° roh. Zarovnaj to. Prilož aj druhý 45° roh k 90˚ a opäť zarovnaj. Mal by si mať štvorec so spojom na uhlopriečke. Odnes ho ku radiátoru pod elektrickým vzpínačom.',
        'Choď ku radiátoru pod elektrickým vzpýnačom, veznmi papier, pozdĺž spoja na uhlopriečke zlož papier smerom dozadu. Rohy, čo niesú na uhlopriečke k sebe. Odnes ho na stolík s TV.',
        'Choď ku stolíku s TV, vezmi papier, Z rohu, kde sú 3 papiere spojené vyber stredný a zlož ho do vnútra cca na polovicu tak, že roytvoríš okrajové. Bočné tvoria uši, stred je ňufák líšky. Odnes ho potom do kvetináča'
      ],
      4,
      20
    )
  }
  await generateChain(['Sprav 5 klikov.'], 2, 6)
  await generateChain(
    [
      'Vezmi nenatretý chlebík zo stal pri trojuholníkovom okne s výhľadom na roľnícke družstvo a natri ho.',
      'Vezmi natretý chlebík zo stola pri trojuholníkovom okne s výhˇdom na roľnícke družstvo a spapaj ho.'
    ],
    2,
    50
  )
  await generateChain(['Zvýš hlasitosť reproduktoru v spoločenskej.'], 2, 7)
  await generateChain(['Zníž hlasitosť reproduktoru v spoločenskej.'], 2, 7)

  await generateChain(['Rozlož gauč.', 'Zlož gauč.'], 2, 15)

  await generateChain(
    [
      'Vezmi šantiloptičku zelenej farby z vreca pri hasičskom prístroji a schovaj ju niekde na poschodí.',
      'Nájdi šantiloptičku zelenej farby a dones ju do vreca Dpri hasičskom prístroji'
    ],
    1,
    15
  )
  await generateChain(
    [
      'Vezmi šantiloptičku červenej farby z vreca pri hasičskom prístroji a schovaj ju niekde na poschodí.',
      'Nájdi šantiloptičku červenej farby a dones ju do vreca pri hasičskom prístroji'
    ],
    1,
    15
  )
  await generateChain(
    [
      'Vezmi šantiloptičku žltej farby z vreca pri hasičskom prístroji a schovaj ju niekde na poschodí.',
      'Nájdi šantiloptičku žltej farby a dones ju do vreca pri hasičskom prístroji'
    ],
    1,
    15
  )
  await generateChain(
    [
      'Vezmi šantiloptičku fialovej farby z vreca pri hasičskom prístroji a schovaj ju niekde na poschodí.',
      'Nájdi šantiloptičku fialovej farby a dones ju do vreca pri hasičskom prístroji'
    ],
    1,
    30
  )
  await generateChain(
    [
      'Vezmi šantiloptičku modrej farby z vreca pri hasičskom prístroji a schovaj ju niekde na poschodí.',
      'Nájdi šantiloptičku modrej farby a dones ju do vreca pri hasičskom prístroji'
    ],
    1,
    15
  )
  await generateChain(
    [
      'Zakrič "Peniaze!!!" o kúsok hlasnešie a rovnako dlho ako si počul naposledy.'
    ],
    1,
    5
  )
  await generateChain(
    [
      'Zakrič "Peniaze!!!" o kúsok tichšie a rovnako dlho ako si počul naposledy.'
    ],
    1,
    5
  )

  await generateChain(
    [
      'Zakrič "Peniaze!!!" o kúsok dlhšie a rovnako hlasno ako si počul naposledy.'
    ],
    1,
    5
  )

  await generateChain(
    [
      'Zakrič "Peniaze!!!" o kúsok kratšie a rovnako hlasno ako si počul naposledy.',
      'Zakrič "Peniaze!!!" o kúsok dlhšie a rovnako hlasno ako si počul naposledy.'
    ],
    1,
    5
  )
}

async function gen() {
  let a = Math.floor(Math.random() * 100)
  let b = Math.floor(Math.random() * 100)
  return [a, b, a * b]
}

export async function nasobenie() {
  let poziadavka
  for (let i = 0; i < 1000; i++) {
    let cisla = await gen()
    poziadavka = await createQuest(
      `${cisla[0]} x ${cisla[1]} =`,
      'number',
      cisla[2],
      2,
      20,
      poziadavka ? [poziadavka] : undefined
    )
  }
}

export async function najdiASprav() {}
