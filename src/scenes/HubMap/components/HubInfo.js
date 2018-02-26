// import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Typography } from 'material-ui'

// import UserChip from '../../../components/UserChip'

const HubInfo = props => (
  <div>
    <Link to={props.url}>
      <Typography variant="display2">{props.name}</Typography>
    </Link>
    {/* {!props.members || R.isEmpty(props.members) ? (
      <div>No members :(</div>
    ) : (
      <div>
        <Typography variant="body2">Members:</Typography>

        {Object.entries(props.members).map(([id, member]) => (
          <UserChip key={id} user={member} />
        ))}
      </div>
    )} */}
  </div>
)

HubInfo.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  members: PropTypes.objectOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired
    })
  )
}

export default HubInfo
