import * as R from 'ramda'

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
      return Object.assign({}, state, action.payload)
    case DELETE_OFFER_SUCCEEDED:
      return R.dissoc(action.payload, state)
    default:
      return state
  }
}

export default reducer
