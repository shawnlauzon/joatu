import * as R from 'ramda'
import { createSelector } from 'reselect'

const getCommunities = state => state.communities
const getProjects = state => state.projects
const getOffers = state => state.offers
const getRequests = state => state.requests
const getHub = state => state.hub

const filterByHub = hub => item => item.community === hub.communityId

export const getHubCommunity = createSelector(
  [getHub, getCommunities],
  (hub, communities) => {
    return R.assoc('id', hub, communities[hub.communityId])
  }
)

export const getHubProjects = createSelector(
  [getHub, getProjects],
  (hub, projects) => {
    return R.filter(filterByHub(hub), projects)
  }
)

export const getHubOffers = createSelector(
  [getHub, getOffers],
  (hub, offers) => {
    return R.filter(filterByHub(hub), offers)
  }
)

export const getHubRequests = createSelector(
  [getHub, getRequests],
  (hub, requests) => {
    return R.filter(filterByHub(hub), requests)
  }
)
