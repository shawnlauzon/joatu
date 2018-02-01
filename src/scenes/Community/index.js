import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import Typography from 'material-ui/Typography'

import Offers from './components/Offers'

const Community = (props) => (
  <div>
    <Typography type='display3' gutterBottom>{props.name}</Typography>
    <Router>
      <Offers projects={props.projects} trades={props.trades} users={props.users} />
    </Router>
  </div>
)

Community.propTypes = {
  name: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  trades: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.object.isRequired
}

export default Community
