import entityReducer from '../entityReducer'

import {
  FETCH_COMMUNITIES_SUCCEEDED,
  CREATE_COMMUNITY_SUCCEEDED,
  UPDATE_COMMUNITY_SUCCEEDED,
  DELETE_COMMUNITY_SUCCEEDED
} from './actions'

const communityReducer = entityReducer({
  fetchActionType: FETCH_COMMUNITIES_SUCCEEDED,
  createActionType: CREATE_COMMUNITY_SUCCEEDED,
  updateActionType: UPDATE_COMMUNITY_SUCCEEDED,
  removeActionType: DELETE_COMMUNITY_SUCCEEDED
})

export default communityReducer
