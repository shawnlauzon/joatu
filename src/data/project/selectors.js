import * as R from 'ramda'

import { createSelector } from 'redux-orm'
import orm from '../orm'

import { refArrayLens, inflateUser } from '../utils'

const resolveParticipants = R.over(
  refArrayLens('participants'),
  R.map(inflateUser)
)

export const allProjects = createSelector(
  orm,
  state => state.db,
  session =>
    session.Project.all()
      .toModelArray()
      .map(resolveParticipants)
)

export const projectsInHub = createSelector(
  orm,
  state => state.db,
  state => state.selectedHubId,
  (session, hubId) =>
    session.Project.filter(project => project.hub === hubId).toModelArray()
)

export const projectWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session =>
      session.Project.hasId(id)
        ? resolveParticipants(session.Project.withId(id))
        : undefined
  )

// Will result in something like this when run:
// [
//   {
//     id: 'Evh5FhYWl6PdbrdCcNdk',
//     name: 'Clean the park',
//     participants: [ { id: 'abc123', name: 'Shawn Lauzon', imgUrl: 'http://fb.com/abc123' } ],
//   },
//   ...
// ]
