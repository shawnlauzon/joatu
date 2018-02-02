import React from 'react'
import PropTypes from 'prop-types'
import ButtonOffering from '../../../../../../components/ButtonOffering'

const TradeList = props => (
  <div>
    {props.trades &&
      Object.entries(props.trades).map(([id, trade]) => (
        <ButtonOffering
          key={id}
          id={id}
          name={trade.name}
          to={`/trades/${id}`}
        />
      ))}
  </div>
)

TradeList.propTypes = {
  trades: PropTypes.object
}

export default TradeList
