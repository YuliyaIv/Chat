import axios from 'axios'

const REDUCER_DATA_CARD = 'REDUCER_DATA_CARD'
const USER_ACTIVITY_STATUS = 'USER_ACTIVITY_STATUS'

const initialState = {
  cardOfUsers: {}
  // userActivityStatus: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_DATA_CARD: {
      return {
        ...state,
        cardOfUsers: action.cardOfUsers
      }
    }
    // case USER_ACTIVITY_STATUS: {
    //   return {
    //     ...state,
    //     userActivityStatus: action.userActivityStatus
    //   }
    // }
    default:
      return state
  }
}

export function getDataCard() {
  return async (dispatch) => {
    try {
      const { data } = await axios('/api/v2/user')
      dispatch({ type: REDUCER_DATA_CARD, cardOfUsers: data.updatedResult })
    } catch (err) {
      console.error(new Error(err), 'my error reducerDataCard')
    }
  }
}

// export function getUserActivityStatus(idOfUser) {
//   return (dispatch, getState) => {
//     const state = getState()
//     const { cardOfUsers } = state.reducerDataCard
//     const userActivityStatus = cardOfUsers[idOfUser].userMetaDate.status
//     dispatch({ type: USER_ACTIVITY_STATUS, userActivityStatus })
//   }
// }
