import { mapObjIndexed } from 'ramda'

const entityReducer = ({
  createActionType,
  fetchActionType,
  updateActionType,
  removeActionType,
  createEntity
}) => (action, Model, session) => {
  const createEntityFunc = createEntity
    ? createEntity(Model)
    : (data, id) => Model.create({ id, ...data })

  switch (action.type) {
    case fetchActionType:
      // it's a createActionType from the perspective of ORM
      mapObjIndexed(createEntityFunc, action.payload)
      break
    case createActionType:
      createEntityFunc(action.payload, action.payload.id)
      break
    case updateActionType:
      Model.withId(action.payload.id).updateActionType(action.payload)
      break
    case removeActionType:
      Model.withId(action.payload.id).delete()
      break
    default:
      break
  }
}

export default entityReducer
