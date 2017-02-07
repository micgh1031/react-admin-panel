'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddSalonMap from './AddSalonMap'
import { Form, Input, Button, TimePicker } from 'antd'
import { newSalon, editSalon } from '../actions/SalonActions'

const FormItem = Form.Item
const createForm = Form.create

class AddSalon extends Component {

  constructor (props) {
    super(props)

    this.state = {
      address: (this.props.salon) ? this.props.salon.address : '',
      lat: (this.props.salon) ? this.props.salon.lat : '-',
      lng: (this.props.salon) ? this.props.salon.lng : '-',
      buttonTitle: 'ADD'
    }

    if (this.props.salon) {
      this.state.buttonTitle = 'SAVE'
    }
  }

  componentDidMount () {
    if (this.props.salon) {
      const { setFieldsValue, getFieldsValue } = this.props.form
      const s = this.props.salon
      const v = getFieldsValue()
      v.name = s.name
      v.phone = s.phone.toString()
      v.address = s.address
      v.lat = s.lat.toString()
      v.lng = s.lng.toString()
      v.site = s.webSite
      v.email = s.email
      v.contactPerson = s.contactPerson
      v.description = s.description
      setFieldsValue(v)
    }
  }

  resetForm () {
    this.props.form.resetFields()
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!', errors, values)
        return
      }
      console.log('Submit!!!')
      // console.log(values);
      const { dispatch } = this.props
      if (this.props.salon) {
        dispatch(editSalon(this.props.salon.id, values))
      } else {
        dispatch(newSalon(values))
        this.resetForm()
      }
    })
  }

  onMarkerClick (marker) {
    const { setFieldsValue, getFieldsValue } = this.props.form
    const fieldValues = getFieldsValue()
    fieldValues.address = marker.address
    fieldValues.lat = marker.position.lat.toString()
    fieldValues.lng = marker.position.lng.toString()

    setFieldsValue(fieldValues)
  }

  defaultLocation () {
    if (this.props.salon) {
      return this.state
    } else {
      return null
    }
  }

  onChange () {
    console.log("time changed")
  }

  render () {
  //  console.log(this.props.form)
    const { getFieldProps } = this.props.form

    const nameProps = getFieldProps('name', { rules: [ { required: true } ] })
    const addressProps = getFieldProps('address', { rules: [ { required: true } ] })
    const latProps = getFieldProps('lat', { rules: [ { required: true } ] })
    const lngProps = getFieldProps('lng', { rules: [ { required: true } ] })
    const phoneProps = getFieldProps('phone', { rules: [ { required: true } ] })
    const siteProps = getFieldProps('site', { rules: [ { required: false } ] })
    const emailProps = getFieldProps('email', { rules: [ { required: false } ] })
    const contactPersonProps = getFieldProps('contactPerson', { rules: [ { required: false } ] })
    const descriptionProps = getFieldProps('description', { rules: [ { required: false } ] })

    return (
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <div>
          <AddSalonMap
            onSelectMarker={this.onMarkerClick.bind(this)}
            location={this.defaultLocation()}
            />
        </div>
        <div>
          <Form horizontal style={formStyle}>
            <FormItem {...formItemLayout} label='Name: ' >
              <Input id='name' {...nameProps} defaultValue='fsdfasdfasdf'/>
            </FormItem>

            <FormItem {...formItemLayout} label='Address: ' >
              <Input id='address' ref='address' {...addressProps}/>
            </FormItem>

            <FormItem {...formItemLayout} label='lat: ' disabled >
              <Input id='lat' ref='lat' value={this.state.lat} {...latProps} />
            </FormItem>

            <FormItem {...formItemLayout} label='lng: ' disabled >
              <Input id='lng' ref='lng' value={this.state.lng} {...lngProps}/>
            </FormItem>

            <FormItem {...formItemLayout} label='Phone: ' >
              <Input id='phone' {...phoneProps}/>
            </FormItem>

            <FormItem {...formItemLayout} label='Salon website ' >
              <Input id='site_url' {...siteProps}/>
            </FormItem>

            <FormItem {...formItemLayout} label='Prete Profile' >
              <Input id='prete_profile' {...siteProps}/>
            </FormItem>
            <FormItem {...formItemLayout} label='Email: ' >
              <Input id='email' {...emailProps}/>
            </FormItem>

            <FormItem {...formItemLayout} label='Contact person: ' >
              <Input id='contactPerson' {...contactPersonProps} />
            </FormItem>

            <FormItem {...formItemLayout} label='Description: ' >
              <Input id='description' {...descriptionProps} />
            </FormItem>

            <FormItem {...formItemLayout} label='Parking: ' >
              <Input id='parking' {...descriptionProps} />
            </FormItem>

            <FormItem labelCol={{span: 3, offset: 12}} {...formItemLayout} label='Hours of operation ' >
              <div style={{display: 'flex', flexDirection: 'row'}} >

                <TimePicker
                  hideDisabledOptions
                  format={'HH:mm'}
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                  />
                <TimePicker
                  format={'HH:mm'}
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                  />
              </div>
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 7 }}>
              <Button
                type='primary'
                htmlType='submit'
                style={{'width': '130px'}}
                onClick={this.handleSubmit.bind(this)}>
                {this.state.buttonTitle}
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 }
}

const formStyle = {
  width: '100%'
}

AddSalon.propTypes = {
  dispatch: PropTypes.func.isRequired,
  salon: PropTypes.object,
  form: PropTypes.object.isRequired
}

AddSalon = createForm()(AddSalon)

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch
  })

export default connect(
  mapStateToProps
)(AddSalon)
