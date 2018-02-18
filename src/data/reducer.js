import orm from './orm'

import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'

import { CHANGE_HUB } from './actions'

// TODO move out of 'authUser'
import {
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  AUTH_CHANGED
} from './authUser/actions'

export function selectedCommunityIdReducer(state = 0, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_HUB:
      return payload.communityId
    default:
      return state
  }
}

export const authenticatedUserIdReducer = (state = '', action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCEEDED:
      return payload.userId
    case LOGOUT_SUCCEEDED:
      return ''
    case AUTH_CHANGED:
      return payload ? payload.userId : ''
    default:
      return state
  }
}

export default combineReducers({
  db: createReducer(orm),
  authenticatedUserId: authenticatedUserIdReducer,
  selectedCommunityId: selectedCommunityIdReducer
})
