import React, { Component } from 'react'

export default class Header extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <p style={styles.headerStyle}>
          Vurve admin panel
      </p>
    )
  }
}

const styles = {
  headerStyle: {
    textAlign: 'center',
    fontSize: 36,
    fontStyle: 'italic',
    paddingTop: 20
  }
}
