import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { io } from 'socket.io-client'

import rootReducer from './reducers'
import createHistory from './history'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)

const socket = io('/', {
  auth: {
    token: 'my token from reducer index.js'
  }
})
socket.on('connect', () => {
  console.log('hi', socket.id)
})
socket.on('chatMessage', (message) => console.log(message))
/* каждому сокету присваивается свой айдишник, когда видим id в консоли - значит в этот момент случилось соединение,
   при закрытии вкладки у нас обрывается соединение */

export default store
