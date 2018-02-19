import { CALL_API } from '../actions'

export const FETCH_COMMENTS_STARTED = 'FETCH_COMMENTS_STARTED'
export const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED'
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED'

export const CREATE_COMMENT_STARTED = 'CREATE_COMMENT_STARTED'
export const CREATE_COMMENT_SUCCEEDED = 'CREATE_COMMENT_SUCCEEDED'
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED'

export const ADD_NEW_COMMENT_TO_USER_STARTED = 'ADD_NEW_COMMENT_TO_USER_STARTED'
export const ADD_NEW_COMMENT_TO_USER_SUCCEEDED =
  'ADD_NEW_COMMENT_TO_USER_SUCCEEDED'
export const ADD_NEW_COMMENT_TO_USER_FAILED = 'ADD_NEW_COMMENT_TO_USER_FAILED'

export const UPDATE_COMMENT_STARTED = 'UPDATE_COMMENT_STARTED'
export const UPDATE_COMMENT_SUCCEEDED = 'UPDATE_COMMENT_SUCCEEDED'
export const UPDATE_COMMENT_FAILED = 'UPDATE_COMMENT_FAILED'

export const DELETE_COMMENT_STARTED = 'DELETE_COMMENT_STARTED'
export const DELETE_COMMENT_SUCCEEDED = 'DELETE_COMMENT_SUCCEEDED'
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'

export const REMOVE_COMMENT_FROM_USER_STARTED =
  'REMOVE_COMMENT_FROM_USER_STARTED'
export const REMOVE_COMMENT_FROM_USER_SUCCEEDED =
  'REMOVE_COMMENT_FROM_USER_SUCCEEDED'
export const REMOVE_COMMENT_FROM_USER_FAILED = 'REMOVE_COMMENT_FROM_USER_FAILED'

const doFetchComments = () => ({
  [CALL_API]: {
    types: [
      FETCH_COMMENTS_STARTED,
      FETCH_COMMENTS_SUCCEEDED,
      FETCH_COMMENTS_FAILED
    ],
    collection: 'comments'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchComments())
}

const doCreateComment = body => ({
  [CALL_API]: {
    types: [
      CREATE_COMMENT_STARTED,
      CREATE_COMMENT_SUCCEEDED,
      CREATE_COMMENT_FAILED
    ],
    collection: 'comments',
    action: 'add',
    body
  }
})

const doAddNewCommentToUser = (commentId, ownerId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_COMMENT_TO_USER_STARTED,
      ADD_NEW_COMMENT_TO_USER_SUCCEEDED,
      ADD_NEW_COMMENT_TO_USER_FAILED
    ],
    collection: 'users',
    action: 'addRef',
    category: 'comments',
    fromId: ownerId,
    toId: commentId
  }
})

export const create = body => async (dispatch, getState) => {
  const result = await dispatch(doCreateComment(body))
  dispatch(doAddNewCommentToUser(result.payload.id, result.payload.data.to))
}

const doUpdateComment = (id, body) => ({
  [CALL_API]: {
    types: [
      UPDATE_COMMENT_STARTED,
      UPDATE_COMMENT_SUCCEEDED,
      UPDATE_COMMENT_FAILED
    ],
    collection: 'comments',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateComment(id, body))
}

const doDeleteComment = id => ({
  [CALL_API]: {
    types: [
      DELETE_COMMENT_STARTED,
      DELETE_COMMENT_SUCCEEDED,
      DELETE_COMMENT_FAILED
    ],
    collection: 'comments',
    action: 'delete',
    id
  }
})

const doRemoveCommentFromUser = (commentId, ownerId) => ({
  [CALL_API]: {
    types: [
      REMOVE_COMMENT_FROM_USER_STARTED,
      REMOVE_COMMENT_FROM_USER_SUCCEEDED,
      REMOVE_COMMENT_FROM_USER_FAILED
    ],
    collection: 'users',
    action: 'removeRef',
    category: 'comments',
    fromId: ownerId,
    toId: commentId
  }
})

export const remove = id => (dispatch, getState) => {
  const comment = getState().comments[id]
  return Promise.all([
    dispatch(doDeleteComment(id)),
    dispatch(doRemoveCommentFromUser(id, comment.owner))
  ])
}
