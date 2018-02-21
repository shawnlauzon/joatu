import { createSelector } from 'redux-orm'
import orm from '../orm'

import { inflateUser } from '../utils'

export const offersInHub = createSelector(
  orm,
  state => state.db,
  state => state.selectedHubId,
  (session, hubId) =>
    session.Offer.filter(offer => offer.hub === hubId).toModelArray()
)

// FIXME This only works if the correct chat is the first item
export const chatWithUser = userId =>
  createSelector(
    orm,
    state => state.db,
    state => state.authenticatedUserId,
    (session, authenticatedUserId) => {
      return session.Chat.all()
        .toModelArray()
        .map(chat => {
          const participants = chat.participants.toRefArray()
          if (
            (participants[0].id === authenticatedUserId &&
              participants[1].id === userId) ||
            (participants[1].id === authenticatedUserId &&
              participants[0].id === userId)
          ) {
            const retVal = Object.assign({}, chat.ref, {
              participants: participants.map(inflateUser)
            })
            return retVal
          } else {
            return undefined
          }
        })[0]
    }
  )
