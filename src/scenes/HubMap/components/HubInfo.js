// import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import { Typography } from 'material-ui'

// import UserChip from '../../../components/UserChip'

const styles = theme => ({
  hubInfo: {
    position: 'fixed',
    top: '80px',
    left: '10px',
    padding: theme.spacing.unit,
    background: theme.palette.background.default,
    border: '5px solid',
    borderRadius: '15px'
  },
  link: {
    textDecoration: 'none'
  }
})

const HubInfo = ({ classes, name, url }) => (
  <div className={classes.hubInfo}>
    <Link className={classes.link} to={url}>
      <Typography variant="display2">{name}</Typography>
    </Link>
    {/* {!props.members || R.isEmpty(props.members) ? (
      <div>No members :(</div>
    ) : (
      <div>
        <Typography variant="body2">Members:</Typography>

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
  members: PropTypes.objectOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired
    })
  )
}

export default withStyles(styles)(HubInfo)
