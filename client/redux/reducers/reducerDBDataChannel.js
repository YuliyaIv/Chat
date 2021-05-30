import axios from 'axios'

const GET_CHANNELS_DATA_DB = 'GET_CHANNELS_DATA_DB'
const GET_DATA_PARTICULAR_CHANNEL = 'GET_DATA_PARTICULAR_CHANNEL'
const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE'

const initialState = {
  channels: null,
  particularChannelId: null,
  particularChannelData: null,
  newMessage: null
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
    case SET_NEW_MESSAGE: {
      return {
        ...state,
        particularChannelData: action.particularChannelData,
        newMessage: action.newMessage
      }
    }
    default:
      return state
  }
}

export function getChannelsDataDb(channelsID) {
  return { type: GET_CHANNELS_DATA_DB, channels: channelsID }
}

/// work not good, strange rerender and close shell modal window
// export function getParticularChannelDb(channelId) {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios({
//         method: 'get',
//         url: `/api/v2/channel/${channelId}`
//       })
//       dispatch({
//         type: GET_DATA_PARTICULAR_CHANNEL,
//         particularChannelData: data.data.dataName,
//         particularChannelId: channelId
//       })
//       console.log(data)
//     } catch (err) {
//       console.error(new Error(err), 'error send new message')
//     }
//   }
// }

export function getParticularChannelDb(channelId) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const dataParticularChannel = store.reducerDBDataChannel.channels.find(
        (channel) => channel._id === channelId
      )
      dispatch({
        type: GET_DATA_PARTICULAR_CHANNEL,
        particularChannelData: dataParticularChannel,
        particularChannelId: channelId
      })
    } catch (err) {
      console.error(new Error(err), 'error:  no channel ')
    }
  }
}

export function setNewMessageDB(textMessage, idChannel, idUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/v2/message', {
        textMessage,
        channelOvner: idChannel,
        idUserPostedMessage: idUser
      })
      console.log('data.updatedChannel', data)

      dispatch({
        type: SET_NEW_MESSAGE,
        particularChannelData: data.data.updatedChannel,
        newMessage: data.data.newMessage
      })
    } catch (err) {
      console.error(new Error(err), 'error: send new message')
    }
  }
}
