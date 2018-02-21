import { evolve, keys, values } from 'ramda'
import crudReducer from '../crudReducer'

import {
  FETCH_USERS_SUCCEEDED,
  CREATE_USER_SUCCEEDED,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER_SUCCEEDED
} from './actions'

const reducer = crudReducer({
  fetchActionType: FETCH_USERS_SUCCEEDED,
  createActionType: CREATE_USER_SUCCEEDED,
  updateActionType: UPDATE_USER_SUCCEEDED,
  removeActionType: DELETE_USER_SUCCEEDED,
  createEntity: User => (data, id) => {
    // TODO Move to API
    const transformations = {
      offers: keys,
      projects: keys,
      requests: keys,
      memberProjects: keys,
      ownedProjects: keys,
      comments: keys,
      chats: values
    }
    const user = evolve(transformations, data)

    User.create({ id, ...user })
  }
})

export default reducer

//
// {
//   userIdActionType: {
//     displayName,
//     email,
//     imgUrl,
//     projectsActionType: { projectId1ActionType: true, projectId2ActionType: true ... },
//     offersActionType: { offerId1ActionType: true, offerId2ActionType: true ... },
//     requestsActionType: { requestId1ActionType: true, requestId2ActionType: true ... }
//   }
// }
//
// const reducer = (state = {}, action) => {
//   switch (action.type) {
//     case FETCH_USERS_SUCCEEDEDActionType:
//       return action.payload
//     case CREATE_USER_SUCCEEDEDActionType:
//       return assoc(action.payload.id, action.payload.data, state)
//     case DELETE_USER_SUCCEEDEDActionType:
//       return dissoc(action.payload.id, state)
//     case ADD_PARTICIPANT_SUCCEEDEDActionType:
//       return assocPath(
//         [action.payload.userId, 'addedProjects', action.payload.projectId],
//         true,
//         state
//       )
//     case ADD_NEW_PROJECT_TO_USER_SUCCEEDEDActionType:
//       return addRefToCollection(action, 'ownedProjects', state)
//     case ADD_NEW_OFFER_TO_USER_SUCCEEDEDActionType:
//       return addRefToCollection(action, 'offers', state)
//     case ADD_NEW_USER_TO_USER_SUCCEEDEDActionType:
//       return addRefToCollection(action, 'requests', state)
//     case REMOVE_PROJECT_FROM_USER_SUCCEEDEDActionType:
//       return removeRefFromCollection(action, 'memberProjects', state)
//     case REMOVE_OFFER_FROM_USER_SUCCEEDEDActionType:
//       return removeRefFromCollection(action, 'offers', state)
//     case REMOVE_USER_FROM_USER_SUCCEEDEDActionType:
//       return removeRefFromCollection(action, 'requests', state)
//     defaultActionType:
//       return state
//   }
// }

// export default reducer
