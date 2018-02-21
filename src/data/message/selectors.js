import * as R from 'ramda'
import { createSelector } from 'redux-orm'
import orm from '../orm'

import { inflateUser } from '../utils'

export const messagesInChat = chatId =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Message.filter({ chatId })
        .toModelArray()
        .map(message =>
          Object.assign({}, message.ref, {
            from: inflateUser(message.from)
          })
        )
  )
