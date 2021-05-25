const GET_CHANNEL_DATA_DB = 'GET_CHANNEL_DATA_DB'

const initialState = {
  channels: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_DATA_DB: {
      return {
        ...state,
        channels: action.channels
      }
    }
    default:
      return state
  }
}

export function getChannelsDataDb(channelsID) {
  console.log('channelsID', channelsID)
  return { type: GET_CHANNEL_DATA_DB, channels: channelsID }
}
