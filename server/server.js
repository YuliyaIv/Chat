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

const readingFile = async (file) => {
  const readingData = await readFile(`${__dirname}/${file}`, 'utf8')
  return JSON.parse(readingData)
}

const writingFile = (file, newData) => {
  return writeFile(`${__dirname}/${file}`, JSON.stringify(newData), { encoding: 'utf8' })
}

server.get('/api/v1/usersData', async (req, res) => {
  const dataUsers = await readingFile('usersData.json')
  res.send(dataUsers)
})

server.get('/api/v1/channelsData', async (req, res) => {
  const dataChannels = await readingFile('channelsData.json')
  res.send(dataChannels)
})

server.post('/api/v1/usersData', async (req, res) => {
  const newUser = req.body
  let users
  try {
    users = await readingFile('usersData.json')
  } catch (err) {
    users = {}
  }
  const updateUsers = { ...users, ...newUser }
  writingFile('usersData.json', updateUsers)
  res.send(updateUsers)
})

server.patch('/api/v1/usersData/:userId', async (req, res) => {
  const {
    body: newUser,
    params: { userId }
  } = req
  try {
    const objectOfUsers = await readingFile('usersData.json')
    const users = Object.keys(objectOfUsers).includes(userId)
    const newObjUser = !users ? { ...objectOfUsers, [userId]: newUser } : { ...objectOfUsers }
    await writingFile('usersData.json', newObjUser)
    res.send({ status: 'user - OK' })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.post('/api/v1/channelsData', async (req, res) => {
  const newChannel = req.body
  let channels
  try {
    channels = await readingFile('channelsData.json')
  } catch (err) {
    channels = {}
  }
  const newData = { ...channels, ...newChannel }
  await writingFile('channelsData.json', newData)
  res.send(newData)
})

server.patch('/api/v1/channelsData', async (req, res) => {
  const {
    body: { objectFromNewChannel }
  } = req
  try {
    const objOlderChannels = await readingFile('channelsData.json')
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
  const { body: newChanell } = req
  try {
    const objectOfChannels = await readingFile('channelsData.json')
    const { idChannel } = req.params
    const channels = Object.keys(objectOfChannels).reduce((a, c) => {
      return c.includes(idChannel) ? a : { ...a, [idChannel]: newChanell }
    }, objectOfChannels)
    await writingFile('channelsData.json', channels)
    res.send({ status: 'channel - OK' })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.patch('/api/v1/channelsData/:idChannel/chatDataMessage/:idMessage', async (req, res) => {
  const {
    body: newMessage,
    params: { idChannel }
  } = req
  try {
    const objectOfChannels = await readingFile('channelsData.json')
    const arrayOfMessages = objectOfChannels[idChannel].chatDataMessage
    const updateArray = [...arrayOfMessages, newMessage]

    const updateObject = {
      ...objectOfChannels,
      [idChannel]: {
        ...objectOfChannels[idChannel],
        chatDataMessage: updateArray
      }
    }
    await writingFile('channelsData.json', updateObject)
    res.send({ status: 'sended message', newMessage })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.delete('/api/v1/channelsData/:idChannel', async (req, res) => {
  const { idChannel } = req.params
  try {
    const objectOfChannels = await readingFile('channelsData.json')
    delete objectOfChannels[idChannel]
    await writingFile('channelsData.json', objectOfChannels)
    res.send({ status: 'delete and update channels', objectOfChannels })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.delete('/api/v1/channelsData/:idChannel/chatDataMessage/:idMessage', async (req, res) => {
  const { idChannel, idMessage } = req.params
  try {
    const objectOfChannels = await readingFile('channelsData.json')
    const filtredArray = objectOfChannels[idChannel].chatDataMessage.filter((obj) => {
      return obj.idMessage !== +idMessage
    })
    const updateChatDataMessage = [...filtredArray]
    objectOfChannels[idChannel].chatDataMessage = updateChatDataMessage
    await writingFile('channelsData.json', objectOfChannels)
    res.send({ status: 'delete and update message', objectOfChannels })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.patch('/api/v1/channelsData/:idChannel/nameChannel', async (req, res) => {
  const updatePartucilarChannel = req.body
  const {
    params: { idChannel }
  } = req
  try {
    const objectOfChannels = await readingFile('channelsData.json')
    objectOfChannels[idChannel] = updatePartucilarChannel
    await writingFile('channelsData.json', objectOfChannels)
    res.send({ status: 'updated objectChannels with new channelName', objectOfChannels })
  } catch (err) {
    console.error(new Error(err))
  }
})

server.patch(
  '/api/v1/channelsData/:idChannel/chatDataMessage/:idMessage/updateMessage',
  async (req, res) => {
    const updatePartucilarChannel = req.body
    const {
      params: { idChannel }
    } = req
    try {
      const objectOfChannels = await readingFile('channelsData.json')
      objectOfChannels[idChannel] = updatePartucilarChannel
      await writingFile('channelsData.json', objectOfChannels)
      res.send({ status: 'updated objectChannels with change message', objectOfChannels })
    } catch (err) {
      console.error(new Error(err))
    }
  }
)

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
