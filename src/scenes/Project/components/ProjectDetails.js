import React from 'react'
import PropTypes from 'prop-types'
import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl'
import { Typography } from 'material-ui'

const ProjectDetails = ({ project, hourlyAward }) => (
  <div>
    <Typography variant="body1" component="div" gutterBottom>
      <div>
        <FormattedDate
          value={project.start}
          year="numeric"
          month="short"
          day="numeric"
        />{' '}
        at <FormattedTime value={project.start} /> for{' '}
        <FormattedNumber
          value={project.duration / 60}
          maxmumFractionDigits={1}
        />{' '}
        hours
      </div>
      <div>
        You will earn{' '}
        <FormattedNumber
          value={hourlyAward * project.duration / 60}
          maxmumFractionDigits={1}
        />{' '}
        CAPS
      </div>
    </Typography>
    {project.benefit && (
      <div>
        <Typography variant="display1">
          How will this benefit the community?
        </Typography>
        <Typography>{project.benefit}</Typography>
      </div>
    )}
  </div>
)

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    start: PropTypes.any.isRequired,
    duration: PropTypes.number.isRequired
  }).isRequired,
  hourlyAward: PropTypes.number.isRequired
}

export default ProjectDetails
