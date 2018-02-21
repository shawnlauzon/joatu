import { createSelector } from 'redux-orm'
import orm from '../orm'

export const chatWithUser = userId =>
  createSelector(
    orm,
    state => state.db,
    state => state.authenticatedUserId,
    (session, authenticatedUserId) => {
      const chatByUser = session.ChatByUser.withId(authenticatedUserId)
        .filter({ participant: userId })
        .toModelArray()
        .first() // there should only be 1
    }
  )
