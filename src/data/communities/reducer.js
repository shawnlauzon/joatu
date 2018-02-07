import * as R from 'ramda'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  CREATE_COMMUNITY_SUCCEEDED,
  DELETE_COMMUNITY_SUCCEEDED
} from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCEEDED:
      return action.payload
    case CREATE_COMMUNITY_SUCCEEDED:
      return Object.assign({}, state, action.payload)
    case DELETE_COMMUNITY_SUCCEEDED:
      return R.dissoc(action.payload, state)
    default:
      return state
  }
}

export default reducer
