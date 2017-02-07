import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import * as _ from 'lodash'
import AddSalon from './AddSalon'
import { compareString } from '../common/utils'

class Salons extends Component {

  constructor (props) {
    super(props)
  }

  stringSort (a, b) {
    const aname = a.name.toUpperCase()
    const bname = b.name.toUpperCase()
    console.log(aname, bname)
    return (aname < bname) ? -1 : (aname > bname) ? 1 : 0
  }

  columns () {
    return [
       { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => compareString(a.name, b.name) },
       { title: 'Address', dataIndex: 'address', key: 'address' },
       { title: 'Phone', dataIndex: 'phone', key: 'phone' },
       { title: 'Site url', dataIndex: 'webSite', key: 'webSite', render (url) { return <a href={url} target='blank'>{url}</a> } },
       { title: 'Email', dataIndex: 'email', key: 'email' }
    ]
  }

  render () {
    const dataSource = _.values(this.props.salons)
    return (
      <Table columns={this.columns()}
        expandedRowRender={record => <AddSalon salon={record}/>}
        dataSource={dataSource}
        className='table'
        pagination={{ pageSize: 12, total: dataSource.length }}
        rowKey={record => record.id}/>
    )
  }
}

Salons.propTypes = {
  dispatch: PropTypes.func.isRequired,
  salons: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
    salons: state.salons
  })

export default connect(
  mapStateToProps
)(Salons)
