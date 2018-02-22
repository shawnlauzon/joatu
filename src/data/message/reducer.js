import { prop } from 'ramda'
import crudReducer from '../crudReducer'

import {
  FETCH_MESSAGES_SUCCEEDED,
  // CREATE_MESSAGE_SUCCEEDED,
  UPDATE_MESSAGE_SUCCEEDED,
  DELETE_MESSAGE_SUCCEEDED
} from './actions'

import { MESSAGE_RECEIVED } from '../chat/actions'

const reducer = crudReducer({
  fetchActionType: FETCH_MESSAGES_SUCCEEDED,
  createActionType: MESSAGE_RECEIVED, // TODO Create in the Redux store before the snapshot
  updateActionType: UPDATE_MESSAGE_SUCCEEDED,
  removeActionType: DELETE_MESSAGE_SUCCEEDED,
  payloadProp: prop('list'),
  createEntity: Message => (data, id) => Message.upsert({ id, ...data })
})

export default reducer
