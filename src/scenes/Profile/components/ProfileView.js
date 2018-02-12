import { isEmpty } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemText } from 'material-ui/List'

const Profile = props => (
  <div>
    <Typography variant="display3">
      {props.user && props.user.displayName}
    </Typography>
    <Typography variant="display2">Projects</Typography>
    {isEmpty(props.projects) ? (
      <Typography variant="body1">None</Typography>
    ) : (
      <List>
        {Object.entries(props.projects).map(([id, value]) => (
          <ListItem key={id}>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
      </List>
    )}
    <Typography variant="display2">Offers</Typography>
    {isEmpty(props.offers) ? (
      <Typography variant="body1">None</Typography>
    ) : (
      <List>
        {Object.entries(props.offers).map(([id, value]) => (
          <ListItem key={id}>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
      </List>
    )}
    <Typography variant="display2">Requests</Typography>
    {isEmpty(props.requests) ? (
      <Typography variant="body1">None</Typography>
    ) : (
      <List>
        {Object.entries(props.requests).map(([id, value]) => (
          <ListItem key={id}>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
      </List>
    )}
  </div>
)

Profile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }),
  projects: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  offers: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  requests: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Profile
