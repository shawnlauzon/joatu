import React from 'react'
import PropTypes from 'prop-types'

import mapboxgl from 'mapbox-gl'

class DisplayMap extends React.Component {
  constructor(props) {
    super(props)

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

    this.state = {
      location: props.location,
      zoom: 15
    }
  }

  componentDidMount() {
    const { longitude, latitude } = this.state.location
    const zoom = this.state.zoom
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [longitude, latitude],
      zoom
    })

    this.marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map)
  }

  componentWillReceiveProps(nextProps) {
    const locationsAreEqual = Object.keys(nextProps.location).every(
      k => nextProps.location[k] === this.props.location[k]
    )

    if (!locationsAreEqual) {
      this.updateLocation(nextProps.location)
    }
  }

  updateLocation(location) {
    const { longitude, latitude } = location

    this.map.panTo([longitude, latitude])
    this.marker.setLngLat([longitude, latitude])

    this.setState({ location })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    const style = {
      height: '200px'
    }

    return (
      <div
        style={style}
        ref={ref => {
          this.mapContainer = ref
        }}
      />
    )
  }
}

DisplayMap.propTypes = {
  location: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired
  }).isRequired
}

export default DisplayMap
