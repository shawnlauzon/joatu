import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import firebase from 'firebase'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Community from '../Community'

import {
  communityActions,
  projectActions,
  userActions,
  authActions,
  addParticipant,
  offerActions,
  requestActions
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

  onJoinProject = projectId => {
    this.props.dispatch(addParticipant(this.props.authenticated.id, projectId))
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
        {this.props.communities &&
          Object.entries(this.props.communities).map(([id, community]) => (
            <Community
              key={id}
              id={id}
              community={R.assoc('id', id, community)}
              name={community.name}
              onCreateProject={body =>
                this.props.dispatch(projectActions.create(body))
              }
              onDeleteProject={id =>
                this.props.dispatch(projectActions.remove(id))
              }
              onCreateRequest={body =>
                this.props.dispatch(requestActions.create(body))
              }
              onDeleteRequest={id =>
                this.props.dispatch(requestActions.remove(id))
              }
              onCreateOffer={body =>
                this.props.dispatch(offerActions.create(body))
              }
              onDeleteOffer={id => this.props.dispatch(offerActions.remove(id))}
              onJoinProject={this.onJoinProject}
            />
          ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    communities: state.communities,
    projects: state.projects,
    offers: state.offers,
    requests: state.requests,
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(Root))
