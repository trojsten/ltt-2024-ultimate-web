document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    location.href = '/ad/show?back=' + encodeURIComponent(location.href)
  }, Math.random() * 1000 * 60)
})
