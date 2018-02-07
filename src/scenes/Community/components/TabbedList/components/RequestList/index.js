import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

const RequestList = props => (
  <div>
    {props.trades &&
      Object.entries(props.requests).map(([id, request]) => (
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
  requests: PropTypes.object
}

export default RequestList
