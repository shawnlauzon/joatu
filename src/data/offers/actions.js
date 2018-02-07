import { CALL_API } from '../actions'

export const FETCH_OFFERS_STARTED = 'FETCH_OFFERS_STARTED'
export const FETCH_OFFERS_SUCCEEDED = 'FETCH_OFFERS_SUCCEEDED'
export const FETCH_OFFERS_FAILED = 'FETCH_OFFERS_FAILED'

export const CREATE_OFFER_STARTED = 'CREATE_OFFER_STARTED'
export const CREATE_OFFER_SUCCEEDED = 'CREATE_OFFER_SUCCEEDED'
export const CREATE_OFFER_FAILED = 'CREATE_OFFER_FAILED'

export const UPDATE_OFFER_STARTED = 'UPDATE_OFFER_STARTED'
export const UPDATE_OFFER_SUCCEEDED = 'UPDATE_OFFER_SUCCEEDED'
export const UPDATE_OFFER_FAILED = 'UPDATE_OFFER_FAILED'

export const DELETE_OFFER_STARTED = 'DELETE_OFFER_STARTED'
export const DELETE_OFFER_SUCCEEDED = 'DELETE_OFFER_SUCCEEDED'
export const DELETE_OFFER_FAILED = 'DELETE_OFFER_FAILED'

const doFetchOffers = () => ({
  [CALL_API]: {
    types: [FETCH_OFFERS_STARTED, FETCH_OFFERS_SUCCEEDED, FETCH_OFFERS_FAILED],
    collection: 'offers'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchOffers())
}

const doCreateOffer = body => ({
  [CALL_API]: {
    types: [CREATE_OFFER_STARTED, CREATE_OFFER_SUCCEEDED, CREATE_OFFER_FAILED],
    collection: 'offers',
    action: 'add',
    body
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateOffer(body))
}

const doUpdateOffer = (id, body) => ({
  [CALL_API]: {
    types: [UPDATE_OFFER_STARTED, UPDATE_OFFER_SUCCEEDED, UPDATE_OFFER_FAILED],
    collection: 'offers',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateOffer(id, body))
}

const doDeleteOffer = id => ({
  [CALL_API]: {
    types: [DELETE_OFFER_STARTED, DELETE_OFFER_SUCCEEDED, DELETE_OFFER_FAILED],
    collection: 'offers',
    action: 'delete',
    id
  }
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteOffer(id))
}
