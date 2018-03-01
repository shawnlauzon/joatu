import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import firebase from 'firebase'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Hub from '../Hub'
import HubMap from '../HubMap'
import Profile from '../Profile'
import Project from '../Project'
import OfferContainer from '../OfferContainer'
import RequestContainer from '../RequestContainer'
import ChatContainer from '../ChatContainer'
import CreateChat from '../CreateChat'
import ShowModal from '../../components/ShowModal'
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
  // TODO Load these when they are needed, not at the beginning
  // TODO Only load the entities that this user needs
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchHubs()
    this.props.fetchProjects()
    this.props.fetchOffers()
    this.props.fetchRequests()
    this.props.fetchComments()
    this.props.fetchChats()

    firebase.auth().onAuthStateChanged(this.props.onAuthChanged)
  }

  render() {
    return (
      <div>
        <Reboot />
        <JoatUAppBar
          {...this.props} // TODO Remove
          authenticatedUser={this.props.authenticatedUser}
          onLogin={provider => this.props.loginUser(provider)}
          onLogout={() => this.props.logoutUser()}
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
          <Route path="/projects/:projectId" component={Project} />
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

function mapStateToProps(state) {
  return {
    authenticatedUser: authenticatedUser(state)
  }
}

const mapDispatchToProps = {
  fetchUsers: userActions.fetch,
  fetchHubs: hubActions.fetch,
  fetchProjects: projectActions.fetch,
  fetchOffers: offerActions.fetch,
  fetchRequests: requestActions.fetch,
  fetchComments: commentActions.fetch,
  fetchChats: chatActions.fetch,

  onAuthChanged: authActions.onAuthChanged,
  createUser: userActions.create,

  loginUser: authActions.loginUser,
  logoutUser: authActions.logoutUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
