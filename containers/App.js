import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, LocaleProvider } from 'antd'
import 'antd/dist/antd.css'
import Header from '../components/Header'
import AppTabs from '../components/AppTabs'
import Loading from '../components/Loading'
import { init } from '../actions/InitActions'
import { MODE_INIT } from '../constants/index'
import enUS from 'antd/lib/locale-provider/en_US'

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(init())
  }

  renderTabs () {
    return (
      <Row type='flex' justify='center'>
        <Col span='24'> <AppTabs/> </Col>
      </Row>
    )
  }

  renderLoading () {
    return (
      <Loading/>
    )
  }

  renderMain () {
    console.log(this.props.mode)
    if (this.props.mode === MODE_INIT) {
      return this.renderLoading()
    } else {
      return this.renderTabs()
    }
  }

  render () {
    return (
      <LocaleProvider locale={enUS}>
        <div style={styles.screenStyle}>
          <Row type='flex' justify='center'>
            <Col span='24' > <Header/> </Col>
          </Row>
          {this.renderMain()}
        </div>
      </LocaleProvider>

    )
  }
}

const styles = {
  screenStyle: {
    width: 1000,
    margin: 'auto'
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    mode: state.mode
  })

export default connect(
  mapStateToProps
)(App)
