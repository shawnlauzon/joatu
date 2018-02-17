import { mapObjIndexed } from 'ramda'

import {
  FETCH_COMMUNITIES_SUCCEEDED, // it's a create from the perspective of ORM
  CREATE_COMMUNITY_SUCCEEDED,
  UPDATE_COMMUNITY_SUCCEEDED,
  DELETE_COMMUNITY_SUCCEEDED
} from './actions'

const communityReducer = (action, Community, session) => {
  const createCommunity = (data, id) => Community.create({ id, ...data })

  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCEEDED:
      mapObjIndexed(createCommunity, action.payload)
      break
    case CREATE_COMMUNITY_SUCCEEDED:
      createCommunity(action.payload, action.payload.id)
      break
    case UPDATE_COMMUNITY_SUCCEEDED:
      Community.withId(action.payload.id).update(action.payload)
      break
    case DELETE_COMMUNITY_SUCCEEDED:
      Community.withId(action.payload.id).delete()
      break
    default:
      break
  }

  // the state property of Session always points to the current database.
  // Updates don't mutate the original state, so this reference is not
  // equal to `dbState` that was an argument to this reducer.
  // return sess.state
}

export default communityReducer
