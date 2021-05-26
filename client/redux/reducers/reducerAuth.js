import Cookies from 'universal-cookie'
import axios from 'axios'
import { history } from '..'
import { getChannelsDataDb } from './reducerDBDataChannel'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'

const cookies = new Cookies()
const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return {
        ...state,
        email: action.email
      }
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case LOGIN: {
      return {
        ...state,
        token: action.token,
        password: '',
        user: action.user
      }
    }
    default:
      return state
  }
}

export function updateLoginField(email) {
  return { type: UPDATE_LOGIN, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function signIn() {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().reducerAuth
      const { data } = await axios.post('/api/v2/auth', {
        data: {
          email,
          password
        }
      })
      dispatch({ type: LOGIN, token: data.token, user: data.user })
      dispatch(getChannelsDataDb(data.user.channelsAccess))
      history.push('/private')
    } catch (err) {
      console.error(new Error(err), 'setNewChannel not a send')
    }
  }
}

// revrite on axios
export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v2/auth')
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        dispatch(getChannelsDataDb(data.user.channelsAccess))
        history.push('/private')
      })
  }
}

// revrite on axios
export function tryGetUserInfo() {
  return () => {
    fetch('/api/v2/user-info')
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }
}
