import { createSelector } from 'redux-orm'
import orm from '../orm'

import { inflateUser } from '../utils'

export const commentsTo = to =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Comment.filter({ to })
        .toModelArray()
        .map(comment =>
          Object.assign({}, comment.ref, {
            from: inflateUser(comment.from)
          })
        )
  )
