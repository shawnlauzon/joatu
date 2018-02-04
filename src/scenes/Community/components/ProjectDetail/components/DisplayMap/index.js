import React from 'react'
import PropTypes from 'prop-types'

import mapboxgl from 'mapbox-gl'

class DisplayMap extends React.Component {
  constructor(props) {
    super(props)

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

    this.state = {
      coordinates: props.coordinates,
      zoom: 15
    }
  }

  componentDidMount() {
    const { longitude, latitude } = this.state.coordinates
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
    const coordinatesAreEqual = Object.keys(nextProps.coordinates).every(
      k => nextProps.coordinates[k] === this.props.coordinates[k]
    )

    if (!coordinatesAreEqual) {
      this.updateCoordinates(nextProps.coordinates)
    }
  }

  updateCoordinates(coordinates) {
    const { longitude, latitude } = coordinates

    this.map.panTo([longitude, latitude])
    this.marker.setLngLat([longitude, latitude])

    this.setState({ coordinates })
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
  coordinates: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired
  }).isRequired
}

export default DisplayMap
