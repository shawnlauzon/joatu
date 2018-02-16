import { assoc, dissoc, assocPath, mergeDeepLeft } from 'ramda'

import {
  FETCH_CHATS_SUCCEEDED,
  CREATE_CHAT_SUCCEEDED,
  DELETE_CHAT_SUCCEEDED,
  FETCH_MESSAGES_SUCCEEDED,
  CREATE_MESSAGE_SUCCEEDED
} from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHATS_SUCCEEDED:
      return mergeDeepLeft(action.payload, state)
    case CREATE_CHAT_SUCCEEDED:
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_CHAT_SUCCEEDED:
      return dissoc(action.payload.id, state)
    case FETCH_MESSAGES_SUCCEEDED: {
      return assocPath(
        [action.payload.metadata.chatId, 'messages'],
        dissoc('metadata', action.payload),
        state
      )
    }
    case CREATE_MESSAGE_SUCCEEDED: {
      return assocPath(
        [action.payload.metadata.chatId, 'messages', action.payload.id],
        action.payload.data,
        state
      )
    }
    default:
      return state
  }
}

export default reducer
