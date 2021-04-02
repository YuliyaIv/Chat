const NewObjChannel = function (channelName, channelAdmin, description, chatDataMessage) {
  this.channelName = channelName
  this.channelAdmin = channelAdmin
  this.description = description
  this.listUsersAccess = []
  this.chatDataMessage = [...chatDataMessage]

  this.metaDataChannel = {
    defaultAvatartChannel: 'lime',
    avatarChannel: null,
    timeCreateChannel: 'itd',
    timeDeleteChannel: 'itd'
  }
}

export default NewObjChannel
