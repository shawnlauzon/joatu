import { firebase } from './config'
import 'firebase/firestore'
import auth from './auth'

export const CALL_API = 'CALL_API'

const db = firebase.firestore()
const authFunctions = auth(firebase)

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
    .add(data)
    .then(docRef => ({
      // Return id: { ...data }
      [docRef.id]: data
    }))
}

export function doSet(collectionName, id, data) {
  return db
    .collection(collectionName)
    .doc(id)
    .set(data)
    .then(docRef => ({
      [id]: data
    }))
}

export function doDelete(collectionName, id) {
  return db
    .collection(collectionName)
    .doc(id)
    .delete()
    .then(() => id)
}

export function doLogin(provider) {
  switch (provider) {
    case 'facebook':
      return authFunctions.loginWithFacebook().then(result => {
        console.log(result)
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

export function doLogout(provider) {
  return authFunctions.logUserOut()
}
