import { assoc, dissoc, assocPath, mergeDeepLeft, append } from 'ramda'

import {
  FETCH_CHATS_SUCCEEDED,
  CREATE_CHAT_SUCCEEDED,
  DELETE_CHAT_SUCCEEDED,
  FETCH_MESSAGES_SUCCEEDED,
  CREATE_MESSAGE_SUCCEEDED
} from './actions'

// chats:
// {
//   chatId: {
//     participants: [ id, id ]
//     messages: [
//       { id, from, text, sentAt }
//     ]
//   }, ...
// }
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
        action.payload.data,
        state
      )
    }
    case CREATE_MESSAGE_SUCCEEDED: {
      const messages = state[action.payload.metadata.chatId].messages

      return assocPath(
        [action.payload.metadata.chatId, 'messages'],
        append(action.payload.data, messages),
        state
      )
    }
    default:
      return state
  }
}

export default reducer
