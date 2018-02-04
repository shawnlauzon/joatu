import { CALL_API } from '../middleware/firebaseApi'

export const FETCH_COMMUNITIES_STARTED = 'FETCH_COMMUNITIES_STARTED'
export const FETCH_COMMUNITIES_SUCCEEDED = 'FETCH_COMMUNITIES_SUCCEEDED'
export const FETCH_COMMUNITIES_FAILED = 'FETCH_COMMUNITIES_FAILED'

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED'
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED'
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED'

export const FETCH_USERS_STARTED = 'FETCH_USERS_STARTED'
export const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

export const CREATE_USER_STARTED = 'CREATE_USER_STARTED'
export const CREATE_USER_SUCCEEDED = 'CREATE_USER_SUCCEEDED'
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED'

export const CREATE_PROJECT_STARTED = 'CREATE_PROJECT_STARTED'
export const CREATE_PROJECT_SUCCEEDED = 'CREATE_PROJECT_SUCCEEDED'
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED'

export const DELETE_PROJECT_STARTED = 'DELETE_PROJECT_STARTED'
export const DELETE_PROJECT_SUCCEEDED = 'DELETE_PROJECT_SUCCEEDED'
export const DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

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

export function fetchUsers() {
  return {
    [CALL_API]: {
      types: [FETCH_USERS_STARTED, FETCH_USERS_SUCCEEDED, FETCH_USERS_FAILED],
      collection: 'users'
    }
  }
}

export function createUser(body) {
  return {
    [CALL_API]: {
      types: [CREATE_USER_STARTED, CREATE_USER_SUCCEEDED, CREATE_USER_FAILED],
      collection: 'users',
      action: 'add',
      body
    }
  }
}

export function loginUser(body) {
  return {
    type: LOGIN_USER,
    payload: body
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
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
