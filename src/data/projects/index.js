import { createSelector } from 'reselect'

import { resolveKeys } from '../utils'

const getProjectById = id => state => state.projects[id]

const getUsers = state => state.users

export const getParticipantsInProject = id =>
  createSelector([getProjectById(id), getUsers], (project, users) => {
    return project ? resolveKeys(project.participants, users) : {}
  })
