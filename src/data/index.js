import * as R from 'ramda'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  FETCH_PROJECTS_SUCCEEDED,
  FETCH_USERS_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions'

export default function projects(
  state = {
    user: {
      authenticated: false
    },
    communities: {},
    projects: {},
    trades: {},
    users: {}
  },
  action
) {
  let newState
  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCEEDED:
      newState = {
        ...state,
        communities: action.payload
      }
      break
    case FETCH_PROJECTS_SUCCEEDED:
      newState = {
        ...state,
        projects: action.payload
      }
      break
    case FETCH_USERS_SUCCEEDED:
      newState = {
        ...state,
        users: action.payload
      }
      break
    case CREATE_USER_SUCCEEDED:
      newState = {
        ...state,
        users: Object.assign({}, state.users, action.payload)
      }
      break
    case CREATE_PROJECT_SUCCEEDED:
      newState = {
        ...state,
        projects: Object.assign({}, state.projects, action.payload)
      }
      break
    case DELETE_PROJECT_SUCCEEDED:
      newState = {
        ...state,
        projects: R.dissoc(action.payload, state.projects)
      }
      break
    case LOGIN_USER:
      newState = {
        ...state,
        user: Object.assign({ authenticated: true }, action.payload)
      }
      break
    case LOGOUT_USER:
      newState = {
        ...state,
        user: {
          authenticated: false
        }
      }
      break
    default:
      newState = state
  }

  return newState
}
