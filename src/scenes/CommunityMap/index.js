import React from 'react'
import { connect } from 'react-redux'

import { hubActions } from '../../data/actions'

import DisplayMap from './components/DisplayMap'
import GeoPoint from './components/GeoPoint'
import CommunityInfo from './components/CommunityInfo'

import { resolveKeys } from '../../utils'

class CommunityMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCommunityId: undefined
    }
  }

  onClick = id => {
    this.setState({ activeCommunityId: id })
    this.props.dispatch(hubActions.changeHub(id))
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
            url={`/communities/${this.state.activeCommunityId}`}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    communities: state.communities,
    users: state.users,

    membersOfCommunity: communityId =>
      resolveKeys(state.communities[communityId].members, state.users)
  }
}

export default connect(mapStateToProps)(CommunityMap)
