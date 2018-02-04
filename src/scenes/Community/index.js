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
      <OfferList {...props} />
    </Router>
  </div>
)

Community.propTypes = {
  name: PropTypes.string.isRequired
}

export default Community
