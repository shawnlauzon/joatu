import { assoc, assocPath, dissoc } from 'ramda'

import {
  FETCH_USERS_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED
} from './actions'

import {
  ADD_NEW_PROJECT_TO_USER_SUCCEEDED,
  ADD_PARTICIPANT_SUCCEEDED,
  REMOVE_PROJECT_FROM_USER_SUCCEEDED
} from '../projects/actions'
import {
  ADD_NEW_OFFER_TO_USER_SUCCEEDED,
  REMOVE_OFFER_FROM_USER_SUCCEEDED
} from '../offers/actions'
import {
  ADD_NEW_REQUEST_TO_USER_SUCCEEDED,
  REMOVE_REQUEST_FROM_USER_SUCCEEDED
} from '../requests/actions'

import { addRefToCollection, removeRefFromCollection } from '../utils'

//
// {
//   userId: {
//     displayName,
//     email,
//     imgUrl,
//     projects: { projectId1: true, projectId2: true ... },
//     offers: { offerId1: true, offerId2: true ... },
//     requests: { requestId1: true, requestId2: true ... }
//   }
// }
//
const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED:
      return action.payload
    case CREATE_USER_SUCCEEDED:
      return assoc(action.payload.id, action.payload.data, state)
    case DELETE_USER_SUCCEEDED:
      return dissoc(action.payload.id, state)
    case ADD_PARTICIPANT_SUCCEEDED:
      return assocPath(
        [action.payload.userId, 'addedProjects', action.payload.projectId],
        true,
        state
      )
    case ADD_NEW_PROJECT_TO_USER_SUCCEEDED:
      return addRefToCollection(action, 'ownedProjects', state)
    case ADD_NEW_OFFER_TO_USER_SUCCEEDED:
      return addRefToCollection(action, 'offers', state)
    case ADD_NEW_REQUEST_TO_USER_SUCCEEDED:
      return addRefToCollection(action, 'requests', state)
    case REMOVE_PROJECT_FROM_USER_SUCCEEDED:
      return removeRefFromCollection(action, 'memberProjects', state)
    case REMOVE_OFFER_FROM_USER_SUCCEEDED:
      return removeRefFromCollection(action, 'offers', state)
    case REMOVE_REQUEST_FROM_USER_SUCCEEDED:
      return removeRefFromCollection(action, 'requests', state)
    default:
      return state
  }
}

export default reducer
