import entityReducer from '../entityReducer'

import {
  FETCH_REQUESTS_SUCCEEDED,
  CREATE_REQUEST_SUCCEEDED,
  UPDATE_REQUEST_SUCCEEDED,
  DELETE_REQUEST_SUCCEEDED
} from './actions'

const reducer = entityReducer({
  fetchActionType: FETCH_REQUESTS_SUCCEEDED,
  createActionType: CREATE_REQUEST_SUCCEEDED,
  updateActionType: UPDATE_REQUEST_SUCCEEDED,
  removeActionType: DELETE_REQUEST_SUCCEEDED
})

export default reducer
