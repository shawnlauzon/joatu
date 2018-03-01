import { createSelector } from 'redux-orm'
import orm from '../orm'

import { resolveOwner } from '../utils'

export const requestsInHub = hubId =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Request.filter(request => request.hub === hubId).toModelArray() // TODO We only need this because checking instanceOf in propsType; is that for the best?
  )

export const requestWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Request.hasId(id)
        ? resolveOwner(session.Request.withId(id))
        : undefined
  )
