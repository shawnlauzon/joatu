import entityReducer from '../entityReducer'

import {
  FETCH_OFFERS_SUCCEEDED,
  CREATE_OFFER_SUCCEEDED,
  UPDATE_OFFER_SUCCEEDED,
  DELETE_OFFER_SUCCEEDED
} from './actions'

const reducer = entityReducer({
  fetchActionType: FETCH_OFFERS_SUCCEEDED,
  createActionType: CREATE_OFFER_SUCCEEDED,
  updateActionType: UPDATE_OFFER_SUCCEEDED,
  removeActionType: DELETE_OFFER_SUCCEEDED
})

export default reducer
