import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import firebase from 'firebase'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Community from '../Community'
import CommunityMap from '../CommunityMap'
import Profile from '../Profile'
import ProjectContainer from '../ProjectContainer'
import OfferContainer from '../OfferContainer'
import RequestContainer from '../RequestContainer'

import {
  communityActions,
  projectActions,
  userActions,
  authActions,
  offerActions,
  requestActions,
  commentActions
} from '../../data/actions'

class Root extends React.Component {
  constructor(props) {
    super(props)

    // FIXME Hack (see below)
    this.creatingUser = false
  }

  componentDidMount() {
    this.props.dispatch(userActions.fetch())
    this.props.dispatch(communityActions.fetch())
    this.props.dispatch(projectActions.fetch())
    this.props.dispatch(offerActions.fetch())
    this.props.dispatch(requestActions.fetch())
    this.props.dispatch(commentActions.fetch())

    firebase.auth().onAuthStateChanged(user => {
      this.props.dispatch(authActions.onAuthChanged(user))
    })
  }

  // FIXME This works unless the user is deleted from the backend without
  // reloading the app, then the user doesn't get created because of the flag
  // Still, this should be improved. Ideally after LOGIN_SUCCEEDED, the user
  // should be created if it doesn't yet exist.
  componentWillReceiveProps(nextProps) {
    // If the user doesn't yet exist, create it
    if (
      !this.creatingUser &&
      nextProps.user &&
      nextProps.user.authenticated &&
      !R.isEmpty(nextProps.users) &&
      !nextProps.users[nextProps.user.id]
    ) {
      this.props.dispatch(userActions.create(nextProps.user))
      // Note that this is never set to false unless app is reloaded. But if we
      // don't have this flag, an infinite loop occurs
      this.creatingUser = true
    }
  }

  onLogin = provider => {
    this.props.dispatch(authActions.loginUser(provider))
  }

  onLogout = () => {
    this.props.dispatch(authActions.logoutUser())
  }

  render() {
    return (
      <div>
        <Reboot />
        <JoatUAppBar
          {...this.props}
          onLogin={this.onLogin}
          onLogout={this.onLogout}
        />
        <Switch>
          <Route path="/communities/:communityId" component={Community} />
          <Route path="/profiles/:profileId" component={Profile} />
          <Route path="/projects/:projectId" component={ProjectContainer} />
          <Route path="/offers/:offerId" component={OfferContainer} />
          <Route path="/requests/:requestId" component={RequestContainer} />
          <Route path="/" component={CommunityMap} />
        </Switch>
      </div>
    )
  }
}

// TODO I think I can remove most of these
function mapStateToProps(state) {
  return {
    authUser: state.authUser,
    communities: state.communities,
    projects: state.projects,
    offers: state.offers,
    requests: state.requests,
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(Root))
