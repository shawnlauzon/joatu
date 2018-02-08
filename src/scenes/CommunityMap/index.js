import React from 'react'

import DisplayMap from './components/DisplayMap'
import GeoPoint from './components/GeoPoint'

const CommunityMap = props => (
  <DisplayMap>
    {Object.values(props.communities).map((community, idx) => (
      <GeoPoint
        key={idx}
        name={community.name}
        lat={community.coordinates.latitude}
        lng={community.coordinates.longitude}
      />
    ))}
  </DisplayMap>
)

export default CommunityMap
