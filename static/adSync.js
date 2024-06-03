document.addEventListener('DOMContentLoaded', () => {
  let timeRemaining = 10
  const closeBtn = document.getElementById('skipBtn')
  const video = document.querySelector('video')
  const closeHTML = closeBtn.innerHTML
  closeBtn.disabled = true
  closeBtn.style.display = 'none'
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
  if (video != null) {
    try {
      video.play()
    } catch (error) {
      video.muted = true
      video.play()
    }
  }

  history.pushState(null, document.title, location.href)
  window.addEventListener('popstate', function () {
    history.pushState(null, document.title, location.href)
  })
})
