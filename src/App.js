import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import Reboot from 'material-ui/Reboot'

import Community from './scenes/Community'
import {
  fetchCommunities,
  fetchProjects,
  fetchUsers,
  createProject,
  deleteProject
} from './actions'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    addLocaleData(fr)
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers(this.props.firebase))
    this.props.dispatch(fetchCommunities(this.props.firebase))
    this.props.dispatch(fetchProjects(this.props.firebase))
  }

  onCreateProject = body => {
    this.props.dispatch(createProject(body))
  }

  onDeleteProject = id => {
    this.props.dispatch(deleteProject(id))
  }

  render() {
    return (
      <IntlProvider locale={navigator.language} defaultLocale="en">
        <div>
          <Reboot />
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
                onCreateProject={this.onCreateProject}
                onDeleteProject={this.onDeleteProject}
              />
            ))}
        </div>
      </IntlProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    communities: state.communities,
    projects: state.projects,
    trades: state.trades,
    users: state.users
  }
}

export default connect(mapStateToProps)(App)
