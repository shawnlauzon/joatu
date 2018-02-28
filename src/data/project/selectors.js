import * as R from 'ramda'

import { createSelector } from 'redux-orm'
import orm from '../orm'

import { refArrayLens, inflateUser, inflateHub } from '../utils'

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
    session.Project.filter(R.propEq('hub', hubId))
      .toModelArray()
      .map(project =>
        Object.assign({}, project.ref, {
          hub: inflateHub(project.hub)
        })
      )
)

export const projectWithId = id =>
  createSelector(
    orm,
    state => state.db,
    session => {
      if (session.Project.hasId(id)) {
        const project = session.Project.withId(id)
        return Object.assign({}, project.ref, {
          hub: inflateHub(project.hub),
          owner: inflateUser(project.owner),
          participants: project.participants.toRefArray().map(inflateUser)
        })
      }
    }
  )

// Will result in something like this when run:
// [
//   {
//     id: 'Evh5FhYWl6PdbrdCcNdk',
//     name: 'Clean the park',
//     participants: [ { id: 'abc123', name: 'Shawn Lauzon', imgSrc: 'http://fb.com/abc123' } ],
//   },
//   ...
// ]
