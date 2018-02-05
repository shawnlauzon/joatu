import firebase from './config'
import 'firebase/firestore'
import auth from './auth'

export const CALL_API = 'CALL_API'

const db = firebase.firestore()
const authFunctions = auth(firebase)

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
        callApi.body.coordinates.latitude,
        callApi.body.coordinates.longitude
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

function doSet(collectionName, id, data) {
  return db
    .collection(collectionName)
    .doc(id)
    .set(data)
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

function doLogin(provider) {
  switch (provider) {
    case 'facebook':
      return authFunctions
        .loginWithFacebook()
        .then(result => {
          //     const splitName = user.displayName.split(' ')
          //     // TODO create user if doesn't exist
          //     this.props.dispatch(
          //       loginUser({
          //         email: user.email,
          //         name: {
          //           first: splitName[0],
          //           last: splitName.slice(1).join(' ')
          //         },
          return {
            displayName: result.user.displayName,
            email: result.user.email,
            imgUrl: result.user.photoURL
          }
        })
        .catch(err => {
          console.err(err)
          return err
        })
    default:
      throw Error('Unknown provider ' + provider)
  }
}

function doLogout(provider) {
  return authFunctions.logUserOut().catch(err => {
    console.err(err)
    return err
  })
}

export { firebase, apiMiddleware }
