'use strict' // eslint-disable-line strict
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')({ dev: true })
const compression = require('compression')
const app = express()
const server = require('http').createServer(app)

// const bodyParser = require('body-parser')
// const path = require('path')
// const requestProxy = require('express-request-proxy')
// const io = require('socket.io')(server)

const compiler = webpack(config)
const port = 3000
app.use('/', function(req, res, next) {
  if (/^\/version/.test(req.url)) req.url = `/docs${req.url}`
  if (/^\/service-worker.js/.test(req.url)) {
    req.url = `/src${req.url}`
  }
  if (/^\/sw-toolbox.js|sw-toolbox.map.json/.test(req.url)) {
    req.url = `/node_modules/sw-toolbox${req.url}`
  }
  console.log(req.url)
  next()
})

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(compression({
  threshold: 512,
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// app.use(bodyParser.json({
//   limit: 100000000,
//   type: 'application/json',
// }))

// app.post('/greeting', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(JSON.stringify({
//     greeting: `greetings ${req.body.name} from dev server`,
//   }))
// })

app.get('/greeting', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    greeting: 'greetings from dev server',
  }))
})

app.use('/', express.static('.'))

// app.all('*', (req, res, next) => {
//   const url = require('url').parse(req.url)
//   const conf = objectAssign({}, req, {
//     url: 'http://127.0.0.1:8888' + url.pathname,
//     timeout: 120000
//   })
//   requestProxy(conf)(req, res, next)
// })

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log(`Listening at http://localhost:${port}`) // eslint-disable-line no-console
})

// io.on('connection', socket => {
//   io.set('origins', '*:*')
//   console.log('connected') // eslint-disable-line no-console
//   socket.emit('update', 'connected')
//   socket.on('single', () => {
//     socket.emit('update', 'single')
//   })
//   socket.on('publish', data => {
//     io.sockets.emit('update', data)
//   })
// })
