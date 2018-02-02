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

export default apiMiddleware
