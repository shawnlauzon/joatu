import { CALL_API } from '../actions'

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED'
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED'
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED'

export const CREATE_PROJECT_STARTED = 'CREATE_PROJECT_STARTED'
export const CREATE_PROJECT_SUCCEEDED = 'CREATE_PROJECT_SUCCEEDED'
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED'

export const ASSIGN_PROJECT_OWNER_STARTED = 'ASSIGN_PROJECT_OWNER_STARTED'
export const ASSIGN_PROJECT_OWNER_SUCCEEDED = 'ASSIGN_PROJECT_OWNER_SUCCEEDED'
export const ASSIGN_PROJECT_OWNER_FAILED = 'ASSIGN_PROJECT_OWNER_FAILED'

export const ADD_PROJECT_TO_COMMUNITY_STARTED =
  'ADD_PROJECT_TO_COMMUNITY_STARTED'
export const ADD_PROJECT_TO_COMMUNITY_SUCCEEDED =
  'ADD_PROJECT_TO_COMMUNITY_SUCCEEDED'
export const ADD_PROJECT_TO_COMMUNITY_FAILED = 'ADD_PROJECT_TO_COMMUNITY_FAILED'

export const UPDATE_PROJECT_STARTED = 'UPDATE_PROJECT_STARTED'
export const UPDATE_PROJECT_SUCCEEDED = 'UPDATE_PROJECT_SUCCEEDED'
export const UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED'

export const DELETE_PROJECT_STARTED = 'DELETE_PROJECT_STARTED'
export const DELETE_PROJECT_SUCCEEDED = 'DELETE_PROJECT_SUCCEEDED'
export const DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED'

export const UNASSIGN_PROJECT_OWNER_STARTED = 'UNASSIGN_PROJECT_OWNER_STARTED'
export const UNASSIGN_PROJECT_OWNER_SUCCEEDED =
  'UNASSIGN_PROJECT_OWNER_SUCCEEDED'
export const UNASSIGN_PROJECT_OWNER_FAILED = 'UNASSIGN_PROJECT_OWNER_FAILED'

export const REMOVE_PROJECT_FROM_COMMUNITY_STARTED =
  'REMOVE_PROJECT_FROM_COMMUNITY_STARTED'
export const REMOVE_PROJECT_FROM_COMMUNITY_SUCCEEDED =
  'REMOVE_PROJECT_FROM_COMMUNITY_SUCCEEDED'
export const REMOVE_PROJECT_FROM_COMMUNITY_FAILED =
  'REMOVE_PROJECT_FROM_COMMUNITY_FAILED'

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

const doAssignProjectOwner = (projectId, ownerId) => ({
  [CALL_API]: {
    types: [
      ASSIGN_PROJECT_OWNER_STARTED,
      ASSIGN_PROJECT_OWNER_SUCCEEDED,
      ASSIGN_PROJECT_OWNER_FAILED
    ],
    collection: 'users',
    action: 'addRef',
    category: 'ownedProjects',
    fromId: ownerId,
    toId: projectId
  }
})

const doAddNewProjectToHub = (projectId, hubId) => ({
  [CALL_API]: {
    types: [
      ADD_PROJECT_TO_COMMUNITY_STARTED,
      ADD_PROJECT_TO_COMMUNITY_SUCCEEDED,
      ADD_PROJECT_TO_COMMUNITY_FAILED
    ],
    collection: 'hubs',
    action: 'addRef',
    category: 'projects',
    fromId: hubId,
    toId: projectId
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateProject(body)).then(result =>
    Promise.all([
      dispatch(
        doAssignProjectOwner(result.payload.id, result.payload.data.owner)
      ),
      dispatch(doAddNewProjectToHub(result.payload.id, result.payload.data.hub))
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

const doRemoveProjectFromUser = (projectId, ownerId) => ({
  [CALL_API]: {
    types: [
      UNASSIGN_PROJECT_OWNER_STARTED,
      UNASSIGN_PROJECT_OWNER_SUCCEEDED,
      UNASSIGN_PROJECT_OWNER_FAILED
    ],
    collection: 'users',
    action: 'removeRef',
    category: 'projects',
    fromId: ownerId,
    toId: projectId
  }
})

const doRemoveProjectFromHub = (projectId, ownerId) => ({
  [CALL_API]: {
    types: [
      REMOVE_PROJECT_FROM_COMMUNITY_STARTED,
      REMOVE_PROJECT_FROM_COMMUNITY_SUCCEEDED,
      REMOVE_PROJECT_FROM_COMMUNITY_FAILED
    ],
    collection: 'hubs',
    action: 'removeRef',
    category: 'projects',
    fromId: ownerId,
    toId: projectId
  }
})

export const remove = id => (dispatch, getState) => {
  const project = getState().projects[id]
  return Promise.all([
    dispatch(doDeleteProject(id)),
    dispatch(doRemoveProjectFromUser(id, project.owner)),
    dispatch(doRemoveProjectFromHub(id, project.hub))
  ])
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
