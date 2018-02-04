import * as R from 'ramda'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  FETCH_PROJECTS_SUCCEEDED,
  FETCH_USERS_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED
} from '../actions'

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

export function projects(state = {}, action) {
  let newState
  switch (action.type) {
    case FETCH_PROJECTS_SUCCEEDED:
      newState = action.payload
      break
    case CREATE_PROJECT_SUCCEEDED:
      newState = Object.assign({}, state, action.payload)
      break
    case DELETE_PROJECT_SUCCEEDED:
      newState = R.dissoc(action.payload, state)
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
    default:
      newState = state
  }
  return newState
}

export default function rootReducer(state = {}, action) {
  return {
    user: auth(state.user, action),
    communities: communities(state.communities, action),
    projects: projects(state.projects, action),
    users: users(state.users, action),
    trades: {}
  }
}
