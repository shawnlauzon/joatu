import React from 'react'
import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl'
import PropTypes from 'prop-types'

const ProjectDetails = (props) => (
  <div className='ProjectDetails'>
    <div><FormattedDate value={props.startTime} year='numeric' month='short' day='numeric' /></div>
    <div><FormattedTime value={props.startTime} /></div>
    <div><FormattedNumber value={props.hourlyAward * props.duration / 60} maxmumFractionDigits={1} /> CAPS</div>
    <div><FormattedNumber value={props.duration / 60} maxmumFractionDigits={1} /> hours</div>
  </div>
)

ProjectDetails.propTypes = {
  startTime: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  hourlyAward: PropTypes.number.isRequired
}

export default ProjectDetails
