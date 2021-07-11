import Cookies from 'universal-cookie'
import axios from 'axios'
import { history } from '..'
import { getChannelsDataDb } from './reducerDBDataChannel'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const LOGGING_RESULT = 'LOGGING_STATUS'

const cookies = new Cookies()
const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  loggingResult: null
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
    case LOGGING_RESULT: {
      return {
        ...state,
        loggingStatus: action.loggingStatus
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

// old function
// export function signIn() {
//   return async (dispatch, getState) => {
//     try {
//       const { email, password } = getState().reducerAuth
//       const { data } = await axios.post('/api/v2/auth', {
//         data: {
//           email,
//           password
//         }
//       })

//       dispatch({ type: LOGIN, token: data.token, user: data.user })
//       dispatch(getChannelsDataDb(data.user.channelsAccess))
//       history.push('/private')
//     } catch (err) {
//       console.error(new Error(err), 'setNewChannel not a send')
//     }
//   }
// }

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

export function signIn({ email, password }) {
  console.log('signIn redux', email, password)
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/v2/auth', {
        data: {
          email,
          password
        }
      })
      console.log('data signIn', data)
      console.log('email, password signIn', email, password)
      console.log(data.status)
      if (data.status !== 'error auth') {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        dispatch(getChannelsDataDb(data.user.channelsAccess))
        history.push('/private')
      } else if (data.status === 'error auth') {
        console.log('signIn redux data.status === "error auth"', data)
        dispatch({
          type: LOGGING_RESULT,
          loggingResult: 'login not possible, invalid password or email'
        })
      }
    } catch (err) {
      console.error(new Error(err), 'setNewChannel not a send')
    }
  }
}
