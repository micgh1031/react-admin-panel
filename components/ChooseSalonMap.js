import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'
import * as _ from 'lodash'

/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src='https://maps.googleapis.com/maps/api/js'></script> to your HTML to provide google.maps reference
 */

class ChooseSalonMap extends Component {
  constructor (props) {
    super(props)
    const req = this.props.req
    const mapCenter = {
      lat: req.lat,
      lng: req.lng
    }

    this.state = {
      bounds: null,
      center: mapCenter,
      l: this.props.salons.length,
      markers: _.values(this.props.salons)
    }

    this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  handleBoundsChanged () {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter()
    })
  }

  handleMarkerClick (marker) {
    // console.log('handleMarkerClick', marker)
    this.setState({
      markers: _.map(this.state.markers, (m) => {
        const newM = _.assign({}, m)
        if (newM.id === marker.id) {
          console.log('set showInfo to true to marker', newM.id)
          newM.showInfo = true
        }
        return newM
      })
    })
    // marker.showInfo = true
  }

  handleMarkerClose (marker) {
    this.setState({
      markers: _.map(this.state.markers, (m) => {
        const newM = _.assign({}, m)
        if (newM.id === marker.id) {
          console.log('set showInfo to true to marker', newM.id)
          newM.showInfo = false
        }
        return newM
      })
    })
    // marker.showInfo = false
  }

  handleSelectSalon (marker) {
    this.props.onSelectSalon(marker)
  }

  renderInfoWindow (marker) {
    // console.log('render Info window', marker.id)
    return (
      <InfoWindow
        key={marker.id}
        onCloseclick={this.handleMarkerClose.bind(this, marker)}
        style={{zIndex: 2}}
        position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
        options={{pixelOffset: new google.maps.Size(0, -5)}}
      >
        <section style={{zIndex: 0}}>
          <Row type='flex' >
            <Col >{marker.name}</Col>
          </Row>
          <Row type='flex' >
            <Col >{marker.phone}</Col>
          </Row>
          <Row type='flex' >
            <Col >{marker.contactPerson}</Col>
          </Row>
          <Row type='flex' >
            <Col >distance: {marker.distance} mi </Col>
          </Row>
          <Button type='primary' size='small' onClick={this.handleSelectSalon.bind(this, marker)}>select</Button>

        </section>
      </InfoWindow>
    )
  }

  renderUser () {
    const req = this.props.req
    const position = {
      lat: parseFloat(req.lat),
      lng: parseFloat(req.lng)
    }
    // console.log(position)
    const userLatLng = new google.maps.LatLng(req.lat, req.lng)
    for (let i in this.state.markers) {
      const salonLatLng = new google.maps.LatLng(this.state.markers[i].lat, this.state.markers[i].lng)
      // distance in miles
      const d = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, salonLatLng) / 1000 * 0.621371
      this.state.markers[i].distance = d.toFixed(1)
    }

    return (
      <Marker position={position} key='user_marker' icon='https://maps.gstatic.com/mapfiles/ms2/micons/man.png' />
      )
  }

  render () {
    return (
      <GoogleMapLoader
        containerElement={ <div style={styles.container}/> }
        googleMapElement={
          <GoogleMap
            center={this.state.center}
            defaultZoom={12}
            onBoundsChanged={this.handleBoundsChanged}
            ref='map'
          >
            {this.renderUser()}

            {_.values(this.state.markers).map((salon, index) => {
              console.log('render marker', salon.id, 'showInfo', salon.showInfo, 'distance', salon.distance, 'range', this.props.req.range)
              return (
                <Marker
                  position={{lat: parseFloat(salon.lat), lng: parseFloat(salon.lng)}}
                  key={salon.id}
                  onClick={this.handleMarkerClick.bind(this, salon)}
                  icon={salon.distance < this.props.req.range ? 'https://maps.gstatic.com/mapfiles/ms2/micons/green.png' : 'https://maps.gstatic.com/mapfiles/ms2/micons/orange.png'}
                >
                  {(salon.showInfo) ? this.renderInfoWindow(salon) : null}
                </Marker>
              )
            }
            )}
          </GoogleMap>
        }
      />
    )
  }
}

const styles = {
  container: {
    float: 'left',
    width: 500,
    height: 400,
    marginLeft: 10
  }
}

ChooseSalonMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  salons: PropTypes.object.isRequired,
  req: PropTypes.object.isRequired,
  onSelectSalon: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    salons: state.salons
  })

export default connect(
  mapStateToProps
)(ChooseSalonMap)
