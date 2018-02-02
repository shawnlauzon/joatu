import { CALL_API } from '../middleware/firebaseApi'

export const FETCH_COMMUNITIES_STARTED = 'FETCH_COMMUNITIES_STARTED'
export const FETCH_COMMUNITIES_SUCCEEDED = 'FETCH_COMMUNITIES_SUCCEEDED'
export const FETCH_COMMUNITIES_FAILED = 'FETCH_COMMUNITIES_FAILED'

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED'
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED'
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED'

export const CREATE_PROJECT_STARTED = 'CREATE_PROJECT_STARTED'
export const CREATE_PROJECT_SUCCEEDED = 'CREATE_PROJECT_SUCCEEDED'
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED'

let _id = 3
export function uniqueId() {
  return _id++
}

export function fetchCommunities() {
  return {
    [CALL_API]: {
      types: [
        FETCH_COMMUNITIES_STARTED,
        FETCH_COMMUNITIES_SUCCEEDED,
        FETCH_COMMUNITIES_FAILED
      ],
      collection: 'communities'
    }
  }
}

export function fetchProjects() {
  return {
    [CALL_API]: {
      types: [
        FETCH_PROJECTS_STARTED,
        FETCH_PROJECTS_SUCCEEDED,
        FETCH_PROJECTS_FAILED
      ],
      collection: 'projects'
    }
  }
}

export function createProject(body) {
  return {
    [CALL_API]: {
      types: [
        CREATE_PROJECT_STARTED,
        CREATE_PROJECT_SUCCEEDED,
        CREATE_PROJECT_FAILED
      ],
      collection: 'projects',
      action: 'add',
      body
    }
  }
}
