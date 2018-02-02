import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

const TradeList = props => (
  <div>
    {Object.values(props.trades).map(trade => (
      <ButtonOffering
        key={trade.id}
        name={trade.name}
        to={`/trades/${trade.id}`}
      />
    ))}
  </div>
)

TradeList.propTypes = {
  trades: PropTypes.object.isRequired
}

export default TradeList
