import * as R from 'ramda'

import {
  FETCH_USERS_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED
} from './actions'

import { ADD_PARTICIPANT_SUCCEEDED } from '../actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED:
      return action.payload
    case CREATE_USER_SUCCEEDED:
      return Object.assign({}, state, action.payload)
    case DELETE_USER_SUCCEEDED:
      return R.dissoc(action.payload, state)
    case ADD_PARTICIPANT_SUCCEEDED:
      const user = state[action.payload.userId]
      if (!user.projects) {
        user.projects = {}
      }
      user.projects[action.payload.projectId] = true
      return Object.assign({}, state, { [action.payload.userId]: user })
    default:
      return state
  }
}

export default reducer
