import { CALL_API } from '../actions'

export const FETCH_MESSAGES_STARTED = 'FETCH_MESSAGES_STARTED'
export const FETCH_MESSAGES_SUCCEEDED = 'FETCH_MESSAGES_SUCCEEDED'
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED'

export const CREATE_MESSAGE_STARTED = 'CREATE_MESSAGE_STARTED'
export const CREATE_MESSAGE_SUCCEEDED = 'CREATE_MESSAGE_SUCCEEDED'
export const CREATE_MESSAGE_FAILED = 'CREATE_MESSAGE_FAILED'

export const UPDATE_MESSAGE_STARTED = 'UPDATE_MESSAGE_STARTED'
export const UPDATE_MESSAGE_SUCCEEDED = 'UPDATE_MESSAGE_SUCCEEDED'
export const UPDATE_MESSAGE_FAILED = 'UPDATE_MESSAGE_FAILED'

export const DELETE_MESSAGE_STARTED = 'DELETE_MESSAGE_STARTED'
export const DELETE_MESSAGE_SUCCEEDED = 'DELETE_MESSAGE_SUCCEEDED'
export const DELETE_MESSAGE_FAILED = 'DELETE_MESSAGE_FAILED'

const doFetchMessages = chatId => ({
  [CALL_API]: {
    types: [
      FETCH_MESSAGES_STARTED,
      FETCH_MESSAGES_SUCCEEDED,
      FETCH_MESSAGES_FAILED
    ],
    action: 'getSorted',
    collection: {
      root: 'chats',
      subcollection: 'messages',
      ofDocument: chatId
    },
    orderBy: 'sentAt',
    merge: {
      chatId
    }
  }
})

export const fetch = chatId => (dispatch, getState) => {
  return dispatch(doFetchMessages(chatId))
}

const doCreateMessage = ({ chatId, text, from }) => ({
  [CALL_API]: {
    types: [
      CREATE_MESSAGE_STARTED,
      CREATE_MESSAGE_SUCCEEDED,
      CREATE_MESSAGE_FAILED
    ],
    collection: {
      root: 'chats',
      subcollection: 'messages',
      ofDocument: chatId
    },
    action: 'add',
    body: {
      sentAt: Date.now(),
      text,
      from
    },
    merge: {
      chatId
    }
  }
})

// {
//   chatId,
//   text,
//   from: userId,
// }
export const create = body => (dispatch, getState) => {
  return dispatch(doCreateMessage(body))
}
