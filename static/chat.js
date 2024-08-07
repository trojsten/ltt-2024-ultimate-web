function print_submit_form(user) {
  const picker = new EmojiButton({
    theme: 'auto',
    position: 'top-start'
  })
  const message = document.getElementById('message')
  if (!message) return
  message.addEventListener('keydown', (event) => {
    if (
      (event.shiftKey || event.ctrlKey || event.metaKey) &&
      event.key == 'Enter'
    ) {
      add_chat_message(user)
      event.preventDefault()
    }
  })

  message.addEventListener('keydown', () => {
    setTimeout(() => {
      if (message.rows == 1 && message.scrollHeight > 24) {
        message.rows = 2
      }
    }, 0)
  })

  document.getElementById('submit').addEventListener('click', () => {
    add_chat_message(user)
  })

  picker.on('emoji', (e) => (message.value += e.emoji))
  document.getElementById('emoji').addEventListener('click', () => {
    picker.togglePicker(document.getElementById('form'))
  })

  let mediaCapture = document.getElementById('mediaCapture')
  document
    .getElementById('attachment')
    .addEventListener('click', () => mediaCapture.click())
  mediaCapture.addEventListener('change', onMediaFileSelected)
}
