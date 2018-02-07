import * as R from 'ramda'

import {
  FETCH_REQUESTS_SUCCEEDED,
  CREATE_REQUEST_SUCCEEDED,
  DELETE_REQUEST_SUCCEEDED
} from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REQUESTS_SUCCEEDED:
      return action.payload
    case CREATE_REQUEST_SUCCEEDED:
      return Object.assign({}, state, action.payload)
    case DELETE_REQUEST_SUCCEEDED:
      return R.dissoc(action.payload, state)
    default:
      return state
  }
}

export default reducer
