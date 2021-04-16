const mineflayer = require('mineflayer')

let i = 0
function next () {
  if (i < 20) {
    i++
    setTimeout(() => {
      createBot(`mineflayer-bot${i}`)
      next()
    }, 5000)
  }
}
next()

function createBot (name) {
  mineflayer.createBot({
    host: 'amsrpl.southeastasia.cloudapp.azure.com',
    // port: 3389,
    // host: 'AMS_SKOM.aternos.me',
    // port: 46160,
    username: name
  })
}
