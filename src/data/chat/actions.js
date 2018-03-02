import * as R from 'ramda'
import { CALL_API } from '../actions'
import { boolMap } from '../utils'

export const FETCH_CHATS_STARTED = 'FETCH_CHATS_STARTED'
export const FETCH_CHATS_SUCCEEDED = 'FETCH_CHATS_SUCCEEDED'
export const FETCH_CHATS_FAILED = 'FETCH_CHATS_FAILED'

export const LISTEN_CHAT_STARTED = 'LISTEN_CHAT_STARTED'
export const LISTEN_CHAT_SUCCEEDED = 'LISTEN_CHAT_SUCCEEDED'
export const LISTEN_CHAT_FAILED = 'LISTEN_CHAT_FAILED'

export const CREATE_CHAT_STARTED = 'CREATE_CHAT_STARTED'
export const CREATE_CHAT_SUCCEEDED = 'CREATE_CHAT_SUCCEEDED'
export const CREATE_CHAT_FAILED = 'CREATE_CHAT_FAILED'

export const UPDATE_CHAT_STARTED = 'UPDATE_CHAT_STARTED'
export const UPDATE_CHAT_SUCCEEDED = 'UPDATE_CHAT_SUCCEEDED'
export const UPDATE_CHAT_FAILED = 'UPDATE_CHAT_FAILED'

export const REMOVE_CHAT_STARTED = 'REMOVE_CHAT_STARTED'
export const REMOVE_CHAT_SUCCEEDED = 'REMOVE_CHAT_SUCCEEDED'
export const REMOVE_CHAT_FAILED = 'REMOVE_CHAT_FAILED'

export const FETCH_MESSAGES_STARTED = 'FETCH_MESSAGES_STARTED'
export const FETCH_MESSAGES_SUCCEEDED = 'FETCH_MESSAGES_SUCCEEDED'
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED'

export const CREATE_MESSAGE_STARTED = 'CREATE_MESSAGE_STARTED'
export const CREATE_MESSAGE_SUCCEEDED = 'CREATE_MESSAGE_SUCCEEDED'
export const CREATE_MESSAGE_FAILED = 'CREATE_MESSAGE_FAILED'

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'

const doFetchChats = () => ({
  [CALL_API]: {
    types: [FETCH_CHATS_STARTED, FETCH_CHATS_SUCCEEDED, FETCH_CHATS_FAILED],
    collection: 'chats'
  }
})

const doListenToChat = (chatId, listener) => ({
  [CALL_API]: {
    types: [LISTEN_CHAT_STARTED, LISTEN_CHAT_SUCCEEDED, LISTEN_CHAT_FAILED],
    action: 'listen',
    collection: {
      root: 'chats',
      ofDocument: chatId,
      subcollection: 'messages'
    },
    listener
  }
})

const newChatListener = (dispatch, chatId) => snapshot => {
  snapshot.docChanges.forEach(change => {
    // TODO Only listen to messages from the other user, because then we could
    // use the CREATE_MESSAGE_SUCCEEDED action to update the store, rather than
    // this message
    dispatch({
      type: MESSAGE_RECEIVED,
      payload: {
        id: change.doc.id,
        docId: chatId,
        ...change.doc.data()
      }
    })
  })
}

export const fetch = () => async (dispatch, getState) => {
  const chats = await dispatch(doFetchChats())

  const promises = []
  Object.keys(chats.payload).forEach(chatId => {
    promises.push(
      dispatch(doListenToChat(chatId, newChatListener(dispatch, chatId)))
    )
  })

  return Promise.all(promises)
}

const doCreateChat = body => ({
  [CALL_API]: {
    types: [CREATE_CHAT_STARTED, CREATE_CHAT_SUCCEEDED, CREATE_CHAT_FAILED],
    collection: 'chats',
    action: 'add',
    body
  }
})

// {
//   participants: [ userId1, userId2 ] (exactly 2)
// }
export const create = body => async (dispatch, getState) => {
  // Convert to { participants: { userId1: true, userId2: true } }
  const evolveBody = R.over(R.lensProp('participants'), boolMap)

  const result = await dispatch(doCreateChat(evolveBody(body)))
  if (result.type === CREATE_CHAT_SUCCEEDED) {
    const chatId = result.payload.id
    return dispatch(doListenToChat(chatId, newChatListener(dispatch, chatId)))
  } else {
    return result
  }
}

const doUpdateChat = (id, body) => ({
  [CALL_API]: {
    types: [UPDATE_CHAT_STARTED, UPDATE_CHAT_SUCCEEDED, UPDATE_CHAT_FAILED],
    collection: 'chats',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateChat(id, body))
}

const doDeleteChat = id => ({
  [CALL_API]: {
    types: [REMOVE_CHAT_STARTED, REMOVE_CHAT_SUCCEEDED, REMOVE_CHAT_FAILED],
    collection: 'chats',
    action: 'delete',
    id
  }
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteChat(id))
}
