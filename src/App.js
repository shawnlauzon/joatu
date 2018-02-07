import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { MuiThemeProvider } from 'material-ui/styles'
import theme from './theme'

import Root from './scenes/Root'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Root />
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
