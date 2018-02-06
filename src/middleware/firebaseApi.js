import {
  CALL_API,
  doGet,
  doSet,
  doAdd,
  doDelete,
  // These should be embedded
  doLogin,
  doLogout,
  addParticipant
} from '../data/api'

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API]
  if (typeof callApi === 'undefined') {
    return next(action)
  }

  const [requestStartedType, successType, failureType] = callApi.types

  next({ type: requestStartedType })

  // FIXME I think this should be in a selector
  // if (callApi.collection === 'projects' && callApi.action === 'add') {
  //   callApi.body = {
  //     ...callApi.body,
  //     coordinates: new firebase.firestore.GeoPoint(
  //       callApi.body.coordinates.latitude,
  //       callApi.body.coordinates.longitude
  //     )
  //   }
  // }

  if (callApi.action === 'add') {
    return doAdd(callApi.collection, callApi.body).then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  } else if (callApi.action === 'set') {
    return doSet(callApi.collection, callApi.id, callApi.body).then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  } else if (callApi.action === 'delete') {
    return doDelete(callApi.collection, callApi.id).then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  } else if (callApi.action === 'login') {
    return doLogin(callApi.provider).then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  } else if (callApi.action === 'logout') {
    return doLogout().then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  } else if (callApi.action === 'addParticipant') {
    return addParticipant(callApi.projectId, callApi.userId).then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  } else {
    return doGet(callApi.collection).then(
      response =>
        next({
          type: successType,
          payload: response
        }),
      error =>
        next({
          type: failureType,
          error: error.message
        })
    )
  }
}

export default apiMiddleware
