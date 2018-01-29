import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'

import Offers from './components/Offers'
import ProjectList from './components/ProjectList'
import TradeList from './components/TradeList'

const Community = (props) => (
  <div>
    <Typography type='display3' gutterBottom>{props.name}</Typography>
    <Offers>
      <ProjectList projects={props.projects} />
      <TradeList trades={props.trades} />
    </Offers>
  </div>
)

Community.propTypes = {
  name: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  trades: PropTypes.arrayOf(PropTypes.object)
}

export default Community
