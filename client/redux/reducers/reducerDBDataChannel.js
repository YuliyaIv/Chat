import axios from 'axios'

const GET_CHANNELS_DATA_DB = 'GET_CHANNELS_DATA_DB'
const GET_DATA_PARTICULAR_CHANNEL = 'GET_DATA_PARTICULAR_CHANNEL'
const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE'
const SET_NEW_CHANNEL = 'SET_NEW_CHANNEL'

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
        newMessage: action.newMessage,
        channels: action.channels
      }
    }
    case SET_NEW_CHANNEL: {
      return {
        ...state,
        particularChannelData: action.particularChannelData,
        particularChannelId: action.particularChannelId,
        channels: action.channels
      }
    }

    default:
      return state
  }
}

export function getChannelsDataDb(channelsID) {
  return { type: GET_CHANNELS_DATA_DB, channels: channelsID }
}

export function setNewChannelDB(newChannel) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const { data } = await axios.post('/api/v2/channel', {
        newChannel
      })
      const createdChannel = data.data.dataName
      const oldChannels = store.reducerDBDataChannel.channels
      dispatch({
        type: SET_NEW_CHANNEL,
        particularChannelData: createdChannel,
        particularChannelId: createdChannel.id,
        channels: [...oldChannels, createdChannel]
      })
    } catch (err) {
      console.error(new Error(err), 'error: create channel')
    }
  }
}

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

      dispatch({
        type: SET_NEW_MESSAGE,
        particularChannelData: data.data.updatedChannel,
        newMessage: data.data.newMessage,
        channels: data.data.channels
      })
    } catch (err) {
      console.error(new Error(err), 'error: send new message')
    }
  }
}
