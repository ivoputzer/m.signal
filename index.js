const {createServer} = require('wss')

module.exports = createServer(function (ws) {
  const [owner] = this.clients
  return ws !== owner && ws.once('message', (data) => {
    owner.send(data)
    owner.once('message', (data) => ws.send(data))
  })
})
