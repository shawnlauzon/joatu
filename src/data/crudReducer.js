import * as R from 'ramda'
import { mapObjIndexed } from 'ramda'

const crudReducer = ({
  createActionType,
  fetchActionType,
  updateActionType,
  removeActionType,
  createEntity,
  payloadProp = R.identity
}) => (action, Model, session) => {
  const createEntityFunc = createEntity
    ? createEntity(Model)
    : (data, id) => Model.create({ id, ...data })

  switch (action.type) {
    case fetchActionType:
      // it's a createActionType from the perspective of ORM
      mapObjIndexed(createEntityFunc, payloadProp(action.payload))
      break
    case createActionType:
      createEntityFunc(action.payload, action.payload.id)
      break
    case updateActionType:
      console.log('payload', action.payload)
      Model.withId(action.payload.id).update(action.payload)
      break
    case removeActionType:
      Model.withId(action.payload.id).delete()
      break
    default:
      break
  }
}

export default crudReducer
