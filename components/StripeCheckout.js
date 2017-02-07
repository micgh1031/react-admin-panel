'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { makeCharge } from '../actions/UserActions'
import StripeCheckout from 'react-stripe-checkout'

class StripeTest extends Component {

  constructor (props) {
    console.log(StripeCheckout)
    super(props)
  }

  onToken (data) {
    console.log('OnToken', data)
    const { dispatch } = this.props
    dispatch(makeCharge(data))
  }

  render () {
    const metadata = {
      userId: 'testUserId',
      packId: 'pack1'
    }
    return (
      <StripeCheckout
        token={this.onToken.bind(this)}
        stripeKey='pk_test_rFMZtqhhT06pf5c5poe7Tg0T'
        metadata={metadata}/>
    )
  }
}

StripeTest.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
  {
  }
)

export default connect(
  mapStateToProps
)(StripeTest)
