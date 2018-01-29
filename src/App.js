import React from 'react'

import Community from './scenes/Community'
import './App.css'

function App (props) {
  // TODO support > 1 community
  const myCommunity = props.data.communities[0]
  return (
    <Community name={myCommunity.name}
      projects={myCommunity.projects}
      trades={myCommunity.trades} />
  )
}

export default App
