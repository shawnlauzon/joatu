// selectors.js
import { createSelector } from 'redux-orm'
import orm from '../orm'

const assocParticipants = project => {
  // Returns a reference to the raw object in the store,
  // so it doesn't include any reverse or m2m fields.
  const obj = project.ref
  // Object.keys(obj) === ['id', 'name']

  return Object.assign({}, obj, {
    participants: project.participants
      .toRefArray()
      .map(({ id, displayName, imgUrl }) => ({
        id,
        name: displayName,
        imgUrl
      }))
  })
}

export const allProjects = createSelector(
  orm,
  state => state.db,
  session =>
    session.Project.all()
      .toModelArray()
      .map(assocParticipants)
)

export const projectsInCommunity = createSelector(
  orm,
  state => state.db,
  state => state.selectedCommunityId,
  (session, hubId) =>
    session.Project.filter(
      project => project.community === hubId
    ).toModelArray()
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
