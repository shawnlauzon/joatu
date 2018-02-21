import * as R from 'ramda'
import entityReducer from '../entityReducer'

import {
  FETCH_CHATS_SUCCEEDED,
  CREATE_CHAT_SUCCEEDED,
  UPDATE_CHAT_SUCCEEDED,
  DELETE_CHAT_SUCCEEDED
} from './actions'

const reducer = entityReducer({
  fetchActionType: FETCH_CHATS_SUCCEEDED,
  createActionType: CREATE_CHAT_SUCCEEDED,
  updateActionType: UPDATE_CHAT_SUCCEEDED,
  removeActionType: DELETE_CHAT_SUCCEEDED,
  createEntity: Chat => (data, id) => {
    // TODO Move to API
    const transformations = {
      participants: R.keys
    }
    const chat = R.evolve(transformations, data)

    Chat.create({ id, ...chat })
  }
})

export default reducer
