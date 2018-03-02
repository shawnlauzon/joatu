import { evolve, keys } from 'ramda'
import crudReducer from '../crudReducer'

import { compositeReducer } from '../utils'

import {
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED,
  UPDATE_PROJECT_SUCCEEDED,
  REMOVE_PROJECT_SUCCEEDED,
  ADD_PARTICIPANT_TO_PROJECT_SUCCEEDED,
  REMOVE_PARTICIPANT_FROM_PROJECT_SUCCEEDED
} from './actions'

const linkReducer = ({
  collection,
  foreignKey,
  primaryKey,
  linkActionType,
  unlinkActionType
}) => (action, Model, session) => {
  switch (action.type) {
    case linkActionType:
      Model.withId(action.payload[primaryKey])[collection].add(
        action.payload[foreignKey]
      )
      break
    case unlinkActionType:
      Model.withId(action.payload[primaryKey])[collection].remove(
        action.payload[foreignKey]
      )
      break
    default:
      break
  }
}

const reducer = compositeReducer([
  crudReducer({
    fetchActionType: FETCH_PROJECTS_SUCCEEDED,
    createActionType: CREATE_PROJECT_SUCCEEDED,
    updateActionType: UPDATE_PROJECT_SUCCEEDED,
    removeActionType: REMOVE_PROJECT_SUCCEEDED,
    createEntity: Project => (data, id) => {
      // TODO Move to API
      const transformations = {
        participants: keys,
        pendingParticipants: keys
      }
      const project = evolve(transformations, data)

      Project.create({ id, ...project })
    }
  }),
  linkReducer({
    collection: 'pendingParticipants',
    primaryKey: 'id',
    foreignKey: 'participantId',
    linkActionType: ADD_PARTICIPANT_TO_PROJECT_SUCCEEDED,
    unlinkActionType: REMOVE_PARTICIPANT_FROM_PROJECT_SUCCEEDED
  })
])

export default reducer
