import * as R from 'ramda'
import crudReducer from '../crudReducer'

import {
  FETCH_COMMENTS_SUCCEEDED,
  CREATE_COMMENT_SUCCEEDED,
  UPDATE_COMMENT_SUCCEEDED,
  REMOVE_COMMENT_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_COMMENTS_SUCCEEDED,
  createActionType: CREATE_COMMENT_SUCCEEDED,
  updateActionType: UPDATE_COMMENT_SUCCEEDED,
  removeActionType: REMOVE_COMMENT_SUCCEEDED,
  payloadProp: R.prop('list')
})

export default reducer
