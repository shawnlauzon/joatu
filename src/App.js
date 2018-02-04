import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from './theme'
import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import Reboot from 'material-ui/Reboot'

import JoatUAppBar from './components/JoatUAppBar'
import Community from './scenes/Community'
import auth from './firebaseBackend/auth'

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
  constructor(props) {
    super(props)
    addLocaleData(fr)

    props.firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const splitName = user.displayName.split(' ')
        // TODO create user if doesn't exist
        this.props.dispatch(
          loginUser({
            email: user.email,
            name: {
              first: splitName[0],
              last: splitName.slice(1).join(' ')
            },
            imgUrl: user.photoURL
          })
        )
      }
    })
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers(this.props.firebase))
    this.props.dispatch(fetchCommunities(this.props.firebase))
    this.props.dispatch(fetchProjects(this.props.firebase))
  }

  render() {
    return (
      <IntlProvider locale={navigator.language} defaultLocale="en">
        <MuiThemeProvider theme={theme}>
          <Reboot />
          <JoatUAppBar
            auth={auth(this.props.firebase)}
            onLogoutUser={() => this.props.dispatch(logoutUser())}
            {...this.props}
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
                onCreateProject={body =>
                  this.props.dispatch(createProject(body))
                }
                onDeleteProject={body =>
                  this.props.dispatch(deleteProject(body))
                }
              />
            ))}
        </MuiThemeProvider>
      </IntlProvider>
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
