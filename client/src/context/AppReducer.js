const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_SESSIONS':
      return {
        ...state,
        loading: false,
        sessions: action.payload.sessions,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case 'DELETE_SESSION':
      return {
        ...state,
        loading: true,
        sessions: state.sessions.filter(
          (session) => session._id !== action.payload
        ),
      }
    case 'EDIT_SESSION':
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session._id === action.payload._id ? action.payload : session
        ),
        activeItem: action.payload,
      }
    case 'ADD_SESSION':
      return {
        ...state,
        loading: true,
        sessions: [...state.sessions, action.payload],
      }

    case 'GET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'USER_LOGIN_REQUEST':
      return { loading: true }
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      }
    case 'USER_LOGIN_FAILURE':
      return { loading: false, error: action.payload }
    case 'USER_LOGOUT':
      return {}

    case 'HANDLE_SHOW_SESSION':
      return { ...state, activeItem: action.payload, show: true }
    case 'HANDLE_CLOSE_SESSION':
      return { ...state, show: false }
    case 'HANDLE_SHOW_EDIT_SESSION':
      return { ...state, activeEditItem: action.payload, showEdit: true }
    case 'HANDLE_CLOSE_EDIT_SESSION':
      return { ...state, showEdit: false }

    case 'ADD_PLAYER':
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session._id === action.payload._id
            ? { ...session, players: action.payload.players }
            : session
        ),
        activeItem: { ...state.activeItem, players: action.payload.players },
      }
    case 'REMOVE_PLAYER':
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session._id === action.payload._id
            ? { ...session, players: action.payload.players }
            : session
        ),
        activeItem: { ...state.activeItem, players: action.payload.players },
      }
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        loading: true,
        userInfo: action.payload,
      }

    case 'CHANGE_PAID_STATUS':
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session._id === action.payload._id
            ? { ...session, players: action.payload.players }
            : session
        ),
        activeItem: { ...state.activeItem, players: action.payload.players },
      }
    default:
      return state
  }
}

export default AppReducer
