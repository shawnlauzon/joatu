import { isEmpty } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemText } from 'material-ui/List'

const Profile = props => (
  <div>
    {props.user && (
      <div>
        <Typography variant="display3">{props.user.displayName}</Typography>
        <Typography variant="display2">My Projects</Typography>
        {!props.ownedProjects || isEmpty(props.ownedProjects) ? (
          <Typography variant="body1">None</Typography>
        ) : (
          <List>
            {props.ownedProjects.map(value => (
              <ListItem key={value.id}>
                <ListItemText
                  primary={
                    <Link to={`/projects/${value.id}`}>{value.name}</Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="display2">Volunteering for</Typography>
        {!props.memberProjects || isEmpty(props.memberProjects) ? (
          <Typography variant="body1">None</Typography>
        ) : (
          <List>
            {props.memberProjects.map(value => (
              <ListItem key={value.id}>
                <ListItemText
                  primary={
                    <Link to={`/projects/${value.id}`}>{value.name}</Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="display2">Offers</Typography>
        {!props.offers || isEmpty(props.offers) ? (
          <Typography variant="body1">None</Typography>
        ) : (
          <List>
            {props.offers.map(value => (
              <ListItem key={value.id}>
                <ListItemText
                  primary={<Link to={`/offers/${value.id}`}>{value.name}</Link>}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="display2">Requests</Typography>
        {!props.requests || isEmpty(props.requests) ? (
          <Typography variant="body1">None</Typography>
        ) : (
          <List>
            {props.requests.map(value => (
              <ListItem key={value.id}>
                <ListItemText
                  primary={
                    <Link to={`/requests/${value.id}`}>{value.name}</Link>
                  }
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
  authenticatedUser: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }),
  ownedProjects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ),
  memberProjects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ),
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ),
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  )
}

export default Profile
