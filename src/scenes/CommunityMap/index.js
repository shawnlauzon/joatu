import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import DisplayMap from './components/DisplayMap'
import GeoPoint from './components/GeoPoint'
import CommunityInfo from './components/CommunityInfo'

class CommunityMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCommunityId: undefined
    }
  }

  onClick = id => {
    this.setState({ activeCommunityId: id })
  }

  resolve = (participants, users) => {
    return R.pick(R.keys(participants), users)
  }

  render() {
    return (
      <div>
        <DisplayMap>
          {Object.entries(this.props.communities).map(([id, community]) => (
            <GeoPoint
              key={id}
              id={id}
              name={community.name}
              lat={community.coordinates.latitude}
              lng={community.coordinates.longitude}
              onClick={() => this.onClick(id)}
            />
          ))}
        </DisplayMap>
        {this.state.activeCommunityId && (
          <CommunityInfo
            name={this.props.communities[this.state.activeCommunityId].name}
            members={this.props.membersOfCommunity(
              this.state.activeCommunityId
            )}
          />
        )}
      </div>
    )
  }
}

// TODO Find a better place for these helper functions
const resolve = (keyMap, values) => {
  return R.pick(R.keys(keyMap), values)
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    communities: state.communities,
    users: state.users,

    membersOfCommunity: communityId =>
      resolve(state.communities[communityId].members, state.users)
  }
}

export default connect(mapStateToProps)(CommunityMap)
