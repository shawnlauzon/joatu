import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'

import TabbedList from './components/TabbedList'

const Community = props => (
  <div>
    <Typography type="display3" gutterBottom>
      {props.name}
    </Typography>
    <TabbedList {...props} />
  </div>
)

Community.propTypes = {
  name: PropTypes.string.isRequired
}

export default Community
