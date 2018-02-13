import { CALL_API } from '../actions'

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED'
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED'
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED'

export const CREATE_PROJECT_STARTED = 'CREATE_PROJECT_STARTED'
export const CREATE_PROJECT_SUCCEEDED = 'CREATE_PROJECT_SUCCEEDED'
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED'

export const ADD_NEW_PROJECT_TO_USER_STARTED = 'ADD_NEW_PROJECT_TO_USER_STARTED'
export const ADD_NEW_PROJECT_TO_USER_SUCCEEDED =
  'ADD_NEW_PROJECT_TO_USER_SUCCEEDED'
export const ADD_NEW_PROJECT_TO_USER_FAILED = 'ADD_NEW_PROJECT_TO_USER_FAILED'

export const ADD_NEW_PROJECT_TO_COMMUNITY_STARTED =
  'ADD_NEW_PROJECT_TO_COMMUNITY_STARTED'
export const ADD_NEW_PROJECT_TO_COMMUNITY_SUCCEEDED =
  'ADD_NEW_PROJECT_TO_COMMUNITY_SUCCEEDED'
export const ADD_NEW_PROJECT_TO_COMMUNITY_FAILED =
  'ADD_NEW_PROJECT_TO_COMMUNITY_FAILED'

export const UPDATE_PROJECT_STARTED = 'UPDATE_PROJECT_STARTED'
export const UPDATE_PROJECT_SUCCEEDED = 'UPDATE_PROJECT_SUCCEEDED'
export const UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED'

export const DELETE_PROJECT_STARTED = 'DELETE_PROJECT_STARTED'
export const DELETE_PROJECT_SUCCEEDED = 'DELETE_PROJECT_SUCCEEDED'
export const DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED'

export const ADD_PARTICIPANT_STARTED = 'ADD_PARTICIPANT_STARTED'
export const ADD_PARTICIPANT_SUCCEEDED = 'ADD_PARTICIPANT_SUCCEEDED'
export const ADD_PARTICIPANT_FAILED = 'ADD_PARTICIPANT_FAILED'

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

const doAddNewProjectToUser = (projectId, ownerId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_PROJECT_TO_USER_STARTED,
      ADD_NEW_PROJECT_TO_USER_SUCCEEDED,
      ADD_NEW_PROJECT_TO_USER_FAILED
    ],
    collection: 'users',
    action: 'addRef',
    category: 'ownedProjects',
    fromId: ownerId,
    toId: projectId
  }
})

const doAddNewProjectToCommunity = (projectId, communityId) => ({
  [CALL_API]: {
    types: [
      ADD_NEW_PROJECT_TO_COMMUNITY_STARTED,
      ADD_NEW_PROJECT_TO_COMMUNITY_SUCCEEDED,
      ADD_NEW_PROJECT_TO_COMMUNITY_FAILED
    ],
    collection: 'communities',
    action: 'addRef',
    category: 'projects',
    fromId: communityId,
    toId: projectId
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateProject(body)).then(result =>
    Promise.all([
      dispatch(
        doAddNewProjectToUser(result.payload.id, result.payload.data.owner)
      ),
      dispatch(
        doAddNewProjectToCommunity(
          result.payload.id,
          result.payload.data.community
        )
      )
    ])
  )
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

export function addParticipant(userId, projectId) {
  return {
    [CALL_API]: {
      types: [
        ADD_PARTICIPANT_STARTED,
        ADD_PARTICIPANT_SUCCEEDED,
        ADD_PARTICIPANT_FAILED
      ],
      action: 'addParticipant',
      userId,
      projectId
    }
  }
}
