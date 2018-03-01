import orm from './orm'

import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'

// TODO move out of 'authUser'
import {
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  AUTH_CHANGED
} from './authUser/actions'

export const authenticatedUserIdReducer = (state = '', action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCEEDED:
      return payload.userId || null
    case LOGOUT_SUCCEEDED:
      return ''
    case AUTH_CHANGED:
      return payload.userId || ''
    default:
      return state
  }
}

export default combineReducers({
  db: createReducer(orm),
  authenticatedUserId: authenticatedUserIdReducer
})
