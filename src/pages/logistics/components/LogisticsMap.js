import React, { PureComponent } from 'react'
import { Card, Icon } from 'antd'
import { connect } from "dva/index"
import BMap from 'BMap'
import MapDetail from './MapDetail'
import { withRouter } from "react-router";

class LogisticsMap extends PureComponent {

  componentDidMount() {
    let map = new BMap.Map('mapContainer')
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    map.enableScrollWheelZoom(true)
  }

  hideMap = () => {
    this.props.dispatch({
      type: 'logisticsDetail/save',
      payload: {
        showMap: false
      }
    })
    this.props.dispatch({
      type: 'orderDetail/save',
      payload: {
        showMap: false
      }
    })
  }

  getData = () => {
    debugger
    if (this.props.location.pathname.indexOf('/order') === 0) {
      return this.props.currentOrder
    } else {
      return this.props.currentLogistics
    }
  }

  render() {
    const currentLogistics = this.getData()
    const char = this.props.location.pathname.indexOf('/order') === 0 ? '订' : '运'
    return (
      <Card bodyStyle={{transition: 'all 0.5s', padding: 0}}
            style={{borderColor: '#e8e8e8', marginBottom: 10}}
            title={<div style={{color: '#545F76', cursor: 'pointer', fontWeight: 600}} onClick={this.hideMap}>
              <Icon type="left" theme="outliwned"/>&nbsp;&nbsp;返回{char}单详情</div>}
            extra={<div><span
              style={{color: '#545F76', fontSize: 15}}>运单编号：{currentLogistics.deliver_code}</span><span
              style={{fontSize: 15, paddingLeft: 50, color: '#aaa'}}>创建时间：{currentLogistics.create_time}</span>
            </div>}>
        <MapDetail currentLogistics={currentLogistics}/>
        <div className="mapContainer" id="mapContainer"></div>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const {currentLogistics} = state.logistics
  const {currentOrder} = state.order
  return {
    currentLogistics,
    currentOrder,
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(withRouter(LogisticsMap))
