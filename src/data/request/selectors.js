import { createSelector } from 'redux-orm'
import orm from '../orm'

import { resolveOwner } from '../utils'

export const requestsInCommunity = createSelector(
  orm,
  state => state.db,
  state => state.selectedCommunityId,
  (session, hubId) =>
    session.Request.filter(
      request => request.community === hubId
    ).toModelArray() // TODO We only need this because checking instanceOf in propsType; is that for the best?
)

export const requestWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Request.exists(id)
        ? resolveOwner(session.Request.withId(id))
        : undefined
  )
