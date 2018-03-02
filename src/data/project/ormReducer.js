import orm from './orm'

import {
  CREATE_PROJECT_SUCCEEDED,
  REMOVE_PROJECT_SUCCEEDED,
  ASSIGN_COMMUNITY_SUCCEEDED,
  ADD_PARTICIPANT_TO_PROJECT,
  REMOVE_PARTICIPANT_FROM_PROJECT
} from './projects/actions'

// Need a similar reducer for each slice
function ormReducer(dbState, action) {
  const sess = orm.session(dbState)

  // Session-specific Models are available
  // as properties on the Session instance.
  const { Project } = sess

  switch (action.type) {
    case CREATE_PROJECT_SUCCEEDED:
      Project.withId(action.payload.id).update(action.payload)
      break
    case REMOVE_PROJECT_SUCCEEDED:
      Project.withId(action.payload.id).delete()
      break
    case ASSIGN_COMMUNITY_SUCCEEDED:
      Project.withId(action.payload.projectId).hub = action.payload.hubId
      break
    case ADD_PARTICIPANT_TO_PROJECT:
      Project.withId(action.payload.projectId).participants.add(
        action.payload.participantId
      )
      break
    case REMOVE_PARTICIPANT_FROM_PROJECT:
      Project.withId(action.payload.bookId).participants.remove(
        action.payload.participantId
      )
      break
    default:
      break
  }

  // the state property of Session always points to the current database.
  // Updates don't mutate the original state, so this reference is not
  // equal to `dbState` that was an argument to this reducer.
  return sess.state
}

export default ormReducer
