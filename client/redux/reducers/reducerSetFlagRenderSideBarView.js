const SET_FLAG_SIDE_BAR = 'SET_FLAG_SIDE_BAR'

const initialState = {
  flag: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FLAG_SIDE_BAR: {
      return {
        ...state,
        flag: action.flag
      }
    }
    default:
      return state
  }
}

export function setFlagRenderSideBarView(flag) {
  return { type: SET_FLAG_SIDE_BAR, flag }
}
