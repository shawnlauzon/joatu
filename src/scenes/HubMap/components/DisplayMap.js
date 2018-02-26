import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import mapboxgl from 'mapbox-gl'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  map: {
    // 1vh = 1% of browser screen height
    height: '100vh'
  }
})

class DisplayMap extends React.Component {
  constructor(props) {
    super(props)

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY
    this.mapboxglSupported = mapboxgl.supported()

    this.state = {
      zoom: this.props.center ? 13 : 11,
      markers: []
    }
  }

  componentDidMount() {
    if (!this.mapboxglSupported) {
      return
    }

    const zoom = this.state.zoom
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: this.props.center
        ? [this.props.center.longitude, this.props.center.latitude]
        : [-73.599931, 45.508698],
      zoom
    })

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl())

    // Add geolocate control to the map.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
    this.map.addControl(geolocate)
    // See https://github.com/mapbox/mapbox-gl-js/issues/5464
    // setTimeout(geolocate._onClickGeolocate.bind(geolocate), 5)

    this.addMarkers(this.props)
  }

  addMarkers = props => {
    const markers = []
    React.Children.map(props.children, geoPoint => {
      const marker = new mapboxgl.Marker()
        .setLngLat([geoPoint.props.lng, geoPoint.props.lat])
        .addTo(this.map)

      marker.getElement().addEventListener('click', e => {
        geoPoint.props.onClick()

        this.map.easeTo({
          zoom: 13,
          center: marker.getLngLat(),
          duration: 500
        })
      })

      markers.push(marker)
    })
  }

  removeMarkers = () => {
    this.state.markers.forEach(marker => marker.remove())
  }

  componentWillUnmount() {
    if (this.mapboxglSupported) {
      this.map.remove()
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.mapboxglSupported) {
      return
    }

    if (!R.equals(newProps.children, this.props.children)) {
      this.removeMarkers()
      this.addMarkers(newProps)
    }

    if (!this.props.center && newProps.center) {
      this.map.easeTo({
        zoom: 14,
        center: [newProps.center.longitude, newProps.center.latitude],
        duration: 500
      })
    }
  }

  render() {
    const { classes } = this.props

    return this.mapboxglSupported ? (
      <div
        className={classes.map}
        ref={ref => {
          this.mapContainer = ref
        }}
      />
    ) : (
      <div>Your browser does not support Mapbox GL</div>
    )
  }
}

DisplayMap.propTypes = {
  center: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired
  })
}

export default withStyles(styles)(DisplayMap)
