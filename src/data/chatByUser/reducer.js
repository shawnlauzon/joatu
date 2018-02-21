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
  createEntity: ChatByUser => (data, id) => {
    // const createChats = R.compose(
    //   R.map(participant => ChatByUser.create({ id, participant })),
    //   R.tap(console.log),
    //   R.keys,
    //   R.prop('participants')
    // )
    // createChats(data)

    const participants = Object.keys(data.participants)

    // TODO Support > 2 participants (would need to do permutations)
    ChatByUser.create({
      id: participants[0],
      chat: id,
      participant: participants[1]
    })
    ChatByUser.create({
      id: participants[1],
      chat: id,
      participant: participants[0]
    })
  }
})

export default reducer
