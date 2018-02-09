import { LOGIN_SUCCEEDED, LOGOUT_SUCCEEDED, AUTH_CHANGED } from './actions'

const reducer = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return Object.assign({ authenticated: true }, action.payload)
    case LOGOUT_SUCCEEDED:
      return { authenticated: false }
    case AUTH_CHANGED:
      if (action.payload.id) {
        return Object.assign({ authenticated: true }, action.payload)
      } else {
        return { authenticated: false }
      }
    default:
      return state
  }
}

export default reducer
