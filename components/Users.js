'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import * as _ from 'lodash'
import UsersPacks from './UsersPacks'

class Users extends Component {

  constructor (props) {
    super(props)
  }

  renderBlowoutsCount (text, row, index) {
    let cnt = 0
    if (_.has(row, 'curPacks')) {
      for (let p in row.curPacks) {
        cnt += parseInt(row.curPacks[p].curCount, 10)
      }
    }
    return cnt
  }

  columns () {
    return [
       { title: 'Name', dataIndex: 'name', key: 'name' },
       { title: 'Phone', dataIndex: 'phone', key: 'phone' },
       { title: 'Email', dataIndex: 'email', key: 'email' },
       { title: 'Available blowouts', dataIndex: 'available', key: 'available', render: this.renderBlowoutsCount }
    ]
  }

  render () {
    const dataSource = _.values(this.props.users)
    return (
      <Table columns={this.columns()}
        expandedRowRender={record => <UsersPacks user={record}/>}
        dataSource={dataSource}
        className='table'
        pagination={{ pageSize: 12, total: dataSource.length }}
        rowKey={record => record.id}/>
    )
  }
}

Users.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
    users: state.users
  })

export default connect(
  mapStateToProps
)(Users)
