import { CALL_API } from '../api'

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED'
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED'
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED'

export const CREATE_PROJECT_STARTED = 'CREATE_PROJECT_STARTED'
export const CREATE_PROJECT_SUCCEEDED = 'CREATE_PROJECT_SUCCEEDED'
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED'

export const UPDATE_PROJECT_STARTED = 'UPDATE_PROJECT_STARTED'
export const UPDATE_PROJECT_SUCCEEDED = 'UPDATE_PROJECT_SUCCEEDED'
export const UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED'

export const DELETE_PROJECT_STARTED = 'DELETE_PROJECT_STARTED'
export const DELETE_PROJECT_SUCCEEDED = 'DELETE_PROJECT_SUCCEEDED'
export const DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED'

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

export function updateProject(id, body) {
  return {
    [CALL_API]: {
      types: [
        UPDATE_PROJECT_STARTED,
        UPDATE_PROJECT_SUCCEEDED,
        UPDATE_PROJECT_FAILED
      ],
      collection: 'projects',
      action: 'update',
      id,
      body
    }
  }
}

export function deleteProject(id) {
  return {
    [CALL_API]: {
      types: [
        DELETE_PROJECT_STARTED,
        DELETE_PROJECT_SUCCEEDED,
        DELETE_PROJECT_FAILED
      ],
      collection: 'projects',
      action: 'delete',
      id
    }
  }
}
