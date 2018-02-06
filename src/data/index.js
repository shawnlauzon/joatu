import { reducer as projectReducer } from './projects'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  FETCH_USERS_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  AUTH_CHANGED,
  ADD_PARTICIPANT_SUCCEEDED
} from '../actions'

// TODO Separate 'entities' from app data (e.g. the user)
// See normalizr

export function communities(state = {}, action) {
  let newState
  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCEEDED:
      newState = action.payload
      break
    default:
      newState = state
  }
  return newState
}

export function users(state = {}, action) {
  let newState
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED:
      newState = action.payload
      break
    case CREATE_USER_SUCCEEDED:
      newState = Object.assign({}, state, action.payload)
      break
    case ADD_PARTICIPANT_SUCCEEDED:
      const user = state[action.payload.userId]
      if (!user.projects) {
        user.projects = {}
      }
      user.projects[action.payload.projectId] = true
      newState = Object.assign({}, state, { [action.payload.userId]: user })
      break
    default:
      newState = state
  }
  return newState
}

export function auth(state = { authenticated: false }, action) {
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

// TODO use combineReducers here
export default function rootReducer(state = {}, action) {
  return {
    user: auth(state.user, action),
    communities: communities(state.communities, action),
    projects: projectReducer(state.projects, action),
    users: users(state.users, action),
    trades: {}
  }
}
