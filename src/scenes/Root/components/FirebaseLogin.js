import React, { Component } from 'react'

import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

export default class FirebaseLogin extends Component {
  static propTypes = {}

  static uiConfig = {
    callbacks: {
      signInSuccess: function(currentUser, credential, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none'
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // If I don't use this, signin does not complete for some reason
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        // requireDisplayName: false
      }
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Required to enable one-tap sign-up credential helper.
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Terms of service url.
    tosUrl: 'http://alpha.joatu.org/en/tou'
  }

  componentDidMount() {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth())

    // The start method will wait until the DOM is loaded.
    // if (ui.isPendingRedirect()) {
    ui.start(this.uiNode, FirebaseLogin.uiConfig)
    // }
  }

  render() {
    return (
      <div>
        <div
          ref={ref => {
            this.uiNode = ref
          }}
        />
        <div id="loader">Loading ...</div>
      </div>
    )
  }
}
