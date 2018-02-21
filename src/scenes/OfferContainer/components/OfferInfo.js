import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import ButtonDelete from '../../../components/ButtonDelete'
import UserChip from '../../../components/UserChip'

const OfferInfo = props => (
  <div>
    <Typography variant="display2">{props.offer.name}</Typography>

    <div>
      <Typography variant="body2">Offered by</Typography>
      <UserChip user={props.offer.owner} />
    </div>

    <ButtonDelete
      handleClick={props.onDelete}
      authenticatedUser={props.authenticatedUser}
    />
  </div>
)

OfferInfo.propTypes = {
  authenticatedUser: PropTypes.object,
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default OfferInfo
