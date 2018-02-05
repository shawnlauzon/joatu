import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  }
})

const Participant = props => (
  <span>
    <Chip
      className={props.classes.chip}
      avatar={<Avatar src={props.user.imgUrl} />}
      label={`${props.user.displayName}`}
    />
  </span>
)

Participant.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired
}

export default withStyles(styles)(Participant)
