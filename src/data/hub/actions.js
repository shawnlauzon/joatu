import { CALL_API } from '../actions'

export const FETCH_HUBS_STARTED = 'FETCH_HUBS_STARTED'
export const FETCH_HUBS_SUCCEEDED = 'FETCH_HUBS_SUCCEEDED'
export const FETCH_HUBS_FAILED = 'FETCH_HUBS_FAILED'

export const CREATE_HUB_STARTED = 'CREATE_HUB_STARTED'
export const CREATE_HUB_SUCCEEDED = 'CREATE_HUB_SUCCEEDED'
export const CREATE_HUB_FAILED = 'CREATE_HUB_FAILED'

export const UPDATE_HUB_STARTED = 'UPDATE_HUB_STARTED'
export const UPDATE_HUB_SUCCEEDED = 'UPDATE_HUB_SUCCEEDED'
export const UPDATE_HUB_FAILED = 'UPDATE_HUB_FAILED'

export const DELETE_HUB_STARTED = 'DELETE_HUB_STARTED'
export const DELETE_HUB_SUCCEEDED = 'DELETE_HUB_SUCCEEDED'
export const DELETE_HUB_FAILED = 'DELETE_HUB_FAILED'

const doFetchHubs = () => ({
  [CALL_API]: {
    types: [FETCH_HUBS_STARTED, FETCH_HUBS_SUCCEEDED, FETCH_HUBS_FAILED],
    collection: 'hubs'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchHubs())
}

const doCreateHub = body => ({
  [CALL_API]: {
    types: [CREATE_HUB_STARTED, CREATE_HUB_SUCCEEDED, CREATE_HUB_FAILED],
    collection: 'hubs',
    action: 'add',
    body
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateHub(body))
}

const doUpdateHub = (id, body) => ({
  [CALL_API]: {
    types: [UPDATE_HUB_STARTED, UPDATE_HUB_SUCCEEDED, UPDATE_HUB_FAILED],
    collection: 'hubs',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateHub(id, body))
}

const doDeleteHub = id => ({
  [CALL_API]: {
    types: [DELETE_HUB_STARTED, DELETE_HUB_SUCCEEDED, DELETE_HUB_FAILED],
    collection: 'hubs',
    action: 'delete',
    id
  }
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteHub(id))
}
