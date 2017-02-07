'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import SalonInfo from './SalonInfo'
import { Button, Row, Col } from 'antd'
import { undoRequest, setNotified } from '../actions/RequestActions'
import * as _ from 'lodash'

class BookingView extends Component {

  getData () {
    return this.props.bookings[this.props.bId]
  }

  handleButtonUndo () {
    // console.log('handleButtonUndo')
    const { dispatch } = this.props
    const data = this.getData()
    dispatch(undoRequest(data))
  }

  handleButtonNotified () {
    const { dispatch } = this.props
    const data = this.getData()
    dispatch(setNotified(data))
  }

  renderAction (data) {
    if (this.props.isCanceled) {
      if (!_.has(data, 'notified')) {
        return (
          <Button type='primary' style={styles.bookingButton} onClick={this.handleButtonNotified.bind(this)}>Set notified</Button>
        )
      }
    } else {
      return (
        <Button type='primary' style={styles.bookingButton} onClick={this.handleButtonUndo.bind(this)}>UNDO</Button>
      )
    }
  }

  render () {
    const data = this.getData()
    console.log('BookingView render', data)
    return (
      <div>
        <Row type='flex' justify='center'>
          <Col span='6' style={styles.headerStyle}>Client</Col>
          <Col span='12' style={styles.headerStyle}>Salon</Col>
          <Col span='6' style={styles.headerStyle}></Col>
        </Row>
        <Row type='flex' justify='center' >
          <Col span='6' >
            <UserInfo
              userId={data.userId}
              dateStart={data.dateStart}
              dateEnd={data.dateEnd}/>
          </Col>
          <Col span='12'><SalonInfo salonId={data.booking.salonId}/></Col>
          <Col span='6' >
            <Row> Booked at: </Row>
            <Row style={styles.bookingDate}>{new Date(data.booking.booking).toLocaleString('en-US')} </Row>
            <Row style={styles.bookingButtonContainer}>
              {this.renderAction(data)}
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

const styles = {
  headerStyle: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '12pt',
    fontStyle: 'italic'
  },
  bookingDate: {
    color: 'green'
  },
  bookingButtonContainer: {
    paddingTop: 20
  },
  bookingButton: {
    width: 130
  }
}

BookingView.defaultProps = {
  isCanceled: false
}

BookingView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bId: PropTypes.string.isRequired,
  bookings: PropTypes.object.isRequired,
  isCanceled: PropTypes.bool
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    bookings: state.bookings
  })

export default connect(
  mapStateToProps
)(BookingView)
