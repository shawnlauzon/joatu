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

const UserChip = ({ classes, user }) => (
  <span>
    <Chip
      className={classes.chip}
      avatar={<Avatar src={user.imgUrl} />}
      label={`${user.displayName}`}
    />
  </span>
)

UserChip.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired
}

export default withStyles(styles)(UserChip)
