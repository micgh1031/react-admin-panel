import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import BookingView from './BookingView'
import Loading from './Loading'
import { fetchUser } from '../actions/UserActions'
import * as _ from 'lodash'

class Bookings extends Component {

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
        title: 'Created at',
        dataIndex: 'dateCreate',
        key: 'dateCreate',
        render: this.renderCreatedAt,
        sorter: (a, b) => a - b
      },
      {
        title: 'Booked at',
        dataIndex: 'bookedAt',
        key: 'bookedAt',
        render: this.renderBookedAt,
        sorter: (a, b) => a - b
      }
    ]
  }

  render () {
    const dataSource = _.values(this.props.bookings)
    return (
      <Table columns={this.columns()}
        expandedRowRender={record => <BookingView bId={record.id} />}
        dataSource={dataSource}
        className={'table'}
        pagination={{ pageSize: 12, total: dataSource.length }}
        rowKey={record => record.id}
      />
    )
  }
}

Bookings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bookings: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    bookings: state.bookings,
    users: state.users,
    requests: state.requests
  })

export default connect(
  mapStateToProps
)(Bookings)
