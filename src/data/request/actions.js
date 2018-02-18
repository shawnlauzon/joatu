import { CALL_API } from '../actions'

export const FETCH_REQUESTS_STARTED = 'FETCH_REQUESTS_STARTED'
export const FETCH_REQUESTS_SUCCEEDED = 'FETCH_REQUESTS_SUCCEEDED'
export const FETCH_REQUESTS_FAILED = 'FETCH_REQUESTS_FAILED'

export const CREATE_REQUEST_STARTED = 'CREATE_REQUEST_STARTED'
export const CREATE_REQUEST_SUCCEEDED = 'CREATE_REQUEST_SUCCEEDED'
export const CREATE_REQUEST_FAILED = 'CREATE_REQUEST_FAILED'

export const ADD_NEW_REQUEST_TO_USER_STARTED = 'ADD_NEW_REQUEST_TO_USER_STARTED'
export const ADD_NEW_REQUEST_TO_USER_SUCCEEDED =
  'ADD_NEW_REQUEST_TO_USER_SUCCEEDED'
export const ADD_NEW_REQUEST_TO_USER_FAILED = 'ADD_NEW_REQUEST_TO_USER_FAILED'

export const ADD_NEW_REQUEST_TO_COMMUNITY_STARTED =
  'ADD_NEW_REQUEST_TO_COMMUNITY_STARTED'
export const ADD_NEW_REQUEST_TO_COMMUNITY_SUCCEEDED =
  'ADD_NEW_REQUEST_TO_COMMUNITY_SUCCEEDED'
export const ADD_NEW_REQUEST_TO_COMMUNITY_FAILED =
  'ADD_NEW_REQUEST_TO_COMMUNITY_FAILED'

export const UPDATE_REQUEST_STARTED = 'UPDATE_REQUEST_STARTED'
export const UPDATE_REQUEST_SUCCEEDED = 'UPDATE_REQUEST_SUCCEEDED'
export const UPDATE_REQUEST_FAILED = 'UPDATE_REQUEST_FAILED'

export const DELETE_REQUEST_STARTED = 'DELETE_REQUEST_STARTED'
export const DELETE_REQUEST_SUCCEEDED = 'DELETE_REQUEST_SUCCEEDED'
export const DELETE_REQUEST_FAILED = 'DELETE_REQUEST_FAILED'

export const REMOVE_REQUEST_FROM_USER_STARTED =
  'REMOVE_REQUEST_FROM_USER_STARTED'
export const REMOVE_REQUEST_FROM_USER_SUCCEEDED =
  'REMOVE_REQUEST_FROM_USER_SUCCEEDED'
export const REMOVE_REQUEST_FROM_USER_FAILED = 'REMOVE_REQUEST_FROM_USER_FAILED'

export const REMOVE_REQUEST_FROM_COMMUNITY_STARTED =
  'REMOVE_REQUEST_FROM_COMMUNITY_STARTED'
export const REMOVE_REQUEST_FROM_COMMUNITY_SUCCEEDED =
  'REMOVE_REQUEST_FROM_COMMUNITY_SUCCEEDED'
export const REMOVE_REQUEST_FROM_COMMUNITY_FAILED =
  'REMOVE_REQUEST_FROM_COMMUNITY_FAILED'

const doFetchRequests = () => ({
  [CALL_API]: {
    types: [
      FETCH_REQUESTS_STARTED,
      FETCH_REQUESTS_SUCCEEDED,
      FETCH_REQUESTS_FAILED
    ],
    collection: 'requests'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchRequests())
}

const doCreateRequest = body => ({
  [CALL_API]: {
    types: [
      CREATE_REQUEST_STARTED,
      CREATE_REQUEST_SUCCEEDED,
      CREATE_REQUEST_FAILED
    ],
    collection: 'requests',
    action: 'add',
    body
  }
})

const doAddNewRequestToUser = (requestId, ownerId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_REQUEST_TO_USER_STARTED,
      ADD_NEW_REQUEST_TO_USER_SUCCEEDED,
      ADD_NEW_REQUEST_TO_USER_FAILED
    ],
    collection: 'users',
    action: 'addRef',
    category: 'requests',
    fromId: ownerId,
    toId: requestId
  }
})

const doAddNewRequestToCommunity = (projectId, communityId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_REQUEST_TO_COMMUNITY_STARTED,
      ADD_NEW_REQUEST_TO_COMMUNITY_SUCCEEDED,
      ADD_NEW_REQUEST_TO_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'addRef',
    category: 'requests',
    fromId: communityId,
    toId: projectId
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateRequest(body)).then(result =>
    Promise.all([
      dispatch(
        doAddNewRequestToUser(result.payload.id, result.payload.data.owner)
      ),
      dispatch(
        doAddNewRequestToCommunity(
          result.payload.id,
          result.payload.data.community
        )
      )
    ])
  )
}

const doUpdateRequest = (id, body) => ({
  [CALL_API]: {
    types: [
      UPDATE_REQUEST_STARTED,
      UPDATE_REQUEST_SUCCEEDED,
      UPDATE_REQUEST_FAILED
    ],
    collection: 'requests',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateRequest(id, body))
}

const doDeleteRequest = id => ({
  [CALL_API]: {
    types: [
      DELETE_REQUEST_STARTED,
      DELETE_REQUEST_SUCCEEDED,
      DELETE_REQUEST_FAILED
    ],
    collection: 'requests',
    action: 'delete',
    id
  }
})

const doRemoveRequestFromUser = (requestId, ownerId) => ({
  [CALL_API]: {
    types: [
      REMOVE_REQUEST_FROM_USER_STARTED,
      REMOVE_REQUEST_FROM_USER_SUCCEEDED,
      REMOVE_REQUEST_FROM_USER_FAILED
    ],
    collection: 'users',
    action: 'removeRef',
    category: 'requests',
    fromId: ownerId,
    toId: requestId
  }
})

const doRemoveRequestFromCommunity = (requestId, ownerId) => ({
  [CALL_API]: {
    types: [
      REMOVE_REQUEST_FROM_COMMUNITY_STARTED,
      REMOVE_REQUEST_FROM_COMMUNITY_SUCCEEDED,
      REMOVE_REQUEST_FROM_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'removeRef',
    category: 'requests',
    fromId: ownerId,
    toId: requestId
  }
})

export const remove = id => (dispatch, getState) => {
  const request = getState().requests[id]
  return Promise.all([
    dispatch(doDeleteRequest(id)),
    dispatch(doRemoveRequestFromUser(id, request.owner)),
    dispatch(doRemoveRequestFromCommunity(id, request.community))
  ])
}
