const SET_FLAG_SIDE_BAR = 'SET_FLAG_SIDE_BAR'
const SET_FLAG_MODAL_WINDOW = 'SET_FLAG_MODAL_WINDOW'

const initialState = {
  flagRenderSideBarView: '',
  flagRenderModalWindow: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FLAG_SIDE_BAR: {
      return {
        ...state,
        flagRenderSideBarView: action.flagRenderSideBarView
      }
    }
    case SET_FLAG_MODAL_WINDOW: {
      return {
        ...state,
        flagRenderModalWindow: action.flagRenderModalWindow
      }
    }
    default:
      return state
  }
}

export function setFlagRenderSideBarView(flag) {
  return { type: SET_FLAG_SIDE_BAR, flagRenderSideBarView: flag }
}

export function setFlagRenderModalWindow(flag) {
  return { type: SET_FLAG_MODAL_WINDOW, flagRenderModalWindow: flag }
}
