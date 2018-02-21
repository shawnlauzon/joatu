import { createSelector } from 'reselect'

import { resolveKeys } from '../utils'

const getHubById = id => state => state.hubs[id]

const getUsers = state => state.users

export const getMembersOfHub = id =>
  createSelector([getHubById(id), getUsers], (hub, users) => {
    return hub ? resolveKeys(hub.members, users) : {}
  })
