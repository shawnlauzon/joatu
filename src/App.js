import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from './theme'
import { connect } from 'react-redux'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Community from './scenes/Community'

import {
  fetchCommunities,
  fetchProjects,
  fetchUsers,
  createProject,
  deleteProject,
  loginUser,
  logoutUser
} from './actions'
import './App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers())
    this.props.dispatch(fetchCommunities())
    this.props.dispatch(fetchProjects())
  }

  onLogin = provider => {
    this.props.dispatch(loginUser(provider))
  }

  onLogout = () => {
    this.props.dispatch(logoutUser())
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
              // TODO Filter projects & trades for this community
              projects={this.props.projects}
              trades={this.props.trades}
              users={this.props.users}
              onCreateProject={body => this.props.dispatch(createProject(body))}
              onDeleteProject={body => this.props.dispatch(deleteProject(body))}
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
