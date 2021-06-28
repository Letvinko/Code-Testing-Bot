let mineflayer = require('mineflayer')
let { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
let GoalFollow = goals.GoalFollow

let i = 0
function next () {
  if (i < 15) {
    i++
    setTimeout(() => {
      createBot(`mineflayer-bot${i}`)
      next()
    }, 5000)
  }
}
next()

function createBot (name) {
  const bot = mineflayer.createBot({
    // host: 'localhost',
    // port: 49626,
    host: 'amsrpl.southeastasia.cloudapp.azure.com',
    // port: 25565,
    username: name
  })
  bot.loadPlugin(pathfinder)
  bot.on('chat', function (username, message) {
    if (message === 'follow') return
      const playerBot = bot.players[username]

      if (!playerBot || !playerBot.entity) {
        bot.chat("I can't see Player!")
        return
      }

      const mcData = require('minecraft-data')(bot.version)
      const movements = new Movements(bot, mcData)

      bot.pathfinder.setMovements(movements)

      const goal = new GoalFollow(playerBot.entity, 1)
      bot.pathfinder.setGoal(goal, true)

  })
}
