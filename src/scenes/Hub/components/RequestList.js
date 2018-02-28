import React from 'react'
import PropTypes from 'prop-types'
import ListItemOffering from './ListItemOffering'

import Request from '../../../data/request/model'

const RequestList = props => (
  <div>
    {props.requests.map(request => (
      <ListItemOffering
        key={request.id}
        id={request.id}
        name={request.name}
        to={props.viewUrl + '/' + request.id}
      />
    ))}
  </div>
)

RequestList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.instanceOf(Request)).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default RequestList
