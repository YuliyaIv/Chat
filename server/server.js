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

const readingFile = (file) => {
  return readFile(`${__dirname}/${file}`, 'utf8')
}

const writingFile = (file, newData) => {
  return writeFile(`${__dirname}/${file}`, JSON.stringify(newData), { encoding: 'utf8' })
}
server.get('/api/v1/usersData', (req, res) => {
  readingFile('usersData.json').then((data) => {
    const dataUsersParsing = JSON.parse(data)
    res.send(dataUsersParsing)
  })
})

server.get('/api/v1/channelsData', (req, res) => {
  readingFile('channelsData.json').then((data) => {
    const dataChannelsParsing = JSON.parse(data)
    res.send(dataChannelsParsing)
  })
})

server.post('/api/v1/usersData', async (req, res) => {
  let data
  try {
    data = await readingFile('usersData.json')
    data = JSON.parse(data)
  } catch (err) {
    data = {}
  }
  const newData = { ...data, ...req.body }
  writingFile('usersData.json', newData)
  res.send(newData)
})

server.patch('/api/v1/usersData/:userId', async (req, res) => {
  const { body } = req
  try {
    const objectOfUsers = await readingFile('usersData.json')
    const parseObjectOfUsers = JSON.parse(objectOfUsers)
    const { userId } = req.params
    const users = Object.keys(parseObjectOfUsers).includes(userId)
    const newObjUser = !users
      ? { ...parseObjectOfUsers, [userId]: body }
      : { ...parseObjectOfUsers }
    await writingFile('usersData.json', newObjUser)
    res.send({ status: 'user - OK' })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.post('/api/v1/channelsData', async (req, res) => {
  let data
  try {
    data = await readingFile('channelsData.json')
    data = JSON.parse(data)
  } catch (err) {
    data = {}
  }
  const newData = { ...data, ...req.body }
  writingFile('channelsData.json', newData)
  res.send(newData)
})

server.patch('/api/v1/channelsData', async (req, res) => {
  const {
    body: { objectFromNewChannel }
  } = req
  try {
    const dataOfNewChannelAddedFromServer = await readingFile('channelsData.json')
    const objOlderChannels = JSON.parse(dataOfNewChannelAddedFromServer)
    const updateChannels = {
      ...objOlderChannels,
      ...objectFromNewChannel
    }
    await writingFile('channelsData.json', updateChannels)
    res.status(200).json(updateChannels)
  } catch (err) {
    console.error(new Error(err))
  }
})

server.patch('/api/v1/channelsData/:idChannel', async (req, res) => {
  const { body } = req

  try {
    const objectOfChannels = await readingFile('channelsData.json')
    const parseObjectOfChannels = JSON.parse(objectOfChannels)
    const { idChannel } = req.params
    const channels = Object.keys(parseObjectOfChannels).reduce((a, c) => {
      return c.includes(idChannel) ? a : { ...a, [idChannel]: body }
    }, parseObjectOfChannels)
    await writingFile('channelsData.json', channels)
    res.send({ status: 'channel - OK' })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.patch('/api/v1/channelsData/:idChannel/chatDataMessage/:idMessage', async (req, res) => {
  const { body } = req
  try {
    const { idChannel } = req.params
    const objectOfChannels = await readingFile('channelsData.json')

    const parseObjectOfChannels = JSON.parse(objectOfChannels)
    const arrayOfMessages = parseObjectOfChannels[idChannel].chatDataMessage
    const updateArray = [...arrayOfMessages, body]

    const updateObject = {
      ...parseObjectOfChannels,
      [idChannel]: {
        ...parseObjectOfChannels[idChannel],
        chatDataMessage: updateArray
      }
    }

    writingFile('channelsData.json', updateObject)
    res.send({ status: 'sended message', body })
  } catch (err) {
    console.error(new Error(err))
  }
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
