const auth = firebase => {
  const facebook = new firebase.auth.FacebookAuthProvider()
  facebook.addScope('email')

  function logUserOut() {
    return firebase.auth().signOut()
  }

  function loginWithFacebook() {
    return firebase.auth().signInWithPopup(facebook)
  }

  function getFirebaseUser() {
    return new Promise(resolve =>
      firebase.auth().onAuthStateChanged(user => resolve(user))
    )
  }

  function getFirebaseToken() {
    const currentUser = firebase.auth().currentUser
    if (!currentUser) {
      return Promise.resolve(null)
    }
    return currentUser.getIdToken(true)
  }

  return { loginWithFacebook, logUserOut, getFirebaseUser, getFirebaseToken }
}

export default auth
