import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class DisplayMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        lat: props.location.lat,
        lng: props.location.lng
      },
      zoom: 15
    }
  }

  componentWillReceiveProps (nextProps) {
    const locationsAreEqual = Object.keys(nextProps.location).every(
      k => nextProps.location[k] === this.props.location[k]
    )

    if (!locationsAreEqual) {
      this.updateLocation(nextProps.location)
    }
  }

  componentDidMount () {
    const { lng, lat } = this.state.location
    const zoom = this.state.zoom
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom
    })

    this.marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map)
  }

  updateLocation (location) {
    const { lng, lat } = location

    this.map.panTo([lng, lat])
    this.marker.setLngLat([lng, lat])

    this.setState({ location })
  }

  componentWillUnmount () {
    this.map.remove()
  }

  render () {
    const style = {
      // width: '100%',
      height: '200px'
    }

    return <div style={style} ref={ref => { this.mapContainer = ref }} />
  }
}

export default DisplayMap
