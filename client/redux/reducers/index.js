import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import reducerDataCard from './reducerDataCard'
import reducerDataChannels from './reducerDataChannels'
import reducerSetFlagRenderSideBarView from './reducerSetFlagRenderSideBarView'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    reducerDataCard,
    reducerSetFlagRenderSideBarView,
    reducerDataChannels
  })

export default createRootReducer
