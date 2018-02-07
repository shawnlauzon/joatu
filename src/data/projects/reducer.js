import * as R from 'ramda'

import {
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED
} from './actions'

import { ADD_PARTICIPANT_SUCCEEDED } from '../actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCEEDED:
      return action.payload
    case CREATE_PROJECT_SUCCEEDED:
      return Object.assign({}, state, action.payload)
    case DELETE_PROJECT_SUCCEEDED:
      return R.dissoc(action.payload, state)
    case ADD_PARTICIPANT_SUCCEEDED:
      const project = state[action.payload.projectId]
      if (!project.participants) {
        project.participants = {}
      }
      project.participants[action.payload.userId] = true
      return Object.assign({}, state, {
        [action.payload.projectId]: project
      })
    default:
      return state
  }
}

export default reducer
