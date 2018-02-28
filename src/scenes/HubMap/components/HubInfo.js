// import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import InfoIcon from 'material-ui-icons/Info'
import HomeIcon from 'material-ui-icons/Home'

import { Typography } from 'material-ui'

// import UserChip from '../../../components/UserChip'

const styles = theme => ({
  hubInfo: {
    position: 'fixed',
    top: '80px',
    left: '10px',
    padding: theme.spacing.unit * 2,
    background: theme.palette.background.default,
    border: '5px solid',
    borderRadius: '15px'
  },
  link: {
    textDecoration: 'none'
  },
  text: {
    display: 'inline'
  },
  icon: {
    margin: theme.spacing.unit
  }
})

const HubInfo = ({ classes, name, url, isHomeHub }) => (
  <div className={classes.hubInfo}>
    <Link className={classes.link} to={url}>
      {/* Use a Grid so the children are properly aligned */}
      <Grid container alignItems="center">
        {isHomeHub && <HomeIcon className={classes.icon} color="primary" />}
        <Typography className={classes.text} variant="display2">
          {name}
        </Typography>
        <InfoIcon className={classes.icon} color="action" />
      </Grid>
    </Link>
    {/* {!props.members || R.isEmpty(props.members) ? (
      <div>No members :(</div>
    ) : (
      <div>
        <Typography variant="body1">Members:</Typography>

        {Object.entries(props.members).map(([id, member]) => (
          <UserChip key={id} user={member} />
        ))}
      </div>
    )} */}
  </div>
)

HubInfo.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isHomeHub: PropTypes.bool.isRequired,
  members: PropTypes.objectOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired
    })
  )
}

export default withStyles(styles)(HubInfo)
