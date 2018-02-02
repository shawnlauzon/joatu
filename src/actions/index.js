import * as api from '../api'

let _id = 3
export function uniqueId() {
  return _id++
}

export function fetchCommunities() {
  return dispatch => {
    api.fetchCommunities().then(resp => {
      dispatch(fetchCommunitiesSucceeded(resp))
    })
  }
}

export function fetchCommunitiesSucceeded(communities) {
  return {
    type: 'FETCH_COMMUNITIES_SUCCEEDED',
    payload: {
      communities
    }
  }
}

export function fetchProjects() {
  return dispatch => {
    api.fetchProjects().then(resp => {
      dispatch(fetchProjectsSucceeded(resp))
    })
  }
}

export function fetchProjectsSucceeded(projects) {
  return {
    type: 'FETCH_PROJECTS_SUCCEEDED',
    payload: {
      projects
    }
  }
}

export function createProject({ name, location, dateTime, duration }) {
  return {
    type: 'CREATE_PROJECT',
    payload: {
      id: uniqueId(),
      name,
      location,
      dateTime,
      duration
    }
  }
}
