import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table, Row, Button, Form, Input, message, Switch } from 'antd'
import * as _ from 'lodash'
import { newPack, enablePack } from '../actions/PackActions'

const FormItem = Form.Item
const createForm = Form.create

class Packs extends Component {

  constructor (props) {
    super(props)
  }

  resetForm () {
    this.props.form.resetFields()
  }

  enablePack (packId, isEnabled) {
    console.log(packId, isEnabled)
    const { dispatch } = this.props
    dispatch(enablePack(packId, isEnabled))
  }

  renderIsEnabled (text, row, index) {
    return (
      <Switch defaultChecked={text} onChange={(isEnabled) => this.enablePack(row.id, isEnabled)} />
    )
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
      dispatch(newPack(values))
      this.resetForm()
      message.success('New pack is created!', 3)
    })
  }

  columns () {
    return [
       { title: 'Blowouts count', dataIndex: 'count', key: 'count', sorter: (a, b) => a.count - b.count },
       { title: 'Price per one', dataIndex: 'price_per_one', key: 'price_per_one', sorter: (a, b) => a.price_per_one - b.price_per_one },
       { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
       { title: 'Saving desc', dataIndex: 'savings', key: 'savings' },
       { title: 'Valid days', dataIndex: 'expiryDays', key: 'expiryDays', sorter: (a, b) => a.expiryDays - b.expiryDays },
       { title: 'Valid desc', dataIndex: 'valid', key: 'valid' },
       { title: 'Is enabled', dataIndex: 'isEnabled', key: 'isEnabled', render: this.renderIsEnabled.bind(this) }
    ]
  }

  render () {
    const { getFieldProps } = this.props.form
    const countProps = getFieldProps('count', { rules: [ { required: true } ] })
    const priceProps = getFieldProps('price', { rules: [ { required: true } ] })
    const pricePerOneProps = getFieldProps('price_per_one', { rules: [ { required: true } ] })
    const expiryDaysProps = getFieldProps('expiryDays', { rules: [ { required: true } ] })
    const savingsProps = getFieldProps('savings', { rules: [ { required: true } ] })
    const validProps = getFieldProps('valid', { rules: [ { required: true } ] })
    const dataSource = _.values(this.props.packs)
    return (
      <div>
        <Table columns={this.columns()}
          dataSource={dataSource}
          className='table'
          pagination={{ pageSize: 12, total: dataSource.length }}
          rowKey={record => record.id}/>

        <Row type='flex' justify='center'>
          <Form>
            <FormItem
              label='Blowouts count: '>
              <Input id='count' {...countProps} />
            </FormItem>
            <FormItem
              label='Price per blowout：'>
              <Input id='price_per_one' {...pricePerOneProps} />
            </FormItem>
            <FormItem
              label='Pack price: '>
              <Input id='price' {...priceProps} />
            </FormItem>
            <FormItem
              label='Savings: '>
              <Input id='savings' {...savingsProps} />
            </FormItem>
            <FormItem
              label='Valid up (in days)：'>
              <Input id='expiryDays' {...expiryDaysProps} />
            </FormItem>
            <FormItem
              label='Valid desc：'>
              <Input id='valid' {...validProps} />
            </FormItem>
            <Button type='primary' htmlType='submit' onClick={this.handleSubmit.bind(this)}>ADD</Button>
          </Form>
        </Row>
      </div>
    )
  }
}

Packs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  packs: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

Packs = createForm()(Packs)

const mapStateToProps = (state) => (
  {
    packs: state.packs
  })

export default connect(
  mapStateToProps
)(Packs)
