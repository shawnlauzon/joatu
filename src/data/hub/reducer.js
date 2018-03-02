import crudReducer from '../crudReducer'

import {
  FETCH_HUBS_SUCCEEDED,
  CREATE_HUB_SUCCEEDED,
  UPDATE_HUB_SUCCEEDED,
  REMOVE_HUB_SUCCEEDED
} from './actions'

const hubReducer = crudReducer({
  fetchActionType: FETCH_HUBS_SUCCEEDED,
  createActionType: CREATE_HUB_SUCCEEDED,
  updateActionType: UPDATE_HUB_SUCCEEDED,
  removeActionType: REMOVE_HUB_SUCCEEDED
})

export default hubReducer
