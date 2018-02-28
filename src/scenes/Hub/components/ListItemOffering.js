import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'

function ListItemOffering(props) {
  return (
    <ListItem button component={Link} to={props.to}>
      <ListItemText
        primary={props.name}
        secondary={
          props.isApproved === false ? 'Waiting for approval' : undefined
        }
      />
    </ListItem>
  )
}

ListItemOffering.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isApproved: PropTypes.bool
}

export default ListItemOffering
