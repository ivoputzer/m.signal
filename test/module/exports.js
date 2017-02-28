/* global test */

const {ok, equal} = require('assert')

test('module.exports:', function () {
  const ws = require('ws')
  const server = require('../..')

  test('is instance of ws.Server', function () {
    ok(server instanceof ws.Server)
  })

  test('aint listening', function () {
    equal(server.listening, false)
  })

  test('can listen on a given port', function (done) {
    server.listen(0, (noop) => server.close(done))
  })
})
