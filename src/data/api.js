import * as R from 'ramda'

import { firebase } from './config'
import 'firebase/firestore'
import auth from './auth'

const db = firebase.firestore()
const authFunctions = auth(firebase)

const toFirestore = body => {
  const makeGeoPoint = coords =>
    new firebase.firestore.GeoPoint(coords.latitude, coords.longitude)

  const transformations = {
    coordinates: makeGeoPoint
  }

  return R.evolve(transformations, body)
}

export function doGet(collectionName) {
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
}

export function doAdd(collectionName, data) {
  return db
    .collection(collectionName)
    .add(toFirestore(data))
    .then(docRef => ({
      id: docRef.id,
      data
    }))
}

export function doSet(collectionName, id, data) {
  return db
    .collection(collectionName)
    .doc(id)
    .set(toFirestore(data))
    .then(docRef => ({
      id,
      data
    }))
}

export function doDelete(collectionName, id) {
  return db
    .collection(collectionName)
    .doc(id)
    .delete()
    .then(() => ({
      id
    }))
}

export function doLogin(provider) {
  switch (provider) {
    case 'facebook':
      return authFunctions.loginWithFacebook().then(result => {
        return {
          id: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          imgUrl: result.user.photoURL
        }
      })
    default:
      throw Error('Unknown provider ' + provider)
  }
}

export async function addParticipant(projectId, userId) {
  const pathToUser = ['participants', userId].join('.')
  const pathToProject = ['projects', projectId].join('.')

  // TODO Dispatch 2 actions rather than separate here; can then
  // be done in parallel
  const project = await db.collection('projects').doc(projectId)
  await project.update({
    [pathToUser]: true
  })
  const user = await db.collection('users').doc(userId)
  await user.update({
    [pathToProject]: true
  })

  return {
    projectId,
    userId
  }
}

export async function addRef(data) {
  const { collection, category, fromId, toId } = data
  return db
    .collection(collection)
    .doc(fromId)
    .update({
      [category]: { [toId]: true }
    })
    .then(() => data)
}

export function doLogout(provider) {
  return authFunctions.logUserOut()
}
