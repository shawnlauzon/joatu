import { map } from 'ramda'
import { createSelector } from 'reselect'

import { resolveKeys, pickAndSortBy, resolve } from '../utils'

const getUserById = id => state => state.users[id]

const getProjects = state => state.projects
const getOffers = state => state.offers
const getRequests = state => state.requests
const getComments = state => state.comments
const getUsers = state => state.users
const getChats = state => state.chats

export const getOwnedProjectsForUser = id =>
  createSelector([getUserById(id), getProjects], (user, projects) => {
    return user ? resolveKeys(user.ownedProjects, projects) : {}
  })

export const getMemberProjectsForUser = id =>
  createSelector([getUserById(id), getProjects], (user, projects) => {
    return user ? resolveKeys(user.memberProjects, projects) : {}
  })

export const getRequestsForUser = id =>
  createSelector([getUserById(id), getRequests], (user, requests) => {
    return user ? resolveKeys(user.requests, requests) : {}
  })

export const getOffersForUser = id =>
  createSelector([getUserById(id), getOffers], (user, offers) => {
    return user ? resolveKeys(user.offers, offers) : {}
  })

// Comments are sorted by timestamp
// comments: PropTypes.arrayOf(
//   PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     from: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       data: PropTypes.shape({
//         displayName: PropTypes.string.isRequired,
//         imgUrl: PropTypes.string.isRequired
//       })
//     })
//   })
export const getCommentsForUser = id =>
  createSelector([getUserById(id), getComments], (user, comments) => {
    return user ? pickAndSortBy(user.comments, comments) : []
  })

export const getCommentsWithCommenterForUser = id =>
  createSelector([getCommentsForUser(id), getUsers], (comments, users) => {
    return map(resolve('from', users), comments)
  })

export const getChatsForUser = id =>
  createSelector([getUserById(id), getChats], (user, chats) => {
    return user ? pickAndSortBy(user.chats, chats) : []
  })
