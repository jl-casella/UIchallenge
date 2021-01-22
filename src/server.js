const express = require('express')
const next = require('next')

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: 'src' })
const handle = app.getRequestHandler()

;(async () => {
  await app.prepare()
  const server = express()

  server.get('*', (req, res) => handle(req, res))

  await server.listen(PORT)
  // eslint-disable-next-line no-console
  console.log(`> Ready on http://localhost:${PORT}`)
})()
