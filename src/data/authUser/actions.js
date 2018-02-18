import { CALL_API } from '../actions'

export const LOGIN_STARTED = 'LOGIN_STARTED'
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const AUTH_CHANGED = 'AUTH_CHANGED'

export const LOGOUT_STARTED = 'LOGOUT_STARTED'
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

// TODO Move these to sub component
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
      userId: user.uid
    }
  }
}

export function onAuthChanged(user) {
  return {
    type: AUTH_CHANGED,
    payload: {
      userId: user.uid
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
