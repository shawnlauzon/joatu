import React from 'react'

import mapboxgl from 'mapbox-gl'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  map: {
    height: '400px'
  }
})

class DisplayMap extends React.Component {
  constructor(props) {
    super(props)

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY
    this.mapboxglSupported = mapboxgl.supported()

    this.state = {
      zoom: 11,
      popups: [],
      layers: []
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
      center: [-73.599931, 45.508698],
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

    this.state.popups.forEach(popup => {
      popup.remove()
    })
    const popups = []
    React.Children.map(this.props.children, geoPoint => {
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

      popups.push(marker)
    })
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

export default withStyles(styles)(DisplayMap)
