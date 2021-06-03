const NewObjMessage = function (idUserPostedMessage, textMessage, channelOvner = 'new channel') {
  this.idUserPostedMessage = idUserPostedMessage
  this.textMessage = textMessage
  this.channelOvner = channelOvner
}

export default NewObjMessage
