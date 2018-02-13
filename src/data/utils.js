import { assocPath, dissocPath, keys, pick } from 'ramda'

// Resolves maps of refs to their values. For example, users have references
// to all the PORs they created in the form { k -> true }. This function
// returns a new object with the `true` values replaced with their values
//
// Given ({ k -> true }, { k -> v })
export const resolveKeys = (keyMap, values) => {
  return pick(keys(keyMap), values)
}

export const addRefToCollection = (action, collection, state) =>
  assocPath(
    [action.payload.data.owner, collection, action.payload.id],
    true,
    state
  )

export const removeRefFromCollection = (action, collection, state) =>
  dissocPath([action.payload.data.owner, collection, action.payload.id], state)
