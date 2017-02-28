/* global test, beforeEach, afterEach */

const {equal} = require('assert')

test('integration:', function () {
  const server = require('../..')

  test('signaling over base-path', function (done) {
    const WebSocket = require('ws')

    const address = addressFor(server)

    const hostInfo = 'host:info'
    const peerInfo = 'peer:info'

    new WebSocket(address) // host
    .on('message', function (info) {
      equal(info, peerInfo)
      this.send(hostInfo)
    })

    new WebSocket(address) // peer
    .once('open', function () {
      this.send(peerInfo)
    })
    .once('message', function (info) {
      equal(info, hostInfo)
      done()
    })

    function addressFor (server) {
      const {address, port} = server.options.server.address()
      return `ws://[${address}]:${port}`
    }
  })
  beforeEach(done => server.listen(0, done))
  afterEach(done => server.close(done))
})
