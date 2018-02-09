import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import ButtonDelete from './ButtonDelete'

const OfferInfo = props => (
  <div>
    <Typography variant="display2">{props.name}</Typography>
    <ButtonDelete
      handleClick={props.onDelete}
      authenticated={props.authUser.authenticated}
      returnUrl={props.returnUrl}
    />
  </div>
)

OfferInfo.propTypes = {
  authUser: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default OfferInfo
