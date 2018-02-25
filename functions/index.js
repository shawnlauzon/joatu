const R = require('ramda')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const minIndex = require('./minIndex')

admin.initializeApp(functions.config().firebase)

const MAPBOX_TOKEN = functions.config().mapbox.token
const TRANSCODE_URL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/$postalcode.json?country=CA&types=postcode&access_token=' +
  MAPBOX_TOKEN
const CLOSEST_HUB_URL =
  'https://api.mapbox.com/directions-matrix/v1/mapbox/walking/$curLngLat;$hubLngLats.json?sources=0&destinations=all&access_token=' +
  MAPBOX_TOKEN

const replace = (key, val, str) => str.replace('$' + key, val)

// Returns a list of DocumentReferences
const getHubs = () => {
  return admin
    .firestore()
    .collection('hubs')
    .get()
    .then(querySnapshot => querySnapshot.docs)
    .then(queryDocumentSnapshots =>
      queryDocumentSnapshots.map(snap => snap.ref)
    )
}

const transcodePostalCode = postalCode => {
  const transcodeUrl = TRANSCODE_URL.replace('$postalcode', postalCode)

  return fetch(transcodeUrl)
    .then(res => res.json())
    .then(json => json.features[0].center)
}

const findClosestHubId = (hubDocumentRefs, curLngLat) => {
  const ofList = R.unapply(R.identity)
  const getLngLat = R.pipe(
    ofList,
    R.ap([R.prop('longitude'), R.prop('latitude')])
  )

  return Promise.all(hubDocumentRefs.map(R.invoker(0, 'get')))
    .then(R.map(R.invoker(1, 'get')('location')))
    .then(R.map(getLngLat))
    .then(R.map(R.join(',')))
    .then(R.join(';'))
    .then(hubLngLats => {
      const closestHubUrl = CLOSEST_HUB_URL.replace(
        '$curLngLat',
        curLngLat
      ).replace('$hubLngLats', hubLngLats)

      return fetch(closestHubUrl)
    })
    .then(res => res.json())
    .then(json => {
      // format is { durations: [ [ 0, 1343.4, 1948.1, 811.6, 2088.4 ] ]
      // make sure to remove the '0' which is distance to self
      return minIndex(json.durations[0].slice(1))
    })
    .then(R.flip(R.nth)(hubDocumentRefs))
    .then(R.prop('id'))
}

exports.findHomeHub = functions.firestore
  .document('users/{userId}')
  .onWrite(event => {
    const user = event.data.data()

    if (!user.postalCode || user.homeHub) {
      return Promise.resolve()
    }

    return Promise.all([getHubs(), transcodePostalCode(user.postalCode)])
      .then(([hubs, lngLat]) => findClosestHubId(hubs, lngLat))
      .then(closestHubId => {
        console.log(
          `Setting home hub for user ${event.params.userId} to ${closestHubId}`
        )
        return closestHubId
      })
      .then(closestHubId =>
        event.data.ref.update({
          homeHub: closestHubId
        })
      )
      .catch(err => {
        return Promise.reject(err)
      })
  })
