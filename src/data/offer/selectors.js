import { createSelector } from 'redux-orm'
import orm from '../orm'

import { resolveOwner } from '../utils'

export const offersInCommunity = createSelector(
  orm,
  state => state.db,
  state => state.selectedCommunityId,
  (session, hubId) =>
    session.Offer.filter(offer => offer.community === hubId).toModelArray()
)

export const offerWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Offer.exists(id)
        ? resolveOwner(session.Offer.withId(id))
        : undefined
  )
