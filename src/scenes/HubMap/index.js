import React from 'react'
import { connect } from 'react-redux'

import DisplayMap from './components/DisplayMap'
import GeoPoint from './components/GeoPoint'
import HubInfo from './components/HubInfo'

import { allHubs, selectedHub, homeHub } from '../../data/hub/selectors'

import { changeHub } from '../../data/hub/actions'

class HubMap extends React.Component {
  render() {
    const { hubs, selectedHub, homeHub } = this.props
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
              onClick={() => this.props.changeHub(hub.id)}
            />
          ))}
        </DisplayMap>
        {selectedHub && (
          <HubInfo
            name={selectedHub.name}
            url={`/hubs/${selectedHub.id}`}
            isHomeHub={homeHub.id === selectedHub.id}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    homeHub: homeHub(state),
    hubs: allHubs(state),
    selectedHub: selectedHub(state)
  }
}

const mapDispatchToProps = {
  changeHub
}

export default connect(mapStateToProps, mapDispatchToProps)(HubMap)
