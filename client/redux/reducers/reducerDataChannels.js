import axios from 'axios'

const REDUCER_DATA_CHANNELS = 'REDUCER_DATA_CHANNELS'
const REDUSER_DATA_PARTICULAR_CHANNEL = 'REDUSER_DATA_PARTICULAR_CHANNEL'
const NEW_MESSAGE = 'NEW_MESSAGE'
const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'
const DELETED_CHANNEL = 'DELETED_CHANNEL'
const DELETED_MESSAGE = 'DELETED_MESSAGE'
const CHANGE_CHANNEL_NAME = 'CHANGE_CHANNEL_NAME'

const initialState = {
  dataChannels: {},
  dataParticularChannel: null,
  dataParticularId: 0,
  newMessage: {},
  objectFromNewChannel: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REDUSER_DATA_PARTICULAR_CHANNEL: {
      return {
        ...state,
        dataParticularChannel: action.dataParticularChannel,
        dataParticularId: action.dataParticularId
      }
    }
    case NEW_MESSAGE: {
      return {
        ...state,
        newMessage: action.data
      }
    }
    case ADD_NEW_CHANNEL: {
      return {
        ...state,
        objectFromNewChannel: action.objectFromNewChannel,
        dataChannels: action.updateChannels
      }
    }
    case DELETED_CHANNEL: {
      return {
        ...state,
        dataChannels: action.dataChannels
      }
    }
    case DELETED_MESSAGE: {
      return {
        ...state,
        dataChannels: action.dataChannels
      }
    }
    case REDUCER_DATA_CHANNELS: {
      return {
        ...state,
        dataChannels: action.dataChannels
      }
    }
    case CHANGE_CHANNEL_NAME: {
      return {
        ...state,
        dataChannels: action.dataChannels,
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
      dataParticularChannel,
      dataParticularId: idChannel
    })
  }
}

export function setNewMessage(textMessage) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const { dataParticularId } = store.reducerDataChannels
      const arrayMessages = store.reducerDataChannels.dataChannels[dataParticularId].chatDataMessage
      const idLastMessage = arrayMessages[arrayMessages.length - 1].idMessage

      const { data } = await axios({
        method: 'patch',
        url: `/api/v1/channelsData/${dataParticularId}/chatDataMessage/${idLastMessage}`,
        data: {
          idMessage: +idLastMessage + 1,
          idUserPostedMessage: 'idUser11111',
          textMessage,
          metaDataMessage: {
            timeCreateMessage: 'itd',
            timeDeleteMessage: 'itd'
          }
        }
      })
      dispatch({ type: NEW_MESSAGE, data: data.newMessage })
    } catch (err) {
      console.error(new Error(err), 'error send new message')
    }
  }
}

export function setNewChannelActionCreator(objectFromNewChannel) {
  return async (dispatch) => {
    try {
      const { data: updateChannels } = await axios({
        method: 'patch',
        url: '/api/v1/channelsData',
        data: {
          objectFromNewChannel
        }
      })
      dispatch({ type: ADD_NEW_CHANNEL, updateChannels, objectFromNewChannel })
    } catch (err) {
      console.error(new Error(err), 'setNewChannel not a send')
    }
  }
}

export function deleteChannel(id) {
  return async (dispatch) => {
    try {
      const {
        data: { objectOfChannels }
      } = await axios({
        method: 'delete',
        url: `/api/v1/channelsData/${id}`
      })
      dispatch({ type: DELETED_CHANNEL, dataChannels: objectOfChannels })
    } catch (err) {
      console.error(new Error(`DELETE request by /api/v1/channelsData/${id} faild`))
    }
  }
}

export function deleteMessage(idChannel, idMessage) {
  return async (dispatch) => {
    try {
      const {
        data: { objectOfChannels }
      } = await axios({
        method: 'delete',
        url: `/api/v1/channelsData/${idChannel}/chatDataMessage/${idMessage}`
      })
      dispatch({ type: DELETED_MESSAGE, dataChannels: objectOfChannels })
    } catch (err) {
      console.error(
        new Error(
          `DELETE request by /api/v1/channelsData/${idChannel}/chatDataMessage/${idMessage} faild`
        )
      )
    }
  }
}

export function changeNameChannelActionCreator(id, newNameChannel) {
  return async (dispatch, getState) => {
    try {
      const store = getState()
      const oldParticularChannel = store.reducerDataChannels.dataParticularChannel
      const updatePartucilarChannel = { ...oldParticularChannel, channelName: newNameChannel }

      const {
        data: { objectOfChannels }
      } = await axios({
        method: 'patch',
        url: `/api/v1/channelsData/${id}/nameChannel`,
        data: updatePartucilarChannel
      })

      dispatch({
        type: CHANGE_CHANNEL_NAME,
        dataParticularChannel: updatePartucilarChannel,
        dataChannels: objectOfChannels
      })
    } catch (err) {
      console.error(new Error(err), 'error send new message')
    }
  }
}
