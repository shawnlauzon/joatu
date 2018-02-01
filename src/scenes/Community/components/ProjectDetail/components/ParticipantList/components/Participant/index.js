import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';

// Obviously need a different way of storing / accessing these
import user0 from './images/0.jpg';
import user1 from './images/1.jpg';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  }
});

const Participant = props => (
  <span>
    <Chip
      className={props.classes.chip}
      avatar={<Avatar src={props.user.id === 0 ? user0 : user1} />}
      label={props.user.name}
    />
  </span>
);

Participant.propTypes = {
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Participant);
