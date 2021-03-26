import axios from 'axios'

const REDUCER_DATA_CHANNELS = 'REDUCER_DATA_CHANNELS'
const REDUSER_DATA_PARTICULAR_CHANNEL = 'REDUSER_DATA_PARTICULAR_CHANNEL'
const initialState = {
  dataChannels: {},
  dataParticularChannel: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_DATA_CHANNELS: {
      return {
        ...state,
        dataChannels: action.dataChannels
      }
    }
    case REDUSER_DATA_PARTICULAR_CHANNEL: {
      return {
        ...state,
        dataParticularChannel: action.dataParticularChannel
      }
    }
    default:
      return state
  }
}

export function getDataChannels() {
  return async (dispatch) => {
    try {
      const { data } = await axios('/api/v1/channelsData')
      dispatch({ type: REDUCER_DATA_CHANNELS, dataChannels: data })
    } catch (err) {
      console.error(new Error(err), 'error dataChannels')
    }
  }
}

export function getDataParticularChannel(idChannel) {
  return (dispatch, getState) => {
    const store = getState()
    const dataParticularChannel = store.reducerDataChannels.dataChannels[idChannel]

    dispatch({
      type: REDUSER_DATA_PARTICULAR_CHANNEL,
      dataParticularChannel
    })
  }
}
