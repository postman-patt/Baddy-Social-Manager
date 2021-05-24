import { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

//Initial State
const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  sessions: [],
  error: null,
  loading: false,
  activeItem: '',
  show: false,
  page: '',
  pages: [],
  activeEditItem: '',
  showEdit: false,
}

//Create Context
export const GlobalContext = createContext(initialState)

//Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  //Actions

  async function getSessions(token, pageNumber = '') {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.get(
        `/api/sessions?pageNumber=${pageNumber}`,
        config
      )
      dispatch({
        type: 'GET_SESSIONS',
        payload: res.data.data,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  async function getUserSessions(token, pageNumber = '') {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.get(
        `/api/sessions/usersessions?pageNumber=${pageNumber}`,
        config
      )
      dispatch({
        type: 'GET_SESSIONS',
        payload: res.data.data,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  async function deleteSession(id, token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.delete(`/api/sessions/${id}`, config)
      dispatch({
        type: 'DELETE_SESSION',
        payload: id,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  async function addSession(session, token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await axios.post('/api/sessions', session, config)
      dispatch({
        type: 'ADD_SESSION',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  async function editSession(id, sessionUpdates, token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await axios.put(
        `/api/sessions/edit/${id}`,
        sessionUpdates,
        config
      )
      dispatch({
        type: 'EDIT_SESSION',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  //Show Session modals

  async function handleShowSession(session) {
    dispatch({
      type: 'HANDLE_SHOW_SESSION',
      payload: session,
    })
  }

  async function handleCloseSession() {
    dispatch({
      type: 'HANDLE_CLOSE_SESSION',
    })
  }

  async function handleShowEditSession(session) {
    dispatch({
      type: 'HANDLE_SHOW_EDIT_SESSION',
      payload: session,
    })
  }

  async function handleCloseEditSession() {
    dispatch({
      type: 'HANDLE_CLOSE_EDIT_SESSION',
    })
  }

  //Add/Remove Player
  async function addPlayer(id, player, token) {
    try {
      const newPlayer = { player: player }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post(`/api/sessions/${id}`, newPlayer, config)
      dispatch({
        type: 'ADD_PLAYER',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        error: 'something went wrong',
      })
    }
  }

  async function removePlayer(id, playerid, token) {
    try {
      const newPlayer = { playerid: playerid }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      console.log(newPlayer)
      const res = await axios.put(`/api/sessions/${id}`, newPlayer, config)
      dispatch({
        type: 'REMOVE_PLAYER',
        payload: res.data.data,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'GET_ERROR',
        error: 'something went wrong',
      })
    }
  }

  //User Actions

  async function login(email, password) {
    try {
      dispatch({ type: 'USER_LOGIN_REQUEST' })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      console.log('failed')
      dispatch({
        type: 'USER_LOGIN_FAILURE',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  async function logout() {
    localStorage.removeItem('userInfo')

    dispatch({
      type: 'USER_LOGOUT',
    })
  }

  async function registerUser(newUser) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/users', newUser, config)

      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.message,
      })
    }
  }

  async function updateUser(updatedUser, token) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.put(
        '/api/users/profile',
        updatedUser,
        config
      )

      dispatch({
        type: 'UPDATE_USER_PROFILE_SUCCESS',
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        payload: err.response.data.message,
      })
    }
  }

  //Mark session as paid
  async function markPaid(id, playerSessionId, token) {
    try {
      const changePaidStatus = { playerSessionId: playerSessionId }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.put(
        `/api/sessions/edit/paid/${id}`,
        changePaidStatus,
        config
      )
      dispatch({
        type: 'CHANGE_PAID_STATUS',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERROR',
        error: 'something went wrong',
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        sessions: state.sessions,
        deleteSession,
        addSession,
        getSessions,
        getUserSessions,
        editSession,
        login,
        logout,
        handleShowSession,
        handleCloseSession,
        handleShowEditSession,
        handleCloseEditSession,
        addPlayer,
        removePlayer,
        registerUser,
        updateUser,
        markPaid,
        error: state.error,
        loading: state.loading,
        userInfo: state.userInfo,
        activeItem: state.activeItem,
        show: state.show,
        page: state.page,
        pages: state.pages,
        activeEditItem: state.activeEditItem,
        showEdit: state.showEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
