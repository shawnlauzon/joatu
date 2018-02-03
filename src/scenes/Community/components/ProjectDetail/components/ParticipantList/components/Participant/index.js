import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'

// Obviously need a different way of storing / accessing these
import user0 from './images/0.jpg'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  }
})

const Participant = props => (
  <span>
    <Chip
      className={props.classes.chip}
      avatar={<Avatar src={user0} />}
      label={`${props.user.name.first} ${props.user.name.last}`}
    />
  </span>
)

Participant.propTypes = {
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(Participant)
