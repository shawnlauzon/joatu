import crudReducer from '../crudReducer'

import {
  FETCH_OFFERS_SUCCEEDED,
  CREATE_OFFER_SUCCEEDED,
  UPDATE_OFFER_SUCCEEDED,
  REMOVE_OFFER_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_OFFERS_SUCCEEDED,
  createActionType: CREATE_OFFER_SUCCEEDED,
  updateActionType: UPDATE_OFFER_SUCCEEDED,
  removeActionType: REMOVE_OFFER_SUCCEEDED
})

export default reducer
