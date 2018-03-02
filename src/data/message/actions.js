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

const doFetchMessages = (type, docId) => ({
  [CALL_API]: {
    types: [
      FETCH_MESSAGES_STARTED,
      FETCH_MESSAGES_SUCCEEDED,
      FETCH_MESSAGES_FAILED
    ],
    action: 'getSorted',
    collection: {
      root: type + 's',
      subcollection: 'messages',
      ofDocument: docId
    },
    orderBy: 'createdAt',
    merge: {
      docId
    }
  }
})

export const fetch = (type, docId) => (dispatch, getState) => {
  return dispatch(doFetchMessages(type, docId))
}

const doCreateMessage = ({ type, docId, text, from }) => ({
  [CALL_API]: {
    types: [
      CREATE_MESSAGE_STARTED,
      CREATE_MESSAGE_SUCCEEDED,
      CREATE_MESSAGE_FAILED
    ],
    collection: {
      root: type + 's',
      subcollection: 'messages',
      ofDocument: docId
    },
    action: 'add',
    body: {
      text,
      from
    },
    merge: {
      docId
    }
  }
})

// {
//   collection
//   chatId,
//   text,
//   from: userId,
// }
export const create = body => (dispatch, getState) => {
  return dispatch(doCreateMessage(body))
}
