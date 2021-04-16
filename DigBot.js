let mineflayer = require('mineflayer')
let { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
let GoalFollow = goals.GoalFollow
const { TaskQueue } = require('mineflayer-utils')
const armorManager = require('mineflayer-armor-manager')
const Item = require('prismarine-item')('1.8')
const collectBlock = require('mineflayer-collectblock').plugin
vec3 = require("vec3")

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
  let bot = mineflayer.createBot({
    // host: 'AMS_SKOM.aternos.me',
    // port: 46160,
    host: 'amsrpl.southeastasia.cloudapp.azure.com',
    // port: 25565,
    username: name
  })

  bot.loadPlugin(pathfinder)
  bot.loadPlugin(armorManager)
  bot.loadPlugin(collectBlock)

  // Load mc data
  let mcData
  bot.once('spawn', () => {
    mcData = require('minecraft-data')(bot.version)
  })

  // Listen for when a player says "collect [something]" in chat
  bot.on('chat', (username, message) => {
    const args = message.split(' ')
    if (args[0] !== 'collect') return

    // Get the correct block type
    const blockType = mcData.blocksByName[args[1]]
    if (!blockType) {
      bot.chat("I don't know any blocks with that name.")
      return
    }

    bot.chat('Collecting the nearest ' + blockType.name)

    // Try and find that block type in the world
    const block = bot.findBlock({
      matching: blockType.id,
      maxDistance: 64
    })

    if (!block) {
      bot.chat("I don't see that block nearby.")
      return
    }

    // Collect the block if we found one
    bot.collectBlock.collect(block, err => {
      if (err) bot.chat(err.message)
    })
  })
}
