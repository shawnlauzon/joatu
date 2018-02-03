import * as R from 'ramda'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  FETCH_PROJECTS_SUCCEEDED,
  FETCH_USERS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED
} from '../actions'

export default function projects(
  state = {
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
    default:
      newState = state
  }

  return newState
}
