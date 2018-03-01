import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import DisplayMap from './components/DisplayMap'
import GeoPoint from './components/GeoPoint'
import HubInfo from './components/HubInfo'

import { allHubs, homeHub } from '../../data/hub/selectors'

class HubMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedHubId: undefined
    }
  }

  selectedHub = () =>
    R.find(R.propEq('id', this.state.selectedHubId), this.props.hubs)

  render() {
    const { hubs, homeHub } = this.props
    return (
      <div>
        <DisplayMap center={homeHub && homeHub.location}>
          {hubs.map(hub => (
            <GeoPoint
              key={hub.id}
              id={hub.id}
              name={hub.name}
              lat={hub.location.latitude}
              lng={hub.location.longitude}
              onClick={hubId => this.setState({ selectedHubId: hub.id })}
            />
          ))}
        </DisplayMap>
        {this.state.selectedHubId && (
          <HubInfo
            name={this.selectedHub().name}
            url={`/hubs/${this.state.selectedHubId}`}
            isHomeHub={
              homeHub !== undefined && homeHub.id === this.state.selectedHubId
            }
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    homeHub: homeHub(state),
    hubs: allHubs(state)
  }
}

export default connect(mapStateToProps)(HubMap)
