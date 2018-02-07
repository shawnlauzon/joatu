import { LOGIN_SUCCEEDED, LOGOUT_SUCCEEDED, AUTH_CHANGED } from './actions'

const reducer = (state = { authenticated: false }, action) => {
  let newState
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      newState = Object.assign({ authenticated: true }, action.payload)
      break
    case LOGOUT_SUCCEEDED:
      newState = { authenticated: false }
      break
    case AUTH_CHANGED:
      if (action.payload.id) {
        newState = Object.assign({ authenticated: true }, action.payload)
      } else {
        newState = { authenticated: false }
      }
      break
    default:
      newState = state
  }
  return newState
}

export default reducer
