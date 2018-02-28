import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
    textDecoration: 'none'
  }
})

const UserChip = ({ id, classes, user }) => (
  <span>
    <Chip
      className={classes.chip}
      avatar={<Avatar src={user.imgSrc} />}
      label={`${user.displayName}`}
      component={Link}
      to={`/profiles/${user.id}`}
    />
  </span>
)

UserChip.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
  }).isRequired
}

export default withStyles(styles)(UserChip)
