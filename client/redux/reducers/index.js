import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import reducerDataCard from './reducerDataCard'
import reducerDataChannels from './reducerDataChannels'
import reducerSetFlagRender from './reducerSetFlagRender'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    reducerDataCard,
    reducerSetFlagRender,
    reducerDataChannels
  })

export default createRootReducer
