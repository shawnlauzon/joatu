import * as R from 'ramda'
import crudReducer from '../crudReducer'

import {
  FETCH_CHATS_SUCCEEDED,
  CREATE_CHAT_SUCCEEDED,
  UPDATE_CHAT_SUCCEEDED,
  REMOVE_CHAT_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_CHATS_SUCCEEDED,
  createActionType: CREATE_CHAT_SUCCEEDED,
  updateActionType: UPDATE_CHAT_SUCCEEDED,
  removeActionType: REMOVE_CHAT_SUCCEEDED,
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
