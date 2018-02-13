import { assoc, assocPath, dissoc } from 'ramda'

import {
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED
} from './actions'

import { ADD_PARTICIPANT_SUCCEEDED } from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCEEDED:
      return action.payload
    case CREATE_PROJECT_SUCCEEDED:
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_PROJECT_SUCCEEDED:
      return dissoc(action.payload.id, state)
    case ADD_PARTICIPANT_SUCCEEDED:
      return assocPath(
        [action.payload.projectId, 'participants', action.payload.userId],
        true,
        state
      )
    default:
      return state
  }
}

export default reducer
