import React from 'react'
import PropTypes from 'prop-types'
import Trade from './components/Trade'

const TradeList = (props) => (
  <div>
    {props.trades.map(trade =>
      <Trade key={trade.id} name={trade.name} />)}
  </div>
  )

TradeList.propTypes = {
  trades: PropTypes.arrayOf(PropTypes.object)
}

export default TradeList
