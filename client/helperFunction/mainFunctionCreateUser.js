function NewObjUser({ login, name, password, confirmPassword, email }) {
  this.role = ['user']
  this.channelsAccess = []
  this.channelsOvner = []
  this.nameUser = name
  this.avatar = 'default'
  this.password = password
  this.passwordConfirm = confirmPassword
  this.email = email
  this.login = login
}

export default NewObjUser
