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

  setInterval(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if (gameId == 'drift-boss' && key.match(/drift-boss/)) {
        let score = JSON.parse(localStorage.getItem(key)).score
        console.log('drift-boss score', score)
      }
    }
  }, 500)
})
