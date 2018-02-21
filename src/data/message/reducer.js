import { prop } from 'ramda'
import entityReducer from '../entityReducer'

import {
  FETCH_MESSAGES_SUCCEEDED,
  CREATE_MESSAGE_SUCCEEDED,
  UPDATE_MESSAGE_SUCCEEDED,
  DELETE_MESSAGE_SUCCEEDED
} from './actions'

const reducer = entityReducer({
  fetchActionType: FETCH_MESSAGES_SUCCEEDED,
  createActionType: CREATE_MESSAGE_SUCCEEDED,
  updateActionType: UPDATE_MESSAGE_SUCCEEDED,
  removeActionType: DELETE_MESSAGE_SUCCEEDED,
  payloadProp: prop('list')
})

export default reducer
