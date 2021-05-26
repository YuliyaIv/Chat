import axios from 'axios'

const GET_CHANNELS_DATA_DB = 'GET_CHANNELS_DATA_DB'
const GET_DATA_PARTICULAR_CHANNEL = 'GET_DATA_PARTICULAR_CHANNEL'

const initialState = {
  channels: null,
  particularChannelId: null,
  particularChannelData: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS_DATA_DB: {
      return {
        ...state,
        channels: action.channels
      }
    }
    case GET_DATA_PARTICULAR_CHANNEL: {
      return {
        ...state,
        particularChannelData: action.particularChannelData,
        particularChannelId: action.particularChannelId
      }
    }
    default:
      return state
  }
}

export function getChannelsDataDb(channelsID) {
  return { type: GET_CHANNELS_DATA_DB, channels: channelsID }
}

export function getParticularChannelDb(channelId) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/api/v2/channel/${channelId}`
      })
      dispatch({
        type: GET_DATA_PARTICULAR_CHANNEL,
        particularChannelData: data.data.dataName,
        particularChannelId: channelId
      })
      console.log(data)
    } catch (err) {
      console.error(new Error(err), 'error send new message')
    }
  }
}

// export function getDataParticularChannel(idChannel) {
//   return (dispatch, getState) => {
//     const store = getState()
//     const dataParticularChannel = store.reducerDataChannels.dataChannels[idChannel]

//     dispatch({
//       type: REDUSER_DATA_PARTICULAR_CHANNEL,
//       dataParticularChannel,
//       dataParticularId: idChannel
//     })
//   }
// }
