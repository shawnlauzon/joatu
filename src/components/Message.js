import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit
  }
})

const Message = ({ classes, from, text }) => {
  return (
    <Grid container alignItems="center">
      <Avatar
        className={classes.avatar}
        alt={from.displayName}
        src={from.imgSrc}
        component={Link}
        to={`/profiles/${from.id}`}
      />
      <Typography component="span" variant="body1">
        {text}
      </Typography>
    </Grid>
  )
}

Message.propTypes = {
  from: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
  }).isRequired,
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(Message)
