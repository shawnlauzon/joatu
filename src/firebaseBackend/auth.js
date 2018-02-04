import { firebase } from './core'

const facebook = new firebase.auth.FacebookAuthProvider()
facebook.addScope('email')

export function logUserOut() {
  return firebase.auth().signOut()
}

export function login() {
  return firebase.auth().signInWithPopup(facebook)
}

export function getFirebaseUser() {
  return new Promise(resolve =>
    firebase.auth().onAuthStateChanged(user => resolve(user))
  )
}

export function getFirebaseToken() {
  const currentUser = firebase.auth().currentUser
  if (!currentUser) {
    return Promise.resolve(null)
  }
  return currentUser.getIdToken(true)
}
