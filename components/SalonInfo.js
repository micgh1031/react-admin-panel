import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Row, Col } from 'antd'
import { fetchSalon } from '../actions/SalonActions'
import Loading from './Loading'

class SalonInfo extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const salonId = this.props.salonId
    if (_.has(this.props.salons, salonId)) {
      // console.log('salon exists', salonId)
    } else {
      // console.log('salon not exists', salonId, 'fetch from db')
      const { dispatch } = this.props
      dispatch(fetchSalon(salonId))
    }
  }

  render () {
    const salonId = this.props.salonId
    // console.log('salon info render', salonId)
    if (_.has(this.props.salons, salonId)) {
      const salon = this.props.salons[salonId]
      return (
        <Col span='24' style={styles.infoStyle}>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Id: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {salonId} </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Name: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {salon.name}</Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Phone: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {salon.phone}</Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Address: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {salon.address}</Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Site url: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> <a href={salon.webSite} target='blank'>{salon.webSite}</a></Col>
          </Row>
        </Col>
      )
    } else {
      return <Loading/>
    }
  }
}

const colSpan1 = '7'
const colSpan2 = '14'

const styles = {
  infoStyle: {
    fontSize: 10
  },
  titleStyle: {
    margin: 'auto',
    textAlign: 'right'
  },
  valueStyle: {
    margin: 'auto',
    textAlign: 'left'
  }
}

SalonInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  salons: PropTypes.object.isRequired,
  salonId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => (
  {
    salons: state.salons
  })

export default connect(
  mapStateToProps
)(SalonInfo)
