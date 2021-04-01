const NewObjMessage = function (idMessage, idUserPostedMessage, textMessage) {
  this.idMessage = idMessage
  this.idUserPostedMessage = idUserPostedMessage
  this.textMessage = textMessage
  this.metaDataMessage = {
    timeCreateMessage: 'itd',
    timeDeleteMessage: 'itd'
  }
}

export default NewObjMessage
