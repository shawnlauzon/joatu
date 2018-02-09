import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Typography } from 'material-ui'

import UserChip from '../../../components/UserChip'

const CommunityInfo = props => (
  <div>
    <Link to={props.url}>
      <Typography variant="display2">{props.name}</Typography>
    </Link>
    {R.isEmpty(props.members) ? (
      <div>No members :(</div>
    ) : (
      <div>
        <Typography variant="body2">Members:</Typography>

        {Object.entries(props.members).map(([id, member]) => (
          <UserChip key={id} user={member} />
        ))}
      </div>
    )}
  </div>
)

CommunityInfo.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  members: PropTypes.objectOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired
    })
  ).isRequired
}

export default CommunityInfo
