import { compose, dissoc } from 'ramda'
import entityReducer from '../entityReducer'

import {
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  UPDATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED
} from './actions'

// import { ADD_PARTICIPANT_SUCCEEDED } from './actions'

const reducer = entityReducer({
  fetchActionType: FETCH_PROJECTS_SUCCEEDED,
  createActionType: CREATE_PROJECT_SUCCEEDED,
  updateActionType: UPDATE_PROJECT_SUCCEEDED,
  removeActionType: DELETE_PROJECT_SUCCEEDED,
  createEntity: Project => (data, id) => {
    // FIXME
    const stripped = compose(dissoc('participants'))(data)
    console.log('Creating Project ' + id, stripped)
    Project.create({ id, ...stripped })
  }
})

// case ADD_PARTICIPANT_SUCCEEDEDActionType:
// return assocPath(
//   [action.payload.projectId, 'participants', action.payload.userId],
//   true,
//   state
// )

export default reducer
