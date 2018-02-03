import firebase from './firebaseConfig'
import 'firebase/firestore'

const db = firebase.firestore()

export const CALL_API = 'CALL_API'

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API]
  if (typeof callApi === 'undefined') {
    return next(action)
  }

  const [requestStartedType, successType, failureType] = callApi.types

  next({ type: requestStartedType })

  if (callApi.collection === 'projects' && callApi.action === 'add') {
    callApi.body = {
      ...callApi.body,
      coordinates: new firebase.firestore.GeoPoint(
        body.coordinates.latitude,
        body.coordinates.longitude
      )
    }
  }

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

function doGet(collectionName) {
  const coll = {}
  return db
    .collection(collectionName)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        coll[doc.id] = doc.data()
      })
      return coll
    })
    .catch(err => {
      return err
    })
}

function doAdd(collectionName, data) {
  return db
    .collection(collectionName)
    .add(data)
    .then(docRef => ({
      // Return id: { ...data }
      [docRef.id]: data
    }))
    .catch(err => {
      return err
    })
}

function doDelete(collectionName, id) {
  return db
    .collection(collectionName)
    .doc(id)
    .delete()
    .then(() => id)
    .catch(err => {
      return err
    })
}

export default apiMiddleware
