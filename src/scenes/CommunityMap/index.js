import React from 'react'
import { connect } from 'react-redux'

import { changeHub } from '../../data/actions'

import DisplayMap from './components/DisplayMap'
import GeoPoint from './components/GeoPoint'
import CommunityInfo from './components/CommunityInfo'

import { allCommunities } from '../../data/community/selectors'

class CommunityMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCommunityIndex: undefined
    }
  }

  onClick = index => {
    this.setState({ activeCommunityIndex: index })

    // TODO Changing the hub should occur when someone clicks on the link,
    // not just when they select one of these
    this.props.dispatch(changeHub(this.props.communities[index]))
  }

  getSelectedCommunity = index =>
    this.props.communities[this.state.activeCommunityIndex]

  render() {
    return (
      <div>
        <DisplayMap>
          {this.props.communities.map((community, index) => (
            <GeoPoint
              key={community.id}
              id={community.id}
              name={community.name}
              lat={community.coordinates.latitude}
              lng={community.coordinates.longitude}
              onClick={() => this.onClick(index)}
            />
          ))}
        </DisplayMap>
        {this.state.activeCommunityIndex && (
          <CommunityInfo
            name={this.getSelectedCommunity().name}
            url={`/communities/${this.getSelectedCommunity().id}`}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    communities: allCommunities(state)
  }
}

export default connect(mapStateToProps)(CommunityMap)
