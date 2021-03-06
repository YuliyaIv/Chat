import axios from 'axios'
import { createSelectorHook } from 'react-redux'

const GET_CHANNELS_DATA_DB = 'GET_CHANNELS_DATA_DB'
const GET_DATA_PARTICULAR_CHANNEL = 'GET_DATA_PARTICULAR_CHANNEL'
const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE'
const SET_NEW_CHANNEL = 'SET_NEW_CHANNEL'
const DELETE_CHANNEL_WITH_MESSAGES = 'DELETE_CHANNEL_WITH_MESSAGES'
const DELETE_MESSAGE = 'DELETE_MESSAGE'
const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
const CHANGE_CHANNEL_NAME_OR_DISCRIP = 'CHANGE_CHANNEL_NAME_OR_DISCRIP'

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
    case DELETE_CHANNEL_WITH_MESSAGES:
    case SET_NEW_CHANNEL: {
      return {
        ...state,
        particularChannelData: action.particularChannelData,
        particularChannelId: action.particularChannelId,
        channels: action.channels
      }
    }
    case CHANGE_CHANNEL_NAME_OR_DISCRIP:
    case CHANGE_MESSAGE:
    case DELETE_MESSAGE: {
      return {
        ...state,
        channels: action.channels,
        particularChannelData: action.particularChannelData
      }
    }

    default:
      return state
  }
}

export function getChannelsDataDb(channelsID) {
  return { type: GET_CHANNELS_DATA_DB, channels: channelsID }
}

export function setNewChannelDB({ newChannel, userId }) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const {
        data: { responseData: createdChannel }
      } = await axios.post('/api/v2/channel', {
        newChannel,
        userId
      })
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
  return async (dispatch, getState) => {
    try {
      const store = getState()

      const { data } = await axios.post('/api/v2/message', {
        textMessage,
        channelOvner: idChannel,
        idUserPostedMessage: idUser
      })

      const { updatedChannel } = data.data
      const beforeUpdateChannel = store.reducerDBDataChannel.channels
      const afterUpdateChannel = beforeUpdateChannel.map((channel) =>
        channel._id === updatedChannel._id ? updatedChannel : channel
      )
      dispatch({
        type: SET_NEW_MESSAGE,
        particularChannelData: updatedChannel,
        newMessage: data.data.newMessage,
        channels: afterUpdateChannel
      })
    } catch (err) {
      console.error(new Error(err), 'error: send new message')
    }
  }
}

export function deleteChannelDB(channelId) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const { channels } = store.reducerDBDataChannel

      await axios.delete(`/api/v2/channel/${channelId}`)
      const updateChannels = channels.filter((it) => it._id !== channelId)
      dispatch({
        type: DELETE_CHANNEL_WITH_MESSAGES,
        channels: updateChannels,
        particularChannelData: null,
        particularChannelId: null
      })
    } catch (err) {
      console.error(new Error(err), 'error: send new message')
    }
  }
}

export function deleteMessageDB(idChannel, idMessage) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const {
        data: { data: updateChannel }
      } = await axios.delete(`/api/v2/message/${idChannel}/${idMessage}`)

      const channelsList = store.reducerDBDataChannel.channels
      const updateChannelsList = channelsList.map((channel) =>
        channel._id === updateChannel._id ? updateChannel : channel
      )

      dispatch({
        type: DELETE_MESSAGE,
        particularChannelData: updateChannel,
        channels: updateChannelsList
      })
    } catch (err) {
      console.error(new Error(err), 'error: delete message')
    }
  }
}

export function changeMessageDB(textMessage, idMessage, channelId) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const { channels, particularChannelData, particularChannelId } = store.reducerDBDataChannel
      const {
        data: { data: updatedMessage }
      } = await axios.patch(`/api/v2/message/${channelId}/${idMessage}`, {
        textMessage
      })
      const updateArrayMessage = particularChannelData.chatDataMessage.map((message) =>
        message._id === updatedMessage._id ? updatedMessage : message
      )
      const updateChannel = { ...particularChannelData, chatDataMessage: updateArrayMessage }
      const updateChannels = channels.map((channel) =>
        channel._id === updateChannel._id ? updateChannel : channel
      )
      if (particularChannelId === channelId) {
        dispatch({
          type: CHANGE_MESSAGE,
          channels: updateChannels,
          particularChannelData: updateChannel
        })
      } else if (particularChannelId !== channelId) {
        dispatch({ type: CHANGE_MESSAGE, channels: updateChannels, particularChannelData })
      }
    } catch (err) {
      console.error(new Error(err), 'error: change message')
    }
  }
}

export function changeChannelNameOrDescriptionDB(idChannel, newData) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const { channels } = store.reducerDBDataChannel

      const {
        data: { responseData: updatedChannel }
      } = await axios.patch(`/api/v2/channel/${idChannel}`, newData)

      const updateChannels = channels.map((channel) =>
        channel._id === updatedChannel._id ? updatedChannel : channel
      )
      dispatch({
        type: CHANGE_CHANNEL_NAME_OR_DISCRIP,
        particularChannelData: updatedChannel,
        channels: updateChannels
      })
    } catch (err) {
      console.error(new Error(err), 'error: change channel name or descript')
    }
  }
}
