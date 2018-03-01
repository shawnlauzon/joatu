import { createSelector } from 'redux-orm'
import orm from '../orm'

import { resolveOwner } from '../utils'

export const offersInHub = hubId =>
  createSelector(
    orm,
    state => state.db,
    session => session.Offer.filter(offer => offer.hub === hubId).toModelArray()
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
