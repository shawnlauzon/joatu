import {
  FETCH_COMMUNITIES_SUCCEEDED,
  FETCH_PROJECTS_SUCCEEDED,
  CREATE_PROJECT_SUCCEEDED
} from '../actions'

// const mockProjects = {
//   0: {
//     id: 0,
//     community: 0,
//     name: 'Clean Park',
//     location: 'SW corner of Park Laurier',
//     coordinates: {
//       lat: 45.530434,
//       lng: -73.586968
//     },
//     start: '2018-02-03T19:00:00Z',
//     duration: 150,
//     organizer: 0,
//     participants: [0, 1]
//   },
//   1: {
//     id: 1,
//     community: 0,
//     name: 'Plant Garden',
//     location: 'Square Georges-Guileault',
//     coordinates: {
//       lat: 45.529961,
//       lng: -73.592063
//     },
//     start: '2018-02-03T19:00:00Z',
//     duration: 120,
//     map_coords: 'Sir+Wilfrid+Laurier+Park/@45.5322995,-73.5897065,17z',
//     organizer: 0,
//     participants: [1]
//   }
// }
// const mockTrades = {
//   0: {
//     id: 0,
//     community: 0,
//     name: 'Ukelele Lessons',
//     seller: 1
//   },
//   1: {
//     id: 1,
//     community: 0,
//     name: 'Vegan Cookies',
//     seller: 0
//   },
//   2: {
//     id: 2,
//     community: 0,
//     name: 'Babysitting',
//     seller: 0
//   }
// }

export default function projects(state = {}, action) {
  let newState = {}
  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCEEDED:
      newState = {
        ...state,
        communities: action.payload
      }
      break

    case FETCH_PROJECTS_SUCCEEDED:
      newState = {
        ...state,
        projects: action.payload
      }
      break
    case CREATE_PROJECT_SUCCEEDED:
      newState = {
        ...state,
        projects: Object.assign({}, state.projects, action.payload)
      }
      break
    default:
      newState = state
  }

  return newState
}
