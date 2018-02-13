import { CALL_API } from '../actions'

export const FETCH_OFFERS_STARTED = 'FETCH_OFFERS_STARTED'
export const FETCH_OFFERS_SUCCEEDED = 'FETCH_OFFERS_SUCCEEDED'
export const FETCH_OFFERS_FAILED = 'FETCH_OFFERS_FAILED'

export const CREATE_OFFER_STARTED = 'CREATE_OFFER_STARTED'
export const CREATE_OFFER_SUCCEEDED = 'CREATE_OFFER_SUCCEEDED'
export const CREATE_OFFER_FAILED = 'CREATE_OFFER_FAILED'

export const ADD_NEW_OFFER_TO_USER_STARTED = 'ADD_NEW_OFFER_TO_USER_STARTED'
export const ADD_NEW_OFFER_TO_USER_SUCCEEDED = 'ADD_NEW_OFFER_TO_USER_SUCCEEDED'
export const ADD_NEW_OFFER_TO_USER_FAILED = 'ADD_NEW_OFFER_TO_USER_FAILED'

export const ADD_NEW_OFFER_TO_COMMUNITY_STARTED =
  'ADD_NEW_OFFER_TO_COMMUNITY_STARTED'
export const ADD_NEW_OFFER_TO_COMMUNITY_SUCCEEDED =
  'ADD_NEW_OFFER_TO_COMMUNITY_SUCCEEDED'
export const ADD_NEW_OFFER_TO_COMMUNITY_FAILED =
  'ADD_NEW_OFFER_TO_COMMUNITY_FAILED'

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

const doAddNewOfferToUser = (offerId, ownerId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_OFFER_TO_USER_STARTED,
      ADD_NEW_OFFER_TO_USER_SUCCEEDED,
      ADD_NEW_OFFER_TO_USER_FAILED
    ],
    collection: 'users',
    action: 'addRef',
    category: 'offers',
    fromId: ownerId,
    toId: offerId
  }
})

const doAddNewOfferToCommunity = (projectId, communityId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_OFFER_TO_COMMUNITY_STARTED,
      ADD_NEW_OFFER_TO_COMMUNITY_SUCCEEDED,
      ADD_NEW_OFFER_TO_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'addRef',
    category: 'offers',
    fromId: communityId,
    toId: projectId
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateOffer(body)).then(result =>
    Promise.all([
      dispatch(
        doAddNewOfferToUser(result.payload.id, result.payload.data.owner)
      ),
      dispatch(
        doAddNewOfferToCommunity(
          result.payload.id,
          result.payload.data.community
        )
      )
    ])
  )
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
