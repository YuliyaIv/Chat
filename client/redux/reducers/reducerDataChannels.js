import axios from 'axios'

const REDUCER_DATA_CHANNELS = 'REDUCER_DATA_CHANNELS'

const initialState = {
  dataChannels: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_DATA_CHANNELS: {
      return {
        ...state,
        dataChannels: action.dataChannels
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
