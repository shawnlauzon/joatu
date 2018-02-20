import { keys, evolve } from 'ramda'
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
      participants: keys
    }
    const chat = evolve(transformations, data)

    console.log('creating chat', chat)

    Chat.create({ id, ...chat })
  }
})

export default reducer
