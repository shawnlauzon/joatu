import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import Typography from 'material-ui/Typography'

import Offers from './components/Offers'
import ProjectList from './components/ProjectList'
import TradeList from './components/TradeList'

const Community = (props) => (
  <div>
    <Typography type='display3' gutterBottom>{props.name}</Typography>
    <Router>
      <Offers projects={props.projects} trades={props.trades}>
        <ProjectList projects={props.projects} />
        <TradeList trades={props.trades} />
      </Offers>
    </Router>
  </div>
)

Community.propTypes = {
  name: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  trades: PropTypes.arrayOf(PropTypes.object)
}

export default Community
