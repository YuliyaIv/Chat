function NewObjUser({ name, password, confirmPassword, email }) {
  this.role = ['user']
  this.channelsAccess = []
  this.channelsOvner = []
  this.nameUser = name
  this.avatar = 'default'
  this.password = password
  this.passwordConfirm = confirmPassword
  this.email = email
}

export default NewObjUser
