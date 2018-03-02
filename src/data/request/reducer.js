import crudReducer from '../crudReducer'

import {
  FETCH_REQUESTS_SUCCEEDED,
  CREATE_REQUEST_SUCCEEDED,
  UPDATE_REQUEST_SUCCEEDED,
  REMOVE_REQUEST_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_REQUESTS_SUCCEEDED,
  createActionType: CREATE_REQUEST_SUCCEEDED,
  updateActionType: UPDATE_REQUEST_SUCCEEDED,
  removeActionType: REMOVE_REQUEST_SUCCEEDED
})

export default reducer
