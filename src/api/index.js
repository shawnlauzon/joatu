import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore()

export function fetchCommunities() {
  return fetchFromFirebase('communities')
}

export function fetchProjects() {
  return fetchFromFirebase('projects')
}

function fetchFromFirebase(collectionName) {
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
