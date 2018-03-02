import crudReducer from '../crudReducer'

import {
  FETCH_DISCUSSIONS_SUCCEEDED,
  CREATE_DISCUSSION_SUCCEEDED,
  UPDATE_DISCUSSION_SUCCEEDED,
  DELETE_DISCUSSION_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_DISCUSSIONS_SUCCEEDED,
  createActionType: CREATE_DISCUSSION_SUCCEEDED,
  updateActionType: UPDATE_DISCUSSION_SUCCEEDED,
  removeActionType: DELETE_DISCUSSION_SUCCEEDED
})

export default reducer
