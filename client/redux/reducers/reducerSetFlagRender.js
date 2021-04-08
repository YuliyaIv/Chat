const SET_FLAG_SIDE_BAR = 'SET_FLAG_SIDE_BAR'
const SET_FLAG_MODAL_WINDOW = 'SET_FLAG_MODAL_WINDOW'
const SET_FLAG_SHELL_MODAL_WINDOW = 'SET_FLAG_SHELL_MODAL_WINDOW'
const SET_FLAG_RENDER_CONTEXT_MENU = 'SET_FLAG_RENDER_CONTEXT_MENU'
const initialState = {
  flagRenderSideBarView: '',
  flagRenderModalWindow: false,
  flagRenderShellModalWindow: false,
  flagRenderContextMenu: false
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
    case SET_FLAG_SHELL_MODAL_WINDOW: {
      return {
        ...state,
        flagRenderShellModalWindow: action.flagRenderShellModalWindow
      }
    }
    case SET_FLAG_RENDER_CONTEXT_MENU: {
      return {
        ...state,
        flagRenderContextMenu: action.flagRenderContextMenu
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

export function setFlagRenderShellModalWindow(flag) {
  return { type: SET_FLAG_SHELL_MODAL_WINDOW, flagRenderShellModalWindow: flag }
}

export function setFlagRenderContextMenu(flag) {
  return { type: SET_FLAG_RENDER_CONTEXT_MENU, flagRenderContextMenu: flag }
}
