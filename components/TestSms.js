'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { sendTestSms } from '../actions/NotifyActions'
import * as _ from 'lodash'

const FormItem = Form.Item
const createForm = Form.create

class TestSms extends Component {

  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!', errors, values)
        return
      }
      console.log('Submit!!!')
      console.log(values)
      const { dispatch } = this.props
      const sms = {
        to: values.phone,
        createdAt: _.now(),
        message: `You booked a visit at ${new Date().toLocaleString('en-US')} to the Hairroin Salon, 600 W 9th St, Los Angeles, CA 90015`
      }
      dispatch(sendTestSms(sms))
    })
  }

  render () {
    const { getFieldProps } = this.props.form
    const phoneProps = getFieldProps('phone', { rules: [ { required: true } ] })
    return (
      <Form inline>
        <FormItem
          label='Phone: '>
          <Input id='phone' {...phoneProps} />
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' onClick={this.handleSubmit.bind(this)}>SEND SMS</Button>
        </FormItem>
      </Form>
    )
  }
}

TestSms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

TestSms = createForm()(TestSms)

const mapStateToProps = (state) => (
  {
  }
)

export default connect(
  mapStateToProps
)(TestSms)
