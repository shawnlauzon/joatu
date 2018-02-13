import { isEmpty } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'

const Profile = props => (
  <div>
    {props.user && (
      <div>
        <Avatar src={props.user.imgUrl} />
        <Typography variant="display3">{props.user.displayName}</Typography>
        <Typography variant="display2">My Projects</Typography>
        {isEmpty(props.ownedProjects) ? (
          <Typography variant="body1">None</Typography>
        ) : (
          <List>
            {Object.entries(props.ownedProjects).map(([id, value]) => (
              <ListItem key={id}>
                <ListItemText
                  primary={<Link to={`/projects/${id}`}>{value.name}</Link>}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="display2">Volunteering for</Typography>
        {isEmpty(props.memberProjects) ? (
          <Typography variant="body1">None</Typography>
        ) : (
          <List>
            {Object.entries(props.ownedProjects).map(([id, value]) => (
              <ListItem key={id}>
                <ListItemText
                  primary={<Link to={`/projects/${id}`}>{value.name}</Link>}
                />
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
                <ListItemText
                  primary={<Link to={`/offers/${id}`}>{value.name}</Link>}
                />
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
                <ListItemText
                  primary={<Link to={`/requests/${id}`}>{value.name}</Link>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    )}
  </div>
)

Profile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }),
  ownedProjects: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  memberProjects: PropTypes.objectOf(
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
