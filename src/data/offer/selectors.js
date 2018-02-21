import { createSelector } from 'redux-orm'
import orm from '../orm'

import { resolveOwner } from '../utils'

export const offersInHub = createSelector(
  orm,
  state => state.db,
  state => state.selectedHubId,
  (session, hubId) =>
    session.Offer.filter(offer => offer.hub === hubId).toModelArray()
)

export const offerWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Offer.hasId(id)
        ? resolveOwner(session.Offer.withId(id))
        : undefined
  )
