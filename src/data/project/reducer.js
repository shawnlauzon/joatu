import { evolve, keys } from 'ramda'
import crudReducer from '../crudReducer'

import {
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  UPDATE_PROJECT_SUCCEEDED,
  DELETE_PROJECT_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_PROJECTS_SUCCEEDED,
  createActionType: CREATE_PROJECT_SUCCEEDED,
  updateActionType: UPDATE_PROJECT_SUCCEEDED,
  removeActionType: DELETE_PROJECT_SUCCEEDED,
  createEntity: Project => (data, id) => {
    // TODO Move to API
    const transformations = {
      participants: keys
    }
    const project = evolve(transformations, data)

    Project.create({ id, ...project })
  }
})

export default reducer
