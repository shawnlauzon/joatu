import * as R from 'ramda'

export const toRefArray = R.invoker(0, 'toRefArray')
export const toModelArray = R.invoker(0, 'toModelArray')

export const inflateRef = inflater => R.compose(R.map(inflater), toRefArray)
export const inflateModel = inflater => R.compose(R.map(inflater), toModelArray)

export const inflateHub = ({ id, name, location }) => ({
  id,
  name,
  location
})

export const inflateUser = ({ id, displayName, imgSrc }) => ({
  id,
  displayName,
  imgSrc
})

export const inflateComment = ({ id, from, text, to }) => ({
  id,
  from,
  text,
  to
})

export const inflateDiscussion = ({ id, topic, messages }) => ({
  id,
  topic,
  messages
})

export const refArrayLens = prop =>
  R.lens(R.compose(toRefArray, R.prop(prop)), R.assoc(prop))

export const resolveOwner = R.over(R.lensProp('owner'), inflateUser)

// [a] -> [{a: true}]
export const boolMap = R.compose(R.mergeAll, R.map(p => ({ [p]: true })))

export const compositeReducer = reducers => (action, Model, session) => {
  reducers.forEach(reducer => reducer(action, Model, session))
}

// PORs can be viewed if they are approved or they are owned by the authenticated user
export const canView = authenticatedUserId =>
  R.either(R.propEq('isApproved', true), R.propEq('owner', authenticatedUserId))

// A function that returns true iff the owner of the entity matches the authenticated in user
export const isOwner = authenticatedUser =>
  R.pathEq(['owner', 'id'], R.prop('id', authenticatedUser))

export const isParticipant = authenticatedUser =>
  R.pipe(
    R.prop('participants'),
    R.any(R.propEq('id', R.prop('id', authenticatedUser)))
  )

// Resolves maps of refs to their values. For example, users have references
// to all the PORs they created in the form { k -> true }. This function
// returns a new object with the `true` values replaced with their values
//
// Given ({ k -> true }, { k -> v })
export const resolveKeys = R.curry((keyMap, values) =>
  R.pick(R.keys(keyMap), values)
)

export const addRefToCollection = (action, collection, state) =>
  R.assocPath(
    [action.payload.data.owner, collection, action.payload.id],
    true,
    state
  )

export const removeRefFromCollection = (action, collection, state) =>
  R.dissocPath(
    [action.payload.data.owner, collection, action.payload.id],
    state
  )

// { k: v } -> [{ id: k, v }]
const assocId = (v, k) => ({ id: k, ...v })
const flattenIds = R.compose(R.values, R.mapObjIndexed(assocId))

// Compare using the ordering defined by orderMap, using the content of the
// 'id' field in the list to match the key in the orderMap
const valueComparator = orderMap =>
  R.compose(dictionary(orderMap), R.prop('id'))

// keyMap: { a: timestamp_later, b: timestamp_earlier }
// values: { a: {objA}, b: {objB}, c: {objC} }
// -> [ { id: 'b', ...objB }, { id: 'a', ...objA } ]
//
// Sort the values map using the order specified by the keyMap
//
// This is used for sorting our reference maps, where the keyMap contains the
// references and the values contain the entire datastore
export const pickAndSortBy = (keyMap, values) => {
  return R.compose(R.sortBy(valueComparator), flattenIds, resolveKeys(keyMap))(
    values
  )
}

// Resolves the 'key' reference using the dictionary 'dict'
// For example, to resolve all the 'from' reference using the 'users' collection:
//
// const comment = { id: "b", text="My comment", from: "abc"}
// const allUsers = { abc: { name: "Shawn" }, def: { name: "Fred" } }
//
// resolve('from', allUsers, comment) ->
//     { id: "b", text="My comment", from: { id: abc, data: { name: "Shawn" } } }
export const resolve = R.curry((key, dict, obj) => {
  const id = R.prop(key)(obj) // f(x)
  const val = dictionary(dict)(id) // g(f(x))

  // Two ways of keeping the id: either using it as a pair or adding an 'id'
  // field in the object. Here we do the former
  const valWithId = { id: id, data: val }

  // This would add an 'id' field
  //const valWithId = R.assoc('id')(id, val) // h(f(x), g(f(x)))

  return R.assoc(key)(valWithId, obj) // q(h(f(x), g(f(x))), x)
})

// {k -> v} -> k -> v
const dictionary = R.flip(R.prop)
