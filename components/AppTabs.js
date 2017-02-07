'use strict'
import React, { Component } from 'react'
import { Tabs, Col, Row } from 'antd'
const TabPane = Tabs.TabPane
import BookingRequests from './BookingRequests'
import Salons from './Salons'
import AddSalon from './AddSalon'
import Bookings from './Bookings'
import Users from './Users'
import Packs from './Packs'
import StripeCheckout from './StripeCheckout'
import TestEmail from './TestEmail'
import TestSms from './TestSms'
import Canceled from './Canceled'

export default class AppTabs extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={baseStyle}>
        <Tabs onChange={this.callback} type='line'>

          <TabPane tab='Requests' key='1'>
            <BookingRequests/>
          </TabPane>

          <TabPane tab='Canceled' key='2'>
            <Canceled/>
          </TabPane>

          <TabPane tab='Bookings' key='3'>
            <Bookings/>
          </TabPane>

          <TabPane tab='Salons' key='4'>
            <Salons/>
          </TabPane>

          <TabPane tab='AddSalon' key='5'>
            <AddSalon/>
          </TabPane>

          <TabPane tab='Clients' key='6'>
            <Users/>
          </TabPane>

          <TabPane tab='Packs' key='7'>
            <Packs/>
          </TabPane>

          {/* <TabPane tab='Reports' key='7'>
            <Loading/>
          </TabPane> */}

          <TabPane tab='Tests' key='8'>
            <Row>
              <Col span='4'>
                <StripeCheckout/>
              </Col>
              <Col span='8'>
                <TestEmail/>
              </Col>
              <Col span='8'>
                <TestSms/>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const baseStyle = {
  'paddingTop': '20px'
}
