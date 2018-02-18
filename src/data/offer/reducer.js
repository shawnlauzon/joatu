import entityReducer from '../entityReducer'

import {
  FETCH_OFFERS_SUCCEEDED,
  CREATE_OFFER_SUCCEEDED,
  UPDATE_OFFER_SUCCEEDED,
  DELETE_OFFER_SUCCEEDED
} from './actions'

const reducer = entityReducer({
  fetch: FETCH_OFFERS_SUCCEEDED,
  create: CREATE_OFFER_SUCCEEDED,
  update: UPDATE_OFFER_SUCCEEDED,
  remove: DELETE_OFFER_SUCCEEDED
})

export default reducer
