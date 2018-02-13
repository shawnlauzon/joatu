import { assoc, dissoc } from 'ramda'

import {
  FETCH_COMMENTS_SUCCEEDED,
  CREATE_COMMENT_SUCCEEDED,
  DELETE_COMMENT_SUCCEEDED
} from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCEEDED:
      return action.payload
    case CREATE_COMMENT_SUCCEEDED:
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_COMMENT_SUCCEEDED:
      return dissoc(action.payload.id, state)
    default:
      return state
  }
}

export default reducer
