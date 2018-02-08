import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import UserChip from 'joatu-components/UserChip'

const CommunityInfo = props => (
  <div>
    <Typography variant="display2">{props.name}</Typography>
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
  members: PropTypes.objectOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired
    })
  ).isRequired
}

export default CommunityInfo
