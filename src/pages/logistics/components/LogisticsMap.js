import React, { PureComponent } from 'react'
import { Card, Icon } from 'antd'
import { connect } from "dva/index"
import BMap from 'BMap'
import MapDetail from './MapDetail'


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
  }

  render() {
    const {currentLogistics} = this.props
    return (
      <Card bodyStyle={{transition: 'all 0.5s', padding: 0}}
            style={{borderColor: '#e8e8e8', marginBottom: 10}}
            title={<div style={{color: '#545F76', cursor: 'pointer', fontWeight: 600}} onClick={this.hideMap}>
              <Icon type="left" theme="outliwned"/>&nbsp;&nbsp;返回运单详情</div>}
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
  const {showMap} = state.logisticsDetail
  return {
    currentLogistics,
    showMap,
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(LogisticsMap)
