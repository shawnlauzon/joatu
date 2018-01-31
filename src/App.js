import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import Community from './scenes/Community'
import './App.css'

function App (props) {
  addLocaleData(fr)

  // TODO support > 1 community
  const myCommunity = props.data.communities[0]
  return (
    <IntlProvider locale={navigator.language} defaultLocale='en'>
      <Community name={myCommunity.name}
        projects={myCommunity.projects}
        trades={myCommunity.trades}
        users={props.data.users} />
    </IntlProvider>
  )
}

export default App
