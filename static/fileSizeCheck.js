window.addEventListener('load', () => {
  const fileInput = document.getElementById('content')
  fileInput.addEventListener('change', (e) => {
    const fileSize = fileInput.files[0].size / 1024 / 1024
    if (fileSize > 10) {
      console.log('aaaaaaa')
      document.getElementById('warning').hidden = false
      fileInput.value = ''
    } else {
      document.getElementById('warning').hidden = true
    }
  })
})
