import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Table, Col, Row } from 'antd'
import BookingView from './BookingView'

class C extends Component {
  constructor (props) {
    super(props)
  }

  renderDate (text, row, index) {
    return new Date(text).toLocaleString('en-US')
  }

  columns () {
    return [
       { title: 'Created at', dataIndex: 'processedAt', key: 'processedAt', render: this.renderDate, sorter: true },
       { title: 'Expiry time', dataIndex: 'expiryTime', key: 'expiryTime', render: this.renderDate },
       { title: 'Current count', dataIndex: 'curCount', key: 'curCount' },
       { title: 'Full count', dataIndex: 'fullCount', key: 'fullCount' }
    ]
  }

  makeTableDataSource () {
    const packs = this.props.user.curPacks
    const res = (
      _.map(
        _.keys(packs), function (pId) {
          const p = packs[pId]
          p.key = pId
          return p
        }
      )
    )
    return res
  }

  renderBookings (pack) {
    if (pack && pack.bookings) {
      return (
        <Col span='24'>
          {
            _.map(_.keys(pack.bookings), (bId) => (
                <Row>
                  <BookingView bId={bId}/>
                </Row>
              )
            )
          }
        </Col>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <Table columns={this.columns()}
        expandedRowRender={record => this.renderBookings(record) }
        dataSource={this.makeTableDataSource()}
        className='table' />
    )
  }

}

C.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
  })

export default connect(
  mapStateToProps
)(C)
