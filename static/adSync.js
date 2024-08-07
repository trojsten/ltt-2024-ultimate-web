document.addEventListener('DOMContentLoaded', () => {
  let timeRemaining = 10
  const closeBtn = document.getElementById('skipBtn')
  const video = document.querySelector('video')
  const ad = document.getElementById('ad')
  const link = document.getElementById('link').href
  const closeHTML = closeBtn.innerHTML
  closeBtn.disabled = true
  closeBtn.style.display = 'none'

  function start() {
    if (link != null) {
      ad.addEventListener('click', () => {
        location.href = link
      })
    }
    const interval = setInterval(() => {
      fetch('/ad/sync')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          closeBtn.style.display = 'block'
          timeRemaining = data.timeRemaining
          closeBtn.innerHTML = Math.floor(timeRemaining / 1000)
          if (timeRemaining <= 0) {
            clearInterval(interval)
            closeBtn.innerHTML = closeHTML
            closeBtn.disabled = false
            closeBtn.addEventListener('click', () => {
              location.href = data.nextUrl
            })
          }
        })
    }, 1000)
  }

  if (video != null) {
    const promise = video.play()
    if (promise !== undefined) {
      promise
        .then(() => {
          start()
        })
        .catch((error) => {
          console.log('Error playing video:', error)
          video.controls = true
          video.addEventListener('play', () => {
            video.controls = false
            start()
          })
        })
    }
  } else {
    start()
  }

  history.pushState(null, document.title, location.href)
  window.addEventListener('popstate', function () {
    history.pushState(null, document.title, location.href)
  })
})
