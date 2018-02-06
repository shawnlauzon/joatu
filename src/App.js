import * as R from 'ramda'
import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from './theme'
import { connect } from 'react-redux'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Community from './scenes/Community'

import {
  fetchCommunities,
  fetchUsers,
  loginUser,
  logoutUser,
  createUser,
  // onAuthChanged,
  addParticipant
} from './actions'
import './App.css'

import { actions as projectActions } from './data/projects'

const { fetchProjects, createProject, deleteProject } = projectActions

class App extends React.Component {
  constructor(props) {
    super(props)

    // FIXME Integrate better with the API; it seems weird to be here
    // props.firebase.auth().onAuthStateChanged(user => {
    //   this.props.dispatch(onAuthChanged(user))
    // })

    this.creatingUser = false
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers())
    this.props.dispatch(fetchCommunities())
    this.props.dispatch(fetchProjects())
  }

  // FIXME This works unless the user is deleted from the backend without
  // reloading the app, then the user doesn't get created because of the flag
  // Still, this should be improved. Ideally after LOGIN_SUCCEEDED, the user
  // should be created if it doesn't yet exist.
  componentWillReceiveProps(nextProps) {
    if (
      !this.creatingUser &&
      nextProps.user &&
      nextProps.user.authenticated &&
      !R.isEmpty(nextProps.users) &&
      !nextProps.users[nextProps.user.id]
    ) {
      this.props.dispatch(createUser(nextProps.user))
      // Note that this is never set to false unless app is reloaded. But if we
      // don't have this flag, an infinite loop occurs
      this.creatingUser = true
    }
  }

  // TODO should this be more like
  // onLogin = provider => dispatch => dispatch(loginUser(provider)) ??
  // See Redux docs (Reducing boilerplate)
  onLogin = provider => {
    this.props.dispatch(loginUser(provider))
  }

  onLogout = () => {
    this.props.dispatch(logoutUser())
  }

  onJoinProject = projectId => {
    this.props.dispatch(addParticipant(this.props.user.id, projectId))
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
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
              name={community.name}
              user={this.props.user}
              // TODO Filter projects & trades for this community
              projects={this.props.projects}
              trades={this.props.trades}
              users={this.props.users}
              onCreateProject={body => this.props.dispatch(createProject(body))}
              onDeleteProject={body => this.props.dispatch(deleteProject(body))}
              onJoinProject={this.onJoinProject}
            />
          ))}
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    communities: state.communities,
    projects: state.projects,
    trades: state.trades,
    users: state.users
  }
}

export default connect(mapStateToProps)(App)
