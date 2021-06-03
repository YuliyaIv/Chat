const NewObjChannel = function (channelName, channelAdmin, description) {
  this.channelName = channelName
  this.channelAdmin = channelAdmin
  this.description = description
  this.listUsersAccess = [channelAdmin]
  this.chatDataMessage = []

  this.metaDataChannel = {
    defaultAvatartChannel: 'lime',
    avatarChannel: null,
    timeDeleteChannel: 'itd'
  }
}

export default NewObjChannel
