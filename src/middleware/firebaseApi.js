import { CALL_API } from '../data/actions'

import {
  doGet,
  doGetSorted,
  doSet,
  doAdd,
  doDelete,
  // These should be embedded
  doLogin,
  doLogout,
  addParticipant,
  addRef,
  removeRef
} from '../data/api'

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API]
  if (typeof callApi === 'undefined') {
    return next(action)
  }

  const [requestStartedType, successType, failureType] = callApi.types

  next({ type: requestStartedType })

  const handleResponse = response => {
    return next({
      type: successType,
      payload: response
    })
  }

  const handleError = err => {
    console.log('Error calling API', err)
    return next({
      type: failureType,
      error: err.message
    })
  }

  // TODO Just pass the entire callApi to each of them, and replace with
  // something like R.call
  if (callApi.action === 'add') {
    return doAdd(callApi.collection, callApi.body, callApi.merge)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'set') {
    return doSet(callApi.collection, callApi.id, callApi.body)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'delete') {
    return doDelete(callApi.collection, callApi.id)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'login') {
    return doLogin(callApi.provider)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'logout') {
    return doLogout()
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'addParticipant') {
    return addParticipant(callApi.projectId, callApi.userId)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'addRef') {
    return addRef(callApi)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'removeRef') {
    return removeRef(callApi)
      .then(handleResponse)
      .catch(handleError)
  } else if (callApi.action === 'getSorted') {
    return doGetSorted(callApi)
      .then(handleResponse)
      .catch(handleError)
  } else {
    return doGet(callApi)
      .then(handleResponse)
      .catch(handleError)
  }
}

export default apiMiddleware
