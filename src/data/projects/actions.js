import { CALL_API } from '../actions'

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

const doFetchProjects = () => ({
  [CALL_API]: {
    types: [
      FETCH_PROJECTS_STARTED,
      FETCH_PROJECTS_SUCCEEDED,
      FETCH_PROJECTS_FAILED
    ],
    collection: 'projects'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchProjects())
}

const doCreateProject = body => ({
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
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateProject(body))
}

const doUpdateProject = (id, body) => ({
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
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateProject(id, body))
}

const doDeleteProject = id => ({
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
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteProject(id))
}
