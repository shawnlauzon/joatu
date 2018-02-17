import { createSelector } from 'reselect'

import { resolveKeys } from '../utils'

const getCommunityById = id => state => state.communities[id]

const getUsers = state => state.users

export const getMembersOfCommunity = id =>
  createSelector([getCommunityById(id), getUsers], (community, users) => {
    return community ? resolveKeys(community.members, users) : {}
  })
