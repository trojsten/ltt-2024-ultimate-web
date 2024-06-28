var fakeStorage = {
  data: {},
  init: function (data) {

  },
  getItem: function (key) {
    return this.data[key]
  },
  setItem: function (key, value) {
    this.data[key] = value
    sendState(this.data)
  },
  removeItem: function (key) {
    if (!this.data) return
    delete this.data[key]
    sendState(this.data)
  },
  clear: function () {
    this.data = {}
  },
  key: function (index) {
    return Object.keys(this.data)[index]
  },
  get length() {
    return Object.keys(this.data).length
  }
}
const name = window.name

window.addEventListener('DOMContentLoaded', async () => {
  // var gameId = window.parent.document.getElementById('gameId').value
  const res = await fetch('data')
  if (res.status != 200) {
    return
  }

  const data = await res.json()
  fakeStorage.data = JSON.parse(await decryptGameData(data.encrypted, data.iv))
  // loadGame()
})

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function loadGame() {
  const script = document.createElement('script')
  script.src = 'game.js'
  document.head.appendChild(script)
}

async function decryptGameData(data, iv) {
  const key = await window.crypto.subtle.importKey('jwk', JSON.parse(atob(name)), { name: 'AES-GCM' }, false, ['decrypt'])
  const dec = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: base64ToArrayBuffer(iv)
    },
    key,
    base64ToArrayBuffer(data)
  )
  return new TextDecoder().decode(dec)
}

async function encryptGameData(data) {
  const key = await window.crypto.subtle.importKey('jwk', JSON.parse(atob(name)), { name: 'AES-GCM' }, false, ['encrypt'])
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const enc = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    new TextEncoder().encode(JSON.stringify(data))
  )
  return { enc, iv }
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


async function sendState(state) {
  const enc = await encryptGameData(state)
  const msg = arrayBufferToBase64(enc.enc)
  const iv = arrayBufferToBase64(enc.iv)
  window.parent.postMessage({
    msg: {
      msg,
      iv
    }
  }, '*')
}

window.fakeStorage = fakeStorage
