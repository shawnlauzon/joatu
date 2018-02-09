import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from './ButtonOffering'

const OfferList = props => (
  <div>
    {Object.entries(props.offers).map(([id, offer]) => (
      <ButtonOffering
        key={id}
        id={id}
        name={offer.name}
        to={props.viewUrl + '/' + id}
      />
    ))}
  </div>
)

OfferList.propTypes = {
  offers: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  viewUrl: PropTypes.string.isRequired,
  createUrl: PropTypes.string.isRequired
}

export default OfferList
