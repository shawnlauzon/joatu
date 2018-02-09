import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from './ButtonOffering'

const RequestList = props => (
  <div>
    {Object.entries(props.requests).map(([id, request]) => (
      <ButtonOffering
        key={id}
        id={id}
        name={request.name}
        to={props.viewUrl + '/' + id}
      />
    ))}
  </div>
)

RequestList.propTypes = {
  requests: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default RequestList
