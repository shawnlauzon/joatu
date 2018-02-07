import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../ButtonOffering'

const RequestList = props => (
  <div>
    {Object.entries(props.requests).map(([id, request]) => (
      <ButtonOffering
        key={id}
        id={id}
        name={request.name}
        to={`/requests/${id}`}
      />
    ))}
  </div>
)

RequestList.propTypes = {
  requests: PropTypes.object.isRequired
}

export default RequestList
