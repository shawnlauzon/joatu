import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class DisplayMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: props.location.lat,
      lng: props.location.lng,
      name: props.location.name,
      zoom: 15
    }
  }

  componentDidMount () {
    const { lng, lat, zoom } = this.state

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom
    })
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
