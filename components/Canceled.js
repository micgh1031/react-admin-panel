import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table, Icon } from 'antd'
import BookingView from './BookingView'
import Loading from './Loading'
import { fetchUser } from '../actions/UserActions'
import * as _ from 'lodash'

class Canceled extends Component {

  constructor (props) {
    super(props)
  }

  renderCreatedAt (text, row, index) {
    return new Date(text).toLocaleString('en-US')
  }

  renderBookedAt (text, row, index) {
//    console.log('renderBookedAt', text, row, index)
    return new Date(row.booking.booking).toLocaleString('en-US')
  }

  renderUserName (text, row, index) {
    // console.log('renderUserName users', this.props.users)
    // console.log('renderUserName row', row)
    const uid = row.userId
    // console.log('renderUserName uid', uid)
    if (_.has(this.props.users, uid)) {
      const user = this.props.users[uid]
      return (user.name)
    } else {
      const { dispatch } = this.props
      dispatch(fetchUser(uid))
      return (
        <Loading/>
      )
    }
  }

  renderNotified (text, row, index) {
    if (_.has(row, 'notified')) {
      return (
        <Icon type='check' />
      )
    }
  }

  columns () {
    return [
      {
        title: 'Client',
        dataIndex: 'userName',
        key: 'userName',
        render: this.renderUserName.bind(this),
        sorter: (a, b) => a - b
      },
      {
        title: 'Canceled at',
        dataIndex: 'dateCanceled',
        key: 'dateCanceled',
        render: this.renderCreatedAt,
        sorter: (a, b) => a - b
      },
      {
        title: 'Created at',
        dataIndex: 'dateCreate',
        key: 'dateCreate',
        render: this.renderCreatedAt,
        sorter: (a, b) => a - b
      },
      {
        title: 'Notified',
        dataIndex: 'notified',
        key: 'notified',
        render: this.renderNotified,
        sorter: (a, b) => a - b
      }
    ]
  }

  makeDataSource () {
    const data = []
    for (let id in this.props.bookings) {
      const b = this.props.bookings[id]
      if (_.has(b, 'dateCanceled')) {
        data.push(b)
      }
    }
    return data
  }

  render () {
    const dataSource = this.makeDataSource()
    return (
      <Table columns={this.columns()}
        expandedRowRender={record => <BookingView bId={record.id} isCanceled/>}
        dataSource={dataSource}
        className='table'
        pagination={{ pageSize: 12, total: dataSource.length }}
        rowKey={record => record.id}/>
    )
  }
}

Canceled.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bookings: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    bookings: state.bookings,
    users: state.users
  })

export default connect(
  mapStateToProps
)(Canceled)
