import * as R from 'ramda'
import { createSelector } from 'redux-orm'
import orm from '../orm'

import { toRefArray } from '../utils'

import { inflateProject, inflateOffer, inflateRequest } from '../utils'

export const authenticatedUser = createSelector(
  orm,
  state => state.db,
  state => state.authenticatedUserId,
  (session, userId) =>
    session.User.exists(userId) ? session.User.withId(userId).ref : undefined
)

export const inflateMap = inflater => R.compose(R.map(inflater), toRefArray)

// export const resolveRequests = R.over(
//   refArrayLens('requests'),
//   inflateMap(inflateRequest)
// )

// export const resolveOffers = R.over(
//   refArrayLens('offers'),
//   inflateMap(inflateOffer)
// )

// export const resolveOwnedProjects = R.over(
//   refArrayLens('ownedProjects'),
//   R.map(inflateProject)
// )

// export const resolveMemberProjects = R.over(
//   refArrayLens('memberProjects'),
//   R.map(inflateProject)
// )

export const resolveRelations = R.evolve({
  // requests: inflateMap(inflateRequest),
  // memberProjects: inflateMap(inflateProject),
  // ownedProjects: inflateMap(inflateProject),
  // offers: inflateMap(inflateOffer)
  requests: inflateMap(inflateRequest),
  memberProjects: inflateMap(inflateProject),
  ownedProjects: inflateMap(inflateProject),
  offers: inflateMap(inflateOffer)
})

export const userWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session => {
      if (session.User.exists(id)) {
        const user = session.User.withId(id)

        const obj = user.ref

        const retVal = Object.assign({}, obj, {
          requests: inflateMap(inflateRequest)(user.requests),
          memberProjects: inflateMap(inflateProject)(user.memberProjects),
          ownedProjects: inflateMap(inflateProject)(user.ownedProjects),
          offers: inflateMap(inflateOffer)(user.offers)
        })

        return retVal
      }
    }
  )
