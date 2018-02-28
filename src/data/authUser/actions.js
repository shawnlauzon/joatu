import { CALL_API } from '../actions'
import {
  fetchOne as fetchUser,
  create as createUser,
  FETCH_USER_FAILED
} from '../user/actions'

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

const authChangedAction = user => ({
  type: AUTH_CHANGED,
  payload: {
    userId: user ? user.uid : undefined
  }
})

const createUserIfDoesNotExist = async (authUser, dispatch, getState) => {
  // For some reason it crashes if I import a selector in this class crashes
  // So hit the store directly
  if (!getState().db.User.itemsById[authUser.uid]) {
    // If it's not in the store, we might not have fetched it yet
    const result = await dispatch(fetchUser(authUser.uid))
    if (result.type === FETCH_USER_FAILED) {
      const newUser = {
        id: authUser.uid,
        email: authUser.email
      }
      if (authUser.displayName) {
        newUser.displayName = authUser.displayName
      }
      if (authUser.photoURL) {
        newUser.imgSrc = authUser.photoURL
      }
      return await dispatch(createUser(newUser))
    }
  }
}

export const onAuthChanged = authUser => async (dispatch, getState) => {
  if (authUser && authUser.uid) {
    await createUserIfDoesNotExist(authUser, dispatch, getState)
  }

  return dispatch(authChangedAction(authUser))
}

export function logoutUser() {
  return {
    [CALL_API]: {
      types: [LOGOUT_STARTED, LOGOUT_SUCCEEDED, LOGOUT_FAILED],
      action: 'logout'
    }
  }
}
