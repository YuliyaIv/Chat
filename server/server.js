import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/usersData', (req, res) => {
  readFile(`${__dirname}/usersData.json`, 'utf8').then((data) => {
    const dataUsersParsing = JSON.parse(data)
    res.send(dataUsersParsing)
  })
})

server.get('/api/v1/channelsData', (req, res) => {
  readFile(`${__dirname}/channelsData.json`, 'utf8').then((data) => {
    const dataChannelsParsing = JSON.parse(data)
    res.send(dataChannelsParsing)
  })
})

server.post('/api/v1/usersData', async (req, res) => {
  let data
  try {
    data = await readFile(`${__dirname}/usersData.json`, 'utf8')
    data = JSON.parse(data)
  } catch (err) {
    data = {}
  }
  const newData = { ...data, ...req.body }
  writeFile(`${__dirname}/usersData.json`, JSON.stringify(newData), { encoding: 'utf8' })
  res.send(newData)
})

server.post('/api/v1/channelsData', async (req, res) => {
  let data
  try {
    data = await readFile(`${__dirname}/channelsData.json`, 'utf8')
    data = JSON.parse(data)
  } catch (err) {
    data = {}
  }
  const newData = { ...data, ...req.body }
  writeFile(`${__dirname}/channelsData.json`, JSON.stringify(newData), { encoding: 'utf8' })
  res.send(newData)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
