import { CALL_API } from '../actions'

export const FETCH_COMMUNITIES_STARTED = 'FETCH_COMMUNITIES_STARTED'
export const FETCH_COMMUNITIES_SUCCEEDED = 'FETCH_COMMUNITIES_SUCCEEDED'
export const FETCH_COMMUNITIES_FAILED = 'FETCH_COMMUNITIES_FAILED'

export const CREATE_COMMUNITY_STARTED = 'CREATE_COMMUNITY_STARTED'
export const CREATE_COMMUNITY_SUCCEEDED = 'CREATE_COMMUNITY_SUCCEEDED'
export const CREATE_COMMUNITY_FAILED = 'CREATE_COMMUNITY_FAILED'

export const UPDATE_COMMUNITY_STARTED = 'UPDATE_COMMUNITY_STARTED'
export const UPDATE_COMMUNITY_SUCCEEDED = 'UPDATE_COMMUNITY_SUCCEEDED'
export const UPDATE_COMMUNITY_FAILED = 'UPDATE_COMMUNITY_FAILED'

export const DELETE_COMMUNITY_STARTED = 'DELETE_COMMUNITY_STARTED'
export const DELETE_COMMUNITY_SUCCEEDED = 'DELETE_COMMUNITY_SUCCEEDED'
export const DELETE_COMMUNITY_FAILED = 'DELETE_COMMUNITY_FAILED'

const doFetchCommunities = () => ({
  [CALL_API]: {
    types: [
      FETCH_COMMUNITIES_STARTED,
      FETCH_COMMUNITIES_SUCCEEDED,
      FETCH_COMMUNITIES_FAILED
    ],
    collection: 'communities'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchCommunities())
}

const doCreateCommunity = body => ({
  [CALL_API]: {
    types: [
      CREATE_COMMUNITY_STARTED,
      CREATE_COMMUNITY_SUCCEEDED,
      CREATE_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'add',
    body
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateCommunity(body))
}

const doUpdateCommunity = (id, body) => ({
  [CALL_API]: {
    types: [
      UPDATE_COMMUNITY_STARTED,
      UPDATE_COMMUNITY_SUCCEEDED,
      UPDATE_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateCommunity(id, body))
}

const doDeleteCommunity = id => ({
  [CALL_API]: {
    types: [
      DELETE_COMMUNITY_STARTED,
      DELETE_COMMUNITY_SUCCEEDED,
      DELETE_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'delete',
    id
  }
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteCommunity(id))
}
