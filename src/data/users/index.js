import { createSelector } from 'reselect'

import { resolveKeys } from '../../utils'

const getUserById = id => state => state.users[id]

const getProjects = state => state.projects
const getOffers = state => state.offers
const getRequests = state => state.requests

export const getProjectsForUser = id =>
  createSelector([getUserById(id), getProjects], (user, projects) => {
    return user ? resolveKeys(user.projects, projects) : {}
  })

export const getRequestsForUser = id =>
  createSelector([getUserById(id), getRequests], (user, requests) => {
    return user ? resolveKeys(user.requests, requests) : {}
  })

export const getOffersForUser = id =>
  createSelector([getUserById(id), getOffers], (user, offers) => {
    return user ? resolveKeys(user.offers, offers) : {}
  })
