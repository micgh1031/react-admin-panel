import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Row, Col } from 'antd'
import { fetchUser } from '../actions/UserActions'
import Loading from './Loading'

class UserInfo extends Component {

  constructor (props) {
    // console.log('user info', props)
    super(props)
  }

  componentDidMount () {
    const userId = this.props.userId
    if (_.has(this.props.users, userId)) {
      // console.log('user exists', userId)
    } else {
      // console.log('user not exists', userId, 'fetch from db')
      const { dispatch } = this.props
      dispatch(fetchUser(userId))
    }
  }

  renderDateStart () {
    // console.log(this.props);
    if (!_.isUndefined(this.props.dateStart)) {
      return (
        <Row type='flex' justify='center'>
          <Col span={colSpan1} style={styles.titleStyle}> Date from: </Col>
          <Col span={colSpan2} style={styles.valueStyle}> {new Date(this.props.dateStart).toLocaleString('en-US')}</Col>
        </Row>
      )
    } else {
      return
    }
  }

  renderDateEnd () {
    // console.log(this.props);
    if (!_.isUndefined(this.props.dateEnd)) {
      return (
        <Row type='flex' justify='center'>
          <Col span={colSpan1} style={styles.titleStyle}> Date to: </Col>
          <Col span={colSpan2} style={styles.valueStyle}> {new Date(this.props.dateEnd).toLocaleString('en-US')}</Col>
        </Row>
      )
    } else {
      return
    }
  }

  render () {
    const userId = this.props.userId
    // console.log('user info render', userId)

    if (_.has(this.props.users, userId)) {
      const user = this.props.users[userId]
      return (
        <Col span='24' style={styles.infoStyle}>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Id: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {userId} </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Name: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {user.name}</Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Phone: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {user.phone}</Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={colSpan1} style={styles.titleStyle}> Email: </Col>
            <Col span={colSpan2} style={styles.valueStyle}> {user.email}</Col>
          </Row>
          {this.renderDateStart()}
          {this.renderDateEnd()}
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

UserInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    users: state.users
  })

export default connect(
  mapStateToProps
)(UserInfo)
