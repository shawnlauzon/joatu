import { createSelector } from 'redux-orm'
import orm from '../orm'

export const authenticatedUser = createSelector(
  orm,
  state => state.db,
  state => state.authenticatedUserId,
  (session, userId) =>
    session.User.exists(userId) ? session.User.withId(userId) : undefined
)
