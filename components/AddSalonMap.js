import React, { Component, PropTypes } from 'react'
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps'

/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src='https://maps.googleapis.com/maps/api/js'></script> to your HTML to provide google.maps reference
 */

const mapCenter = {
//    lat: 47.6205588,
//    lng: -122.3212725,
  lat: 34.0522342,
  lng: -118.2436849
}

export default class AddSalonMap extends Component {
  constructor (props) {
    super (props)

    this.state = {
      bounds: null,
      center: mapCenter,
      markers: []
    }

    if (this.props.location) {
      // console.log('Add salon map location', this.props.location)
      this.state.center = {
        lat: parseFloat(this.props.location.lat),
        lng: parseFloat(this.props.location.lng)
      }
      this.state.markers.push({
        position: this.state.center,
        address: this.props.location.address
      })
    }

    this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  handleBoundsChanged () {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter()
    })
  }

  handlePlacesChanged () {
    const places = this.refs.searchBox.getPlaces()
    const markers = []

    // Add a marker for each place returned from search bar
    places.forEach(function (place) {
      // console.log(place)
      // console.log(place.geometry.location.lat(), place.geometry.location.lng())
      markers.push({
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        address: place.formatted_address
      })
    })
    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center

    this.setState({
      center: mapCenter,
      markers
    })
  }

  handleMarkerClick (marker) {
    // console.log('click marker',marker)
    this.props.onSelectMarker(marker)
  }

  render () {
    return (
      <GoogleMapLoader
        containerElement={ <div style={styles.container }/> }
        googleMapElement={
          <GoogleMap
            center={this.state.center}

            defaultZoom={8}
            onBoundsChanged={this.handleBoundsChanged}
            ref='map'
          >
            <SearchBox
              bounds={this.state.bounds}
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              onPlacesChanged={this.handlePlacesChanged}
              ref='searchBox'
              placeholder='Enter address'
              style={styles.inputStyle}
            />

            {this.state.markers.map((marker, index) => (
              <Marker position={marker.position} key={index} onClick={this.handleMarkerClick.bind(this, marker)} />
            ))}
          </GoogleMap>
        }
      />
    )
  }
}

const styles = {
  container: {
    float: 'left',
    width: '512px',
    height: '384px',
    marginLeft: '10px'
  },
  inputStyle: {
    border: '1px solid transparent',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    fontSize: '14px',
    height: '32px',
    marginTop: '27px',
    outline: 'none',
    padding: '0 12px',
    textOverflow: 'ellipses',
    width: '400px'
  }
}

AddSalonMap.propTypes = {
  onSelectMarker: PropTypes.func,
  location: PropTypes.object
}
