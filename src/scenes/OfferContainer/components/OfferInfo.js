import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import ButtonDelete from '../../../components/ButtonDelete'

const OfferInfo = props => (
  <div>
    <Typography variant="display2">{props.offer.name}</Typography>
    <ButtonDelete
      handleClick={props.onDelete}
      authenticated={props.authUser.authenticated}
    />
  </div>
)

OfferInfo.propTypes = {
  authUser: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default OfferInfo
