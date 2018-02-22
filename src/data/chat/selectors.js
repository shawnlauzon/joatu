import * as R from 'ramda'
import { createSelector } from 'redux-orm'
import orm from '../orm'

import { inflateUser } from '../utils'

import { listenForNewMessages } from './actions'

export const offersInHub = createSelector(
  orm,
  state => state.db,
  state => state.selectedHubId,
  (session, hubId) =>
    session.Offer.filter(offer => offer.hub === hubId).toModelArray()
)

const hasUser = id => R.find(R.propEq('id', id))

export const chatWithUser = userId =>
  createSelector(
    orm,
    state => state.db,
    state => state.authenticatedUserId,
    (session, authenticatedUserId) => {
      const matchingChats = session.Chat.all()
        .toModelArray()
        .filter(chat => {
          return R.both(hasUser(userId), hasUser(authenticatedUserId))(
            chat.participants.toRefArray()
          )
        })
        .map(chat => {
          const participants = chat.participants.toRefArray()
          return Object.assign({}, chat.ref, {
            participants: participants.map(inflateUser)
          })
        })

      if (matchingChats.length > 1) {
        console.err('Warning: expected 0 or 1 chats', matchingChats)
      }

      return matchingChats ? matchingChats[0] : undefined
    }
  )

// export const newMessages = chatId =>
//   createSelector(
//     orm,
//     state => state.db,
//     session => {
//       const matchingChats = session.Chat.all()
//         .toModelArray()
//         .filter(chat => {
//           return R.both(hasUser(userId), hasUser(authenticatedUserId))(
//             chat.participants.toRefArray()
//           )
//         })
//         .map(chat => {
//           const participants = chat.participants.toRefArray()
//           return Object.assign({}, chat.ref, {
//             participants: participants.map(inflateUser)
//           })
//         })

//       if (matchingChats.length > 1) {
//         console.err('Warning: expected 0 or 1 chats', matchingChats)
//       }

//       return matchingChats ? matchingChats[0] : undefined
//     }
//   )
