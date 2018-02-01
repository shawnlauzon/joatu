import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl';
import { Typography } from 'material-ui';

const ProjectDetails = props => (
  <Typography type="body1" component="div" gutterBottom>
    <div>
      <FormattedDate
        value={props.startTime}
        year="numeric"
        month="short"
        day="numeric"
      />{' '}
      at&nbsp;
      <FormattedTime value={props.startTime} /> for&nbsp;
      <FormattedNumber
        value={props.duration / 60}
        maxmumFractionDigits={1}
      />{' '}
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
);

ProjectDetails.propTypes = {
  startTime: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  hourlyAward: PropTypes.number.isRequired
};

export default ProjectDetails;
