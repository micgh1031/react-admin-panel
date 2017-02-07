import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { sendTestEmail } from '../actions/NotifyActions'

const FormItem = Form.Item
const createForm = Form.create

class TestEmail extends Component {

  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log('Errors in form!!!')
        return
      }
      console.log('Submit!!!')
      console.log(values)
      const { dispatch } = this.props
      const mail = {
        email: values.email,
        userName: 'John Doe',
        bookingDate: new Date().toLocaleString('en-US'),
        salonName: 'Starbucks',
        address: '11049 Santa Monica Blvd, Los Angeles, CA 90025'
      }
      dispatch(sendTestEmail(mail))
      // this.resetForm()
      // message.success('New pack is created!', 3)
    })
  }

  render () {
    const { getFieldProps } = this.props.form
    const emailProps = getFieldProps('email', { rules: [ { required: true } ] })
    return (
      <Form inline>
        <FormItem
          label='Email: '>
          <Input id='email' {...emailProps} />
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' onClick={this.handleSubmit.bind(this)}>SEND EMAIL</Button>
        </FormItem>
      </Form>
    )
  }
}



TestEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

TestEmail = createForm()(TestEmail)

const mapStateToProps = (state) => (
  {
  }
)

export default connect(
  mapStateToProps
)(TestEmail)
