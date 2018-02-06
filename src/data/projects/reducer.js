import * as R from 'ramda'

import {
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED
} from './actions'

function projects(state = {}, action) {
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
    // TODO
    // case ADD_PARTICIPANT_SUCCEEDED:
    //   const project = state[action.payload.projectId]
    //   if (!project.participants) {
    //     project.participants = {}
    //   }
    //   project.participants[action.payload.userId] = true
    //   newState = Object.assign({}, state, {
    //     [action.payload.projectId]: project
    //   })
    //   break
    default:
      newState = state
  }
  return newState
}

export default projects
