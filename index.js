const {createServer} = require('wss')

module.exports = createServer(function (ws) {
  // const {pathname} = ws.pathname = parse(ws.upgradeReq.url).pathname
  // const {isOwner} = ws.isOwner = Array.from(this.clients).filter(by({pathname}))
  // console.log(ws.upgradeReq)
  const [owner] = this.clients
  return ws !== owner && ws.once('message', (data) => {
    owner.send(data)
    owner.once('message', (data) => ws.send(data))
  })
  // function neighbors (ws, {clients}) {
  //   const pathname =
  //   return Array.from(clients).filter(ws => {
  //     return pathname === parse(ws.upgradeReq.url).pathname
  //   })
  // }
})
