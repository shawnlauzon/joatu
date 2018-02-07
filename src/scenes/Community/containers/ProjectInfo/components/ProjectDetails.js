import React from 'react'
import PropTypes from 'prop-types'
import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl'
import { Typography } from 'material-ui'

const ProjectDetails = props => (
  <Typography variant="body1" component="div" gutterBottom>
    <div>
      <FormattedDate
        value={props.start}
        year="numeric"
        month="short"
        day="numeric"
      />{' '}
      at <FormattedTime value={props.start} /> for{' '}
      <FormattedNumber value={props.duration / 60} maxmumFractionDigits={1} />{' '}
      hours
    </div>
    <div>
      You will earn{' '}
      <FormattedNumber
        value={props.hourlyAward * props.duration / 60}
        maxmumFractionDigits={1}
      />{' '}
      CAPS
    </div>
  </Typography>
)

ProjectDetails.propTypes = {
  start: PropTypes.any.isRequired,
  duration: PropTypes.number.isRequired,
  hourlyAward: PropTypes.number.isRequired
}

export default ProjectDetails
