import * as R from 'ramda'
import { createSelector } from 'redux-orm'
import orm from '../orm'

import { inflateRef, inflateModel } from '../utils'

import {
  inflateProject,
  inflateOffer,
  inflateRequest,
  inflateComment
} from '../utils'

export const authenticatedUser = createSelector(
  orm,
  state => state.db,
  state => state.authenticatedUserId,
  (session, userId) =>
    session.User.exists(userId) ? session.User.withId(userId).ref : undefined
)

// export const resolveRequests = R.over(
//   refArrayLens('requests'),
//   inflateRef(inflateRequest)
// )

// export const resolveOffers = R.over(
//   refArrayLens('offers'),
//   inflateRef(inflateOffer)
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
  // requests: inflateRef(inflateRequest),
  // memberProjects: inflateRef(inflateProject),
  // ownedProjects: inflateRef(inflateProject),
  // offers: inflateRef(inflateOffer)
  requests: inflateRef(inflateRequest),
  memberProjects: inflateRef(inflateProject),
  ownedProjects: inflateRef(inflateProject),
  offers: inflateRef(inflateOffer)
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
          requests: inflateRef(inflateRequest)(user.requests),
          memberProjects: inflateRef(inflateProject)(user.memberProjects),
          ownedProjects: inflateRef(inflateProject)(user.ownedProjects),
          offers: inflateRef(inflateOffer)(user.offers),
          comments: inflateModel(inflateComment)(user.comments)
        })

        return retVal
      }
    }
  )
