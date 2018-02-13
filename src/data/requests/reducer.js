import { assoc, dissoc } from 'ramda'

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
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_REQUEST_SUCCEEDED:
      return dissoc(action.payload.id, state)
    default:
      return state
  }
}

export default reducer
