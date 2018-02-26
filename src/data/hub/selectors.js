import { createSelector } from 'redux-orm'
import orm from '../orm'

const dbStateSelector = state => state.db

export const allHubs = createSelector(
  orm,
  // The first input selector should always select the db-state.
  // Behind the scenes, `createSelector` begins a Redux-ORM session
  // with the value returned by `dbStateSelector` and passes
  // that Session instance as an argument instead.
  dbStateSelector,
  session => {
    return session.Hub.all()
      .toModelArray()
      .map(hub => {
        // Returns a reference to the raw object in the store,
        // so it doesn't include any reverse or m2m fields.
        const obj = hub.ref
        // Object.keys(obj) === ['id', 'name']

        return Object.assign({}, obj, {
          members: hub.members
            .toRefArray()
            .map(({ id, displayName, imgUrl }) => ({
              id,
              name: displayName,
              imgUrl
            }))
        })
      })
  }
)

export const selectedHub = createSelector(
  orm,
  state => state.db,
  state => state.selectedHubId,
  (session, hubId) => {
    return session.Hub.hasId(hubId) ? session.Hub.withId(hubId).ref : undefined
  }
)

export const homeHub = createSelector(
  orm,
  state => state.db,
  state => state.authenticatedUserId,
  (session, authenticatedUserId) => {
    const user =
      authenticatedUserId && session.User.hasId(authenticatedUserId)
        ? session.User.withId(authenticatedUserId).ref
        : undefined
    return user && user.homeHub && session.Hub.hasId(user.homeHub)
      ? session.Hub.withId(user.homeHub).ref
      : undefined
  }
)

// Will result in something like this when run:
// [
//   {
//     id: 'Evh5FhYWl6PdbrdCcNdk',
//     name: 'Laurier',
//   },
//   ...
// ]
