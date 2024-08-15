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
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++)
      if (image[i][j] != 0) {
        await createQuest(
          `Na štvorčekovom papieri vyfarbi políčko na riadku označenom ${i} a stĺpci ${j} farbou ${mapf[image[i][j]]}, normálne číslujeme z rohu od 0, 0.`,
          'normal',
          undefined,
          3,
          0,
          []
        )
      }
  }
}

export const mazemQuesty = async () => {
  await db.quest.deleteMany()
}

export async function kamzik() {
  let stara_sestica = []
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
          0,
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

export async function generateChains() {
  for (let j = 0; j < 6; j++) {
    await generateChain(['Uprac pár topánok!'], 20, 10)
    await generateChain(['Choď sa osprchovať!'], 20, 10)
    /*await generateChain(
      [
        'Na parapete pri trojuholníkovom okne s výhľadom na les je sudoku, doplň doň jedno číslo.'
      ],
      5,
      0
    )
    await generateChain(
      [
        'Na parapete pri trojuholníkovom okne s výhľadom na roľnícke družstvo je papier, na ktorý sa píše príbeh, doplň doň jedno slovo.'
      ],
      5,
      0
    )
    await generateChain(
      [
        'Na výdajnom okienku je papier, na ktorom sa hrá slovný futbal, doplň doň jedno slovo.'
      ],
      5,
      0
    )*/
    await generateChain(['Umy si zuby.'], 20, 10)
    await generateChain(['Ľahni si na 30 sekúnd na zem.'], 20, 10)
    /*for (let i = 0; i < 6; i++) {
      await generateChain(
        [
          'Nájdi si papier, oddeľ z neho štvorec zhruba 1/6 A4 a odnes ho na parapet pod obdĺžnikovým oknom.',
          'Choď ku parapetu pod obdĺžnikovým oknom, vezmi papier, prelož ho na polovicu po uhlopriečke a odnes ho na radiátor pri topánkach.',
          'Choď ku radiatoru pri topánkach, vezmi papier, prilož k sebe 45° a 90° roh. Zarovnaj to. Prilož aj druhý 45° roh k 90˚ a opäť zarovnaj. Mal by si mať štvorec so spojom na uhlopriečke. Odnes ho ku radiátoru pod elektrickým vzpínačom.',
          'Choď ku radiátoru pod elektrickým vzpýnačom, veznmi papier, pozdĺž spoja na uhlopriečke zlož papier smerom dozadu. Rohy, čo niesú na uhlopriečke k sebe. Odnes ho na stolík s TV.',
          'Choď ku stolíku s TV, vezmi papier, Z rohu, kde sú 3 papiere spojené vyber stredný a zlož ho do vnútra cca na polovicu tak, že roytvoríš okrajové. Bočné tvoria uši, stred je ňufák líšky. Odnes ho potom do kvetináča'
        ],
        4,
        0
      )
    }*/
    await generateChain(['Sprav 5 klikov.'], 20, 10)
    await generateChain(['Sprav 5 brušákov.'], 20, 10)
    await generateChain(['Sprav 5 drepov.'], 20, 10)
    /*await generateChain(
      ['Vezmi jeden krajec nenatretého chlebíka a natri ho.'],
      2,
      0
    )
    await generateChain(['Zvýš hlasitosť reproduktoru v spoločenskej.'], 2, 0)
    await generateChain(['Zníž hlasitosť reproduktoru v spoločenskej.'], 2, 0)

    await generateChain(['Zlož gauč.', 'Rozlož gauč.'], 2, 0)

    await generateChain(
      ['Nájdi šantiloptičku zelenej farby a dones ju vedúcim.'],
      1,
      0
    )
    await generateChain(
      ['Nájdi šantiloptičku červenej farby a dones ju vedúcim.'],
      1,
      0
    )
    await generateChain(
      ['Nájdi šantiloptičku žltej farby a dones ju vedúcim.'],
      1,
      0
    )
    await generateChain(
      ['Nájdi šantiloptičku fialovej farby a dones ju vedúcim.'],
      1,
      0
    )
    await generateChain(
      ['Nájdi šantiloptičku modrej farby a dones ju vedúcim.'],
      1,
      0
    )
    await generateChain(
      [
        'Zakrič "Peniaze!!!" o kúsok hlasnešie a rovnako dlho ako si počul naposledy.'
      ],
      1,
      0
    )
    await generateChain(
      [
        'Zakrič "Peniaze!!!" o kúsok tichšie a rovnako dlho ako si počul naposledy.'
      ],
      1,
      0
    )

    await generateChain(
      [
        'Zakrič "Peniaze!!!" o kúsok dlhšie a rovnako hlasno ako si počul naposledy.'
      ],
      1,
      0
    )

    await generateChain(
      [
        'Zakrič "Peniaze!!!" o kúsok kratšie a rovnako hlasno ako si počul naposledy.',
        'Zakrič "Peniaze!!!" o kúsok dlhšie a rovnako hlasno ako si počul naposledy.'
      ],
      1,
      0
      )*/
  }
}

async function gen() {
  let a = 15 + Math.floor(Math.random() * 85)
  let b = 15 + Math.floor(Math.random() * 85)
  return [a, b, a * b]
}

export async function nasobenie() {
  for (let j = 0; j < 6; j++) {
    let poziadavka
    for (let i = 0; i < 1000; i++) {
      let cisla = await gen()
      poziadavka = await createQuest(
        `${cisla[0]} x ${cisla[1]} =`,
        'number',
        cisla[2],
        20,
        10,
        poziadavka ? [poziadavka] : undefined
      )
    }
  }
}

export async function najdiASprav() {
  let deti = await db.user.findMany({})
  let akcie = [
    'daj mu high5',
    'poštekli ho',
    'zakrič mu do ucha peniazeeee',
    'utri si doňho ruky'
  ]
  for (let i = 0; i < 6; i++) {
    let poziadavka
    for (let j = 0; j < 1000; j++) {
      poziadavka = await createQuest(
        `Choď za ${deti[Math.floor(Math.random() * deti.length)].name}, a ${akcie[Math.floor(Math.random() * akcie.length)]}`,
        'normal',
        undefined,
        21,
        10,
        poziadavka ? [poziadavka] : undefined
      )
    }
  }
}
