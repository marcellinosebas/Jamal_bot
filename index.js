const mineflayer = require('mineflayer')

let reconnecting = false
let antiAfkInterval = null

function createBot() {
  reconnecting = false

  const bot = mineflayer.createBot({
    host: 'marcellinosebastian.aternos.me',
    port:  60263,
    username: 'Jamal_Bot',
    version: '1.20.1',
    auth: 'offline'
  })

  function reconnect(reason) {
    if (reconnecting) return
    reconnecting = true

    if (antiAfkInterval) {
      clearInterval(antiAfkInterval)
      antiAfkInterval = null
    }

    console.log(`${reason}, reconnecting in 5 seconds...`)
    setTimeout(createBot, 5000)
  }

  bot.on('spawn', () => {
    console.log('suttibabu is online!')

    antiAfkInterval = setInterval(() => {
      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)
    }, 30000)
  })

  bot.on('kicked', (reason) => {
    console.log('Bot got kicked:', reason)
    reconnect('Bot got kicked')
  })

  bot.on('error', (err) => {
    console.log('Error:', err.message)
  })

  bot.on('end', () => {
    reconnect('Bot disconnected')
  })
}

createBot()
