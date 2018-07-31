import React from 'react'
import { Cascader } from 'antd'
import { connect } from 'dva'
import { routerRedux } from "dva/router"

class Cascade extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        district_code: ''
      }
    })
  }

  render() {
    return (
      <Cascader></Cascader>
    )
  }
}

function mapStateToProps(state) {
  const {CascaderOptions} = state.maintain
  return {
    CascaderOptions,
  }
}

export default connect(mapStateToProps)(Cascade)
