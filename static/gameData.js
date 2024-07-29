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
  const iframe = document.querySelector('iframe')
  iframe.contentWindow.postMessage({ gameId }, '*')

  window.addEventListener('message', (e) => {
    uploadData(e.data, gameId)
  })
})

async function uploadData(data, gameId) {
  await fetch(gameId + '/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: data.msg })
  })

  if (Math.random() > 0.8) {
    location.href = '/ad/show?back=' + encodeURIComponent(location.href)
  }
}
