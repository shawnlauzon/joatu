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
      avatar={<Avatar src={user.imgUrl} />}
      label={`${user.displayName}`}
      component={Link}
      to={`/profiles/${id}`}
    />
  </span>
)

UserChip.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired
}

export default withStyles(styles)(UserChip)
