// selectors.js
import { createSelector } from 'redux-orm'
import orm from '../orm'

const dbStateSelector = state => state.db

export const allProjectsSelector = createSelector(
  orm,
  // The first input selector should always select the db-state.
  // Behind the scenes, `createSelector` begins a Redux-ORM session
  // with the value returned by `dbStateSelector` and passes
  // that Session instance as an argument instead.
  dbStateSelector,
  session => {
    return session.Project.all()
      .toModelArray()
      .map(project => {
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
      })
  }
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
