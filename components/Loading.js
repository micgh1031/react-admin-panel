import React, { Component } from 'react'
import { Spin } from 'antd'

export default class Loading extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={styles.container}>
        <Spin/>
      </div>
    )
  }
}
const styles = {
  container: {
    textAlign: 'center'
  }
}
