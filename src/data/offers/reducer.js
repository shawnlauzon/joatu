import { assoc, dissoc } from 'ramda'

import {
  FETCH_OFFERS_SUCCEEDED,
  CREATE_OFFER_SUCCEEDED,
  DELETE_OFFER_SUCCEEDED
} from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_OFFERS_SUCCEEDED:
      return action.payload
    case CREATE_OFFER_SUCCEEDED:
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_OFFER_SUCCEEDED:
      return dissoc(action.payload.id, state)
    default:
      return state
  }
}

export default reducer
