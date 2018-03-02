import crudReducer from '../crudReducer'

import {
  FETCH_DISCUSSIONS_SUCCEEDED,
  CREATE_DISCUSSION_SUCCEEDED,
  UPDATE_DISCUSSION_SUCCEEDED,
  REMOVE_DISCUSSION_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_DISCUSSIONS_SUCCEEDED,
  createActionType: CREATE_DISCUSSION_SUCCEEDED,
  updateActionType: UPDATE_DISCUSSION_SUCCEEDED,
  removeActionType: REMOVE_DISCUSSION_SUCCEEDED
})

export default reducer
