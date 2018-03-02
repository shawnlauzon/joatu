import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import WatchLaterIcon from 'material-ui-icons/WatchLater'
import DoneIcon from 'material-ui-icons/Done'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
    textDecoration: 'none'
  }
})

const icons = {
  pending: <WatchLaterIcon />,
  approve: <DoneIcon />
}

class UserChip extends React.Component {
  constructor(props) {
    super(props)

    // Set to true when chip is clicked
    this.state = {
      redirect: false
    }
  }

  render() {
    const { user, altIcon, onAltClick, classes } = this.props

    if (this.state.redirect) {
      return <Redirect push to={`/profiles/${user.id}`} />
    } else {
      return (
        <Chip
          className={classes.chip}
          avatar={<Avatar src={user.imgSrc} />}
          label={`${user.displayName}`}
          deleteIcon={altIcon ? icons[altIcon] : undefined}
          onClick={() => this.setState({ redirect: true })}
          onDelete={onAltClick}
        />
      )
    }
  }
}

UserChip.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
  }).isRequired,
  onAltClick: PropTypes.func,
  altIcon: PropTypes.string
}

export default withStyles(styles)(UserChip)
