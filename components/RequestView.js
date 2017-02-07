'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import UserInfo from './UserInfo'
import { DatePicker, TimePicker, Button, Form, Row, Col, Checkbox, message } from 'antd'
import localeDP from 'antd/lib/date-picker/locale/en_US'
import { applyRequest } from '../actions/RequestActions'
const FormItem = Form.Item
const createForm = Form.create

import ChooseSalonMap from './ChooseSalonMap'

class RequestView extends Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedSalon: {}
    }
  }

  disabledHours () {
    let hours = newArray(0, 60)
    hours.splice(8, 15)
    return hours
  }

  disabledMinutes (h) {
    return newArray(0, 60).filter(value => value % 10 !== 0)
  }

  handleSelectSalon (salon) {
    this.setState({selectedSalon: salon})
  }

  checkDate (rule, value, callback) {
    callback()
  }

  checkTime (rule, value, callback) {
    callback()
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      console.log('form values', values)
      if (_.isUndefined(this.state.selectedSalon.address)) {
        message.info('select salon, please', 3)
      } else {
        if (errors) {
          console.log('Errors in form!!!')
          return
        }
        const d = values.date
        const t = values.time
        const dateUtc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), t.getUTCHours(), t.getUTCMinutes())
        const res = {
          date: new Date(dateUtc),
          sendSms: values.sendSms,
          sendEmail: values.sendEmail
        }
        // console.log('res', res)

        const { dispatch } = this.props
        dispatch(applyRequest(this.props.req, this.state.selectedSalon, res))
      }
    })
  }

  renderSalonInfo () {
    if (_.isUndefined(this.state.selectedSalon.address)) {
      return (
        <p style={styles.desc}>Click on a marker to select salon</p>
      )
    } else {
      return (
        <div>
          <p style={styles.salonName}>{this.state.selectedSalon.name}</p>
          <p style={styles.salonAddress}>{this.state.selectedSalon.address}</p>
        </div>
      )
    }
  }

  renderBookingRes () {
    const { getFieldProps } = this.props.form
  //  console.log(getFieldProps);
    const dateProps = getFieldProps('date', { rules: [ {required: true, type: 'date'}, {validator: this.checkDate} ] })
    const timeProps = getFieldProps('time', { rules: [ {required: true, type: 'date'}, {validator: this.checkTime} ] })
    const sendSmsProps = getFieldProps('sendSms', { rules: [ {required: false, type: 'boolean'} ], valuePropName: 'checked', initialValue: true })
    const sendEmailProps = getFieldProps('sendEmail', { rules: [ {required: false, type: 'boolean'} ], valuePropName: 'checked', initialValue: true })

    return (
      <Row type='flex' justify='center'>
        <Col span='24'>
          <Form horizontal>
            <FormItem
              label=''
              wrapperCol={{ span: 16, offset: 6 }}
            >
              <DatePicker id='date' locale={{...localeDP, ...customLocale}} {...dateProps}/>
            </FormItem>

            <FormItem
              label=''
              wrapperCol={{ span: 16, offset: 6 }}
            >
              <TimePicker
                locale={{calendar: { timezoneOffset }, placeholder: 'Select time'}}
                format='HH:mm'
                disabledMinutes={this.disabledMinutes}
                disabledHours={this.disabledHours}
                hideDisabledOptions
                {...timeProps}/>
            </FormItem>

            <FormItem
              label=''
              wrapperCol={{ span: 20, offset: 4 }}>
              <div id='salon_info' name='salon_info'>{this.renderSalonInfo()}</div>
            </FormItem>

            <FormItem
              label='Notify by sms:'
              labelCol= {{ span: 12, offset: 2 }}
              wrapperCol={{ span: 4, offset: 1 }}>
              <Checkbox id='sendSms' {...sendSmsProps} defaultChecked/>
            </FormItem>

            <FormItem
              label='Notify by email:'
              labelCol= {{ span: 12, offset: 2 }}
              wrapperCol={{ span: 4, offset: 1 }}>
              <Checkbox id='sendEmail' {...sendEmailProps} defaultChecked/>
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 7 }}>
              <Button type='primary' htmlType='submit' style={styles.button} onClick={this.handleSubmit.bind(this)}>APPLY</Button>
            </FormItem>

          </Form>
        </Col>
      </Row>

    )
  }

  render () {
  //  console.log(this.props.req)
    return (
      <div>
        <Row type='flex' justify='center'>
          <Col span='6' style={styles.header}>Client</Col>
          <Col span='12' style={styles.header}>Salon</Col>
          <Col span='6' style={styles.header}>Booking</Col>
        </Row>
        <Row type='flex' justify='center' style={styles.container}>
          <Col span='6'>
            <Row>
              <UserInfo
                userId={this.props.req.userId}
                dateStart={this.props.req.dateStart}
                dateEnd={this.props.req.dateEnd}/>
            </Row>
          </Col>
          <Col span='12'>
            <ChooseSalonMap
              onSelectSalon={this.handleSelectSalon.bind(this)}
              req={this.props.req} />
          </Col>
          <Col span='6'>{this.renderBookingRes()}</Col>
        </Row>
      </div>
    )
  }
}

const timezoneOffset = -(new Date().getTimezoneOffset())
const customLocale = {
  timezoneOffset: timezoneOffset / -60,
  firstDayOfWeek: 0,
  minimalDaysInFirstWeek: 1
}

function newArray (start, end) {
  let result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

const styles = {
  container: {
    paddingTop: 20
  },
  bookingResRow: {
    paddingTop: 10
  },
  bookingValue: {
    margin: 'auto',
    width: 130
  },
  header: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic'
  },
  desc: {
    color: 'red'
  },
  salonName: {
    color: 'blue',
    textAlign: 'center'
  },
  salonAddress: {
    textAlign: 'center'
  },
  button: {
    width: 130
  }
}

RequestView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired,
  salons: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  req: PropTypes.object.isRequired
}

RequestView = createForm()(RequestView)

const mapStateToProps = (state) => (
  {
    requests: state.requests,
    salons: state.salons
  })

export default connect(
  mapStateToProps
)(RequestView)
