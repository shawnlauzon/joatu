import * as R from 'ramda'

import { firebase } from './config'
import 'firebase/firestore'
import auth from './auth'

const db = firebase.firestore()
const authFunctions = auth(firebase)

const toFirestore = body => {
  const makeGeoPoint = location =>
    new firebase.firestore.GeoPoint(location.latitude, location.longitude)

  const transformations = {
    location: makeGeoPoint
  }

  return R.compose(
    R.assoc('createdAt', firebase.firestore.FieldValue.serverTimestamp()),
    R.evolve(transformations)
  )(body)
}

const getCollection = collection => {
  if (typeof collection === 'string') {
    return db.collection(collection)
  } else {
    return db
      .collection(collection.root)
      .doc(collection.ofDocument)
      .collection(collection.subcollection)
  }
}

const getStatement = ({ collection, orderBy }) => {
  let statement = getCollection(collection)
  if (orderBy) {
    statement = statement.orderBy(orderBy)
  }
  return statement
}

const getOne = ({ id, collection }) => {
  return getCollection(collection)
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) return Promise.reject('Entity not found: ' + id)
      return { [id]: doc.data() }
    })
}

const getAll = ({ collection }) => {
  const coll = {}

  return getCollection(collection)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        coll[doc.id] = doc.data()
      })
      return coll
    })
}

// {
//   id: { ...data },
//   ...
// }
export function doGet({ id, ...rest }) {
  return id ? getOne({ id, ...rest }) : getAll({ ...rest })
}

// { list: [
//     { id, ...data },
//     ...
//   ],
// }

export function doGetSorted({ collection, orderBy, merge }) {
  const payload = { list: [] }

  return getStatement({ collection, orderBy })
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let entry = { id: doc.id, ...doc.data() }
        if (merge) {
          entry = R.merge(merge, entry)
        }
        payload.list.push(entry)
      })
      return payload
    })
}

export function doAdd({ collection, data, merge = {} }) {
  return getCollection(collection)
    .add(toFirestore(data))
    .then(docRef =>
      R.merge(merge, {
        id: docRef.id,
        ...data
      })
    )
}

export function doSet({ collectionName, id, data }) {
  return getCollection(collectionName)
    .doc(id)
    .set(toFirestore(data))
    .then(docRef => ({
      id,
      ...data
    }))
}

export function doUpdate({ collectionName, id, data }) {
  return getCollection(collectionName)
    .doc(id)
    .update(toFirestore(data))
    .then(docRef => ({
      id,
      ...data
    }))
}

export function doDelete({ collectionName, id }) {
  return getCollection(collectionName)
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
          imgSrc: result.user.photoURL
        }
      })
    default:
      throw Error('Unknown provider ' + provider)
  }
}

export async function addParticipant({ projectId, userId }) {
  const project = await getCollection('projects').doc(projectId)
  const pathToUser = ['participants', userId].join('.')
  await project.update({
    [pathToUser]: entry ? entry : true
  })

  return {
    projectId,
    userId
  }
}

export async function removeParticipant({ projectId, userId }) {
  const project = await getCollection('projects').doc(projectId)
  const pathToUser = ['participants', userId].join('.')
  await project.update({
    [pathToUser]: firebase.firestore.FieldValue.delete()
  })

  return {
    projectId,
    userId
  }
}

export async function addRef(data) {
  const { collection, category, fromId, toId, withData } = data
  const path = [category, toId].join('.')

  return getCollection(collection)
    .doc(fromId)
    .update({
      [path]: withData || Date.now()
    })
    .then(() => data)
}

export async function removeRef(data) {
  const { collection, category, fromId, toId } = data
  const path = [category, toId].join('.')

  return getCollection(collection)
    .doc(fromId)
    .update({
      [path]: firebase.firestore.FieldValue.delete()
    })
    .then(() => data)
}

export function doLogout(provider) {
  return authFunctions.logUserOut()
}

export function listenForNewDocuments({ collection, where, listener }) {
  const query = getCollection(collection)
    .orderBy('createdAt')
    .startAfter(new Date()) // FIXME Doesn't work if client time is wrong

  query.onSnapshot(listener)
}

export function sendCaps({ from, to, amount }) {
  const fromUserRef = db.collection('users').doc(from)
  const toUserRef = db.collection('users').doc(to)

  return db.runTransaction(async transaction => {
    const fromUser = await transaction.get(fromUserRef)
    if (fromUser.caps < amount) {
      return Promise.reject('Insufficient funds')
    }
    const toUser = await transaction.get(toUserRef)

    const fromUserBalance = fromUser.data().caps - amount
    const toUserBalance = toUser.data().caps + amount

    transaction.update(fromUserRef, { caps: fromUserBalance })
    transaction.update(toUserRef, { caps: toUserBalance })

    return {
      from: {
        id: from,
        balance: fromUserBalance
      },
      to: {
        id: to,
        balance: toUserBalance
      }
    }
  })
}

// `where` is like [['id', '==', 'foo'], ['isApproved', '==', 'true']]
export function find({ collection, where }) {
  let query = getCollection(collection)

  where.forEach(clause => {
    query = query.where(clause[0], clause[1], clause[2])
  })

  const result = []
  return query
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        result.push(Object.assign({}, doc.data(), { id: doc.id }))
      })
    })
    .then(() => result)
}
