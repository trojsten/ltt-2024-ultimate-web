document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form')
  // const submitBtn = document.querySelector('button[type="submit"]')
  // submitBtn.disabled = true
  // submitBtn.style.opacity = 0.5
  // setTimeout(() => {
  //   submitBtn.disabled = false
  //   submitBtn.style.opacity = 1
  // }, 10000)
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    show()
    setTimeout(() => {
      form.submit()
    }, 750)
  })
})


function show() {
  var end = Date.now() + 750;

  // go Buckeyes!
  var colors = ['#ffffff', '#4299el'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.9 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.9 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
