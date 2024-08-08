import { EmojiButton } from '/static/emoji-button.min.js'

const $e = (elName, cl, parEl) => {
  if (elName == 'svg' || elName == 'path') {
    var e = document.createElementNS('http://www.w3.org/2000/svg', elName)
    cl.forEach((val) => e.setAttributeNS(null, val[0], val[1]))
  } else {
    var e = document.createElement(elName)
    cl.forEach((val) => e.setAttribute(val[0], val[1]))
  }
  if (parEl) parEl.appendChild(e)
  return e
}

const picker = new EmojiButton({
  theme: 'auto',
  position: 'top-start'
})
const message = document.getElementById('message')
message.addEventListener('keydown', (event) => {
  if (
    (event.shiftKey || event.ctrlKey || event.metaKey) &&
    event.key == 'Enter'
  ) {
    document.getElementById('form').requestSubmit()
    event.preventDefault()
  }
})

message.addEventListener('keydown', () => {
  setTimeout(() => {
    if (message.rows == 1 && message.scrollHeight > 40) {
      message.rows = 2
    }
  }, 0)
})

document.getElementById('submit').addEventListener('click', () => {
  document.getElementById('form').requestSubmit()
})

picker.on('emoji', (e) => (message.value += e.emoji))
document.getElementById('emoji').addEventListener('click', () => {
  picker.togglePicker(document.getElementById('form'))
})

let file

let mediaCapture = document.getElementById('mediaCapture')
document
  .getElementById('attachement')
  .addEventListener('click', () => mediaCapture.click())
mediaCapture.addEventListener('change', (e) => {
  e.preventDefault()

  file = e.target.files[0]

  if (!file.type.match('image.*') || file.size > 20 * 1024 * 1024) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    }
    file = undefined
    return
  }

  document.getElementById('img-preview')?.remove()
  const image = $e(
    'img',
    [['id', 'img-preview']],
    document.getElementById('form')
  )
  image.style.position = 'absolute'
  image.style.zIndex = '-1'
  image.style.top = '-10em'
  image.style.width = '80%'
  image.style.borderRadius = '2em'
  image.style.webkitMask = 'linear-gradient(#1111 0%, red 10em, transparent 0%)'
  image.style.mask = 'linear-gradient(#1111 0%, red 10em, transparent 0%)'

  image.src = URL.createObjectURL(file)
})
