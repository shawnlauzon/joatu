import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import firebase from 'firebase'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Hub from '../Hub'
import HubMap from '../HubMap'
import Profile from '../Profile'
import ProjectContainer from '../ProjectContainer'
import OfferContainer from '../OfferContainer'
import RequestContainer from '../RequestContainer'
import ChatContainer from '../ChatContainer'
import CreateChat from '../CreateChat'
import ShowModal from '../RequestPostalCode/ShowModal'
import RequestPostalCode from '../RequestPostalCode'

import { authenticatedUser } from '../../data/user/selectors'

import {
  hubActions,
  projectActions,
  userActions,
  authActions,
  offerActions,
  requestActions,
  commentActions,
  chatActions
} from '../../data/actions'

class Root extends React.Component {
  constructor(props) {
    super(props)

    // FIXME Hack (see below)
    this.creatingUser = false
  }

  componentDidMount() {
    // TODO We will need to somehow only load what is necessary
    this.props.dispatch(userActions.fetch())
    this.props.dispatch(hubActions.fetch())
    this.props.dispatch(projectActions.fetch())
    this.props.dispatch(offerActions.fetch())
    this.props.dispatch(requestActions.fetch())
    this.props.dispatch(commentActions.fetch())
    this.props.dispatch(chatActions.fetch())

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
          {...this.props} // TODO Remove
          authenticatedUser={this.props.authenticatedUser}
          onLogin={this.onLogin}
          onLogout={this.onLogout}
        />
        {this.props.authenticatedUser &&
          !this.props.authenticatedUser.postalCode && (
            <ShowModal>
              <RequestPostalCode />
            </ShowModal>
          )}
        <Switch>
          <Route path="/hubs/:hubId" component={Hub} />
          <Route path="/profiles/:profileId" component={Profile} />
          <Route path="/projects/:projectId" component={ProjectContainer} />
          <Route path="/offers/:offerId" component={OfferContainer} />
          <Route path="/requests/:requestId" component={RequestContainer} />
          <Route path="/chat-with/:userId" component={CreateChat} />
          <Route path="/chats/:chatId" component={ChatContainer} />
          <Route path="/" component={HubMap} />
        </Switch>
      </div>
    )
  }
}

// TODO I think I can remove most of these
function mapStateToProps(state) {
  return {
    authenticatedUser: authenticatedUser(state),
    hubs: state.hubs,
    projects: state.projects,
    offers: state.offers,
    requests: state.requests,
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(Root))
