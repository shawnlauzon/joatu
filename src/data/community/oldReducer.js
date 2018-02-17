import { assoc, dissoc } from 'ramda'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  CREATE_COMMUNITY_SUCCEEDED,
  DELETE_COMMUNITY_SUCCEEDED
} from './actions'

import {
  ADD_NEW_PROJECT_TO_COMMUNITY_SUCCEEDED,
  REMOVE_PROJECT_FROM_COMMUNITY_SUCCEEDED
} from '../projects/actions'
import {
  ADD_NEW_OFFER_TO_COMMUNITY_SUCCEEDED,
  REMOVE_OFFER_FROM_COMMUNITY_SUCCEEDED
} from '../offers/actions'
import {
  ADD_NEW_REQUEST_TO_COMMUNITY_SUCCEEDED,
  REMOVE_REQUEST_FROM_COMMUNITY_SUCCEEDED
} from '../requests/actions'

import { addRefToCollection, removeRefFromCollection } from '../utils'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCEEDED:
      return action.payload
    case CREATE_COMMUNITY_SUCCEEDED:
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_COMMUNITY_SUCCEEDED:
      return dissoc(action.payload.id, state)
    case ADD_NEW_PROJECT_TO_COMMUNITY_SUCCEEDED:
      return addRefToCollection(action, 'projects', state)
    case ADD_NEW_OFFER_TO_COMMUNITY_SUCCEEDED:
      return addRefToCollection(action, 'offers', state)
    case ADD_NEW_REQUEST_TO_COMMUNITY_SUCCEEDED:
      return addRefToCollection(action, 'requests', state)
    case REMOVE_PROJECT_FROM_COMMUNITY_SUCCEEDED:
      return removeRefFromCollection(action, 'projects', state)
    case REMOVE_OFFER_FROM_COMMUNITY_SUCCEEDED:
      return removeRefFromCollection(action, 'offers', state)
    case REMOVE_REQUEST_FROM_COMMUNITY_SUCCEEDED:
      return removeRefFromCollection(action, 'requests', state)
    default:
      return state
  }
}

export default reducer
