import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import Community from './scenes/Community'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    addLocaleData(fr)
  }

  render () {
    // TODO support > 1 community
    const myCommunity = this.props.communities[1]
    return (
      <IntlProvider locale={navigator.language} defaultLocale='en'>
        <Community name={myCommunity.name}
          // TODO Filter projects & trades for this community
          projects={Object.values(this.props.projects)}
          trades={Object.values(this.props.trades)}
          users={this.props.users} />
      </IntlProvider>
    )
  }
}

function mapStateToProps (state) {
  return {
    communities: state.universe.communities,
    projects: state.universe.projects,
    trades: state.universe.trades,
    users: state.universe.users
  }
}

export default connect(mapStateToProps)(App)
