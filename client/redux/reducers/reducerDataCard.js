import axios from 'axios'

const REDUCER_DATA_CARD = 'REDUCER_DATA_CARD'

const initialState = {
  cardOfUsers: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_DATA_CARD: {
      return {
        ...state,
        cardOfUsers: action.cardOfUsers
      }
    }
    default:
      return state
  }
}

export function getDataCard() {
  return async (dispatch) => {
    try {
      const { data } = await axios('/api/v1/usersData')
      dispatch({ type: REDUCER_DATA_CARD, cardOfUsers: data })
    } catch (err) {
      console.error(new Error(err), 'my error reducerDataCard')
    }
  }
}
