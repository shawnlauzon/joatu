import { CALL_API } from '../actions'

export const FETCH_DISCUSSIONS_STARTED = 'FETCH_DISCUSSIONS_STARTED'
export const FETCH_DISCUSSIONS_SUCCEEDED = 'FETCH_DISCUSSIONS_SUCCEEDED'
export const FETCH_DISCUSSIONS_FAILED = 'FETCH_DISCUSSIONS_FAILED'

export const LISTEN_DISCUSSION_STARTED = 'LISTEN_DISCUSSION_STARTED'
export const LISTEN_DISCUSSION_SUCCEEDED = 'LISTEN_DISCUSSION_SUCCEEDED'
export const LISTEN_DISCUSSION_FAILED = 'LISTEN_DISCUSSION_FAILED'

export const CREATE_DISCUSSION_STARTED = 'CREATE_DISCUSSION_STARTED'
export const CREATE_DISCUSSION_SUCCEEDED = 'CREATE_DISCUSSION_SUCCEEDED'
export const CREATE_DISCUSSION_FAILED = 'CREATE_DISCUSSION_FAILED'

export const UPDATE_DISCUSSION_STARTED = 'UPDATE_DISCUSSION_STARTED'
export const UPDATE_DISCUSSION_SUCCEEDED = 'UPDATE_DISCUSSION_SUCCEEDED'
export const UPDATE_DISCUSSION_FAILED = 'UPDATE_DISCUSSION_FAILED'

export const REMOVE_DISCUSSION_STARTED = 'REMOVE_DISCUSSION_STARTED'
export const REMOVE_DISCUSSION_SUCCEEDED = 'REMOVE_DISCUSSION_SUCCEEDED'
export const REMOVE_DISCUSSION_FAILED = 'REMOVE_DISCUSSION_FAILED'

export const FIND_DISCUSSION_STARTED = 'FIND_DISCUSSION_STARTED'
export const FIND_DISCUSSION_SUCCEEDED = 'FIND_DISCUSSION_SUCCEEDED'
export const FIND_DISCUSSION_FAILED = 'FIND_DISCUSSION_FAILED'

export const FETCH_MESSAGES_STARTED = 'FETCH_MESSAGES_STARTED'
export const FETCH_MESSAGES_SUCCEEDED = 'FETCH_MESSAGES_SUCCEEDED'
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED'

export const CREATE_MESSAGE_STARTED = 'CREATE_MESSAGE_STARTED'
export const CREATE_MESSAGE_SUCCEEDED = 'CREATE_MESSAGE_SUCCEEDED'
export const CREATE_MESSAGE_FAILED = 'CREATE_MESSAGE_FAILED'

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'

const doFetchDiscussions = () => ({
  [CALL_API]: {
    types: [
      FETCH_DISCUSSIONS_STARTED,
      FETCH_DISCUSSIONS_SUCCEEDED,
      FETCH_DISCUSSIONS_FAILED
    ],
    collection: 'discussions'
  }
})

const doListenToDiscussion = (discussionId, listener) => ({
  [CALL_API]: {
    types: [
      LISTEN_DISCUSSION_STARTED,
      LISTEN_DISCUSSION_SUCCEEDED,
      LISTEN_DISCUSSION_FAILED
    ],
    action: 'listen',
    collection: {
      root: 'discussions',
      ofDocument: discussionId,
      subcollection: 'messages'
    },
    listener
  }
})

export const fetch = () => async (dispatch, getState) => {
  const listener = discussionId => snapshot => {
    snapshot.docChanges.forEach(discussion => {
      // TODO Discard discussions to documents originated from this computer
      dispatch({
        type: MESSAGE_RECEIVED,
        payload: {
          id: discussion.doc.id,
          docId: discussionId,
          ...discussion.doc.data()
        }
      })
    })
  }
  const discussions = await dispatch(doFetchDiscussions())
  Object.keys(discussions.payload).forEach(discussionId => {
    dispatch(doListenToDiscussion(discussionId, listener(discussionId)))
  })
}

const doCreateDiscussion = body => ({
  [CALL_API]: {
    types: [
      CREATE_DISCUSSION_STARTED,
      CREATE_DISCUSSION_SUCCEEDED,
      CREATE_DISCUSSION_FAILED
    ],
    collection: 'discussions',
    action: 'add',
    body
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateDiscussion(body))
}

const doUpdateDiscussion = (id, body) => ({
  [CALL_API]: {
    types: [
      UPDATE_DISCUSSION_STARTED,
      UPDATE_DISCUSSION_SUCCEEDED,
      UPDATE_DISCUSSION_FAILED
    ],
    collection: 'discussions',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateDiscussion(id, body))
}

const doDeleteDiscussion = id => ({
  [CALL_API]: {
    types: [
      REMOVE_DISCUSSION_STARTED,
      REMOVE_DISCUSSION_SUCCEEDED,
      REMOVE_DISCUSSION_FAILED
    ],
    collection: 'discussions',
    action: 'delete',
    id
  }
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteDiscussion(id))
}

const doFindDiscussion = where => ({
  [CALL_API]: {
    types: [
      FIND_DISCUSSION_STARTED,
      FIND_DISCUSSION_SUCCEEDED,
      FIND_DISCUSSION_FAILED
    ],
    collection: 'discussions',
    action: 'find',
    where
  }
})

export const find = where => (dispatch, getState) => {
  return dispatch(doFindDiscussion(where))
}
