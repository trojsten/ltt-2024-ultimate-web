document.addEventListener('DOMContentLoaded', () => {
  // document.addEventListener('storage', function (e) {
  //   let score = 0
  //   let gameId = ''
  //   console.log(e.key, e.newValue)
  //   if (e.key.match(/drift-boss/)) {
  //     score = JSON.parse(e.newValue).score
  //     gameId = 'drift-boss'
  //   }

  //   fetch('/games/score', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ score, gameId })
  //   })
  // })

  var gameId = document.getElementById('gameId').value
  console.log('gameData.js loaded ' + gameId)
  let currScore = 0

  setInterval(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if (gameId == 'drift-boss' && key.match(/drift-boss/)) {
        let score = JSON.parse(localStorage.getItem(key)).score
        if (score > currScore) {
          uploadScore(score, JSON.parse(localStorage.getItem(key)), gameId)
        }
        currScore = score
      } else if (gameId == 'spect' && key.match(/BestScore/)) {
        let score = JSON.parse(localStorage.getItem(key))
        if (score > currScore) {
          uploadScore(score, JSON.parse(localStorage.getItem(key)), gameId)
        }
      }
    }
  }, 500)

  window.addEventListener('message', (e) => {
    console.log(e.data)
    uploadScore(e.data.score, e.data.data, gameId)
  })
})

async function getdb() {
  const DBopen = indexedDB.open('/idbfs')
  DBopen.onsuccess = () => {
    const db = DBopen.result
    console.log(db)
    const store = db
      .transaction(db.objectStoreNames[0])
      .objectStore(db.objectStoreNames[0])
    store.getAllKeys().onsuccess = (e) => {
      const key = e.target.result.find((e) => e.match(/PlayerPrefs/))
      store.get(key).onsuccess = (e) => {
        const content = e.target.result.contents
        const data = new TextDecoder('utf-8').decode(content)
        console.log(data)
      }
    }
  }
}

// getdb()

function uploadScore(score, data, gameId) {
  fetch(gameId + '/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score, data: JSON.stringify(data) })
  })
}
