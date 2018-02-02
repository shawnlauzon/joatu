import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import Typography from 'material-ui/Typography'

import OfferList from './components/OfferList'

const Community = props => (
  <div>
    <Typography type="display3" gutterBottom>
      {props.name}
    </Typography>
    <Router>
      <OfferList
        projects={props.projects}
        trades={props.trades}
        users={props.users}
        onCreateProject={props.onCreateProject}
        onDeleteProject={props.onDeleteProject}
      />
    </Router>
  </div>
)

Community.propTypes = {
  name: PropTypes.string.isRequired,
  projects: PropTypes.object,
  trades: PropTypes.object,
  users: PropTypes.object
}

export default Community
