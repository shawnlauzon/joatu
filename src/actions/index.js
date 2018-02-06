import { CALL_API } from '../data/api'

// TODO Before adding CRUD operations for Offers and Requests, use
// redux-actions to clean things up

export const FETCH_COMMUNITIES_STARTED = 'FETCH_COMMUNITIES_STARTED'
export const FETCH_COMMUNITIES_SUCCEEDED = 'FETCH_COMMUNITIES_SUCCEEDED'
export const FETCH_COMMUNITIES_FAILED = 'FETCH_COMMUNITIES_FAILED'

export const FETCH_USERS_STARTED = 'FETCH_USERS_STARTED'
export const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

export const CREATE_USER_STARTED = 'CREATE_USER_STARTED'
export const CREATE_USER_SUCCEEDED = 'CREATE_USER_SUCCEEDED'
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED'

export const LOGIN_STARTED = 'LOGIN_STARTED'
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const AUTH_CHANGED = 'AUTH_CHANGED'

export const LOGOUT_STARTED = 'LOGOUT_STARTED'
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const ADD_PARTICIPANT_STARTED = 'ADD_PARTICIPANT_STARTED'
export const ADD_PARTICIPANT_SUCCEEDED = 'ADD_PARTICIPANT_SUCCEEDED'
export const ADD_PARTICIPANT_FAILED = 'ADD_PARTICIPANT_FAILED'

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

export function fetchUsers() {
  return {
    [CALL_API]: {
      types: [FETCH_USERS_STARTED, FETCH_USERS_SUCCEEDED, FETCH_USERS_FAILED],
      collection: 'users'
    }
  }
}

export function createUser(user) {
  return {
    [CALL_API]: {
      types: [CREATE_USER_STARTED, CREATE_USER_SUCCEEDED, CREATE_USER_FAILED],
      collection: 'users',
      action: 'set',
      id: user.uid || user.id,
      body: {
        displayName: user.displayName,
        email: user.email,
        imgUrl: user.photoURL || user.imgUrl
      }
    }
  }
}

export function loginUser(provider) {
  return {
    [CALL_API]: {
      types: [LOGIN_STARTED, LOGIN_SUCCEEDED, LOGIN_FAILED],
      action: 'login',
      provider
    }
  }
}

export function onLoginSuccess(user) {
  return {
    type: LOGIN_SUCCEEDED,
    payload: {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      imgUrl: user.photoURL
    }
  }
}

export function onAuthChanged(user) {
  return {
    type: AUTH_CHANGED,
    payload: {
      id: user && user.uid,
      displayName: user && user.displayName,
      email: user && user.email,
      imgUrl: user && user.photoURL
    }
  }
}

export function logoutUser() {
  return {
    [CALL_API]: {
      types: [LOGOUT_STARTED, LOGOUT_SUCCEEDED, LOGOUT_FAILED],
      action: 'logout'
    }
  }
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
