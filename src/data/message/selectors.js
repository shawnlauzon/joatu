import { createSelector } from 'redux-orm'
import orm from '../orm'

import { inflateUser } from '../utils'

export const messagesIn = docId =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Message.filter({ docId })
        .toModelArray()
        .map(message =>
          Object.assign({}, message.ref, {
            from: inflateUser(message.from)
          })
        )
  )
