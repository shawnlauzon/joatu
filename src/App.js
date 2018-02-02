import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import Reboot from 'material-ui/Reboot'

import Community from './scenes/Community'
import { fetchCommunities, fetchProjects, createProject } from './actions'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    addLocaleData(fr)
  }

  componentDidMount() {
    this.props.dispatch(fetchCommunities(this.props.firebase))
    this.props.dispatch(fetchProjects(this.props.firebase))
  }

  onCreateProject = ({ name, location, start, duration }) => {
    this.props.dispatch(createProject({ name, location, start, duration }))
  }

  render() {
    return (
      <IntlProvider locale={navigator.language} defaultLocale="en">
        <div>
          <Reboot />
          {this.props.communities &&
            Object.values(this.props.communities).map((community, idx) => (
              <Community
                key={idx}
                name={community.name}
                // TODO Filter projects & trades for this community
                projects={this.props.projects}
                trades={this.props.trades}
                users={this.props.users}
                onCreateProject={this.onCreateProject}
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
