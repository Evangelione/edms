import React, { PureComponent } from 'react'
import { Card, Icon, notification } from 'antd'
import { connect } from "dva/index"
import BMap from 'BMap'
import BMapLib from 'BMapLib'
import MapDetail from './MapDetail'
import { withRouter } from "react-router";

class LogisticsMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alreadyDriven: 0,
      stillNeedTime: 0,
      totalDistance: 0,
      map: 0
    }
  }

  componentDidMount() {
    // 定义变量存储map对象
    let map = this.state.map
    // 如果map存在，则清除map所有覆盖物，不存在则创建地图
    if (!this.state.map) {
      map = new BMap.Map('mapContainer')
      this.setState({map})
    } else {
      map.clearOverlays()
    }
    // 可以拖动
    map.enableScrollWheelZoom(true)
    // 设置中心点
    map.centerAndZoom('杭州', 8)
    // 定义传地名获取点的对象
    let myGeo = new BMap.Geocoder()
    // 定义开始，结束图标
    let IconStart = new BMap.Icon(require('../../../assets/image/start_22_22.png'), new BMap.Size(19, 23))
    let IconEnd = new BMap.Icon(require('../../../assets/image/end_22_22.png'), new BMap.Size(19, 23))
    // 定义3个测距方法
    let transitS_C = new BMap.DrivingRoute(map, {
      onSearchComplete: this.setAlreadyDriven,
    })
    let transitC_E = new BMap.DrivingRoute(map, {
      onSearchComplete: this.setStillNeedTime,
    })
    let transitS_E = new BMap.DrivingRoute(map, {
      onSearchComplete: this.setTotalDistance,
    })
    // 定义data来存储当前订单信息
    let data = {}
    // 判断当前是订单地图还是物流地图
    if (this.props.location.pathname.indexOf('/order') === 0) {
      data = this.props.currentOrder
      // 获取订单地图数据
      this.props.dispatch({
        type: 'home/getOrderMapData',
        payload: {
          id: data.id
        }
      }).then(() => {
        // 如果订单数据没有代表司机未接单，则为0
        if (this.props.orderMapData === 0) {
          notification.error({
            message: '温馨提示',
            description: '暂无司机接单',
            duration: 6,
          })
          return false
        }
        // 定义当前所在位置
        let currentPoint
        if (this.props.orderMapData.gps2 !== []) {
          currentPoint = new BMap.Point(this.props.orderMapData.gps2[this.props.orderMapData.gps2.length - 1].lng, this.props.orderMapData.gps2[this.props.orderMapData.gps2.length - 1].lat)
          map.centerAndZoom(currentPoint, 8)
        }
        // 定义起点位置
        let startPoint
        let endPoint
        myGeo.getPoint(data.detailed_address, (point) => {
          if (point) {
            startPoint = point
            map.addOverlay(new BMap.Marker(point, {icon: IconStart}))
            // 定义终点位置
            myGeo.getPoint(data.detaileds_address, (point) => {
              if (point) {
                endPoint = point
                map.addOverlay(new BMap.Marker(point, {icon: IconEnd}))
                // 画线
                if (this.props.orderMapData.gps1 !== []) {
                  let lineData = this.serializationPoint(this.props.orderMapData.gps1)
                  let polygon = new BMap.Polyline(lineData, {
                    strokeColor: "#979797",
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                  })
                  map.addOverlay(polygon)
                }
                if (this.props.orderMapData.gps2 !== []) {
                  let lineData = this.serializationPoint(this.props.orderMapData.gps2)
                  let polygon = new BMap.Polyline(lineData, {
                    strokeColor: "#5186f4",
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                  })
                  map.addOverlay(polygon)
                }
                transitS_E.search(startPoint, endPoint)
                transitS_C.search(startPoint, currentPoint)
                transitC_E.search(currentPoint, endPoint)
              } else {
                notification.error({
                  message: '错误！',
                  description: '终点地址没有解析到结果!',
                  duration: 6,
                })
              }
            }, data.delivery_city)
          } else {
            notification.error({
              message: '错误！',
              description: '起点地址没有解析到结果!',
              duration: 6,
            })
          }
        }, data.cargo_city)
      })
    } else {
      data = this.props.currentLogistics
      // 获取订单地图数据
      this.props.dispatch({
        type: 'home/getLogMapData',
        payload: {
          id: data.id
        }
      }).then(() => {
        // 如果订单数据没有代表司机未接单，则为0
        if (this.props.logMapData === 0) {
          notification.error({
            message: '温馨提示',
            description: '暂无司机接单',
            duration: 6,
          })
          return false
        }
        // 定义当前所在位置
        let currentPoint
        if (this.props.logMapData.gps2 !== []) {
          currentPoint = new BMap.Point(this.props.logMapData.gps2[this.props.logMapData.gps2.length - 1].lng, this.props.logMapData.gps2[this.props.logMapData.gps2.length - 1].lat)
          map.centerAndZoom(currentPoint, 8)
        }
        // 定义起点位置
        let startPoint
        let endPoint
        myGeo.getPoint(data.detailed_address, (point) => {
          if (point) {
            startPoint = point
            map.addOverlay(new BMap.Marker(point, {icon: IconStart}))
            // 定义终点位置
            myGeo.getPoint(data.detaileds_address, (point) => {
              if (point) {
                endPoint = point
                map.addOverlay(new BMap.Marker(point, {icon: IconEnd}))
                // 画线
                if (this.props.logMapData.gps1 !== []) {
                  let lineData = this.serializationPoint(this.props.logMapData.gps1)
                  let polygon = new BMap.Polyline(lineData, {
                    strokeColor: "#979797",
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                  })
                  map.addOverlay(polygon)
                }
                if (this.props.logMapData.gps2 !== []) {
                  let lineData = this.serializationPoint(this.props.logMapData.gps2)
                  let polygon = new BMap.Polyline(lineData, {
                    strokeColor: "#5186f4",
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                  })
                  map.addOverlay(polygon)
                }
                transitS_E.search(startPoint, endPoint)
                transitS_C.search(startPoint, currentPoint)
                transitC_E.search(currentPoint, endPoint)
              } else {
                notification.error({
                  message: '错误！',
                  description: '终点地址没有解析到结果!',
                  duration: 6,
                })
              }
            }, data.delivery_city)
          } else {
            notification.error({
              message: '错误！',
              description: '起点地址没有解析到结果!',
              duration: 6,
            })
          }
        }, data.cargo_city)
      })
    }
  }

  setAlreadyDriven = (results) => {
    let plan = results.getPlan(0)
    this.setState({
      alreadyDriven: plan.getDistance(true),
    })
  }

  setStillNeedTime = (results) => {
    let plan = results.getPlan(0)
    let currentPoint, beforePoint, data
    if (this.props.location.pathname.indexOf('/order') === 0) {
      data = this.props.orderMapData
    } else {
      data = this.props.logMapData
    }
    if (data.gps2 !== [] && data.gps2.length >= 2) {
      currentPoint = new BMap.Point(data.gps2[data.gps2.length - 1].lng, data.gps2[data.gps2.length - 1].lat)
      beforePoint = new BMap.Point(data.gps2[data.gps2.length - 2].lng, data.gps2[data.gps2.length - 2].lat)
    } else if (data.gps1 !== [] && data.gps1.length >= 2) {
      currentPoint = new BMap.Point(data.gps1[data.gps1.length - 1].lng, data.gps1[data.gps1.length - 1].lat)
      beforePoint = new BMap.Point(data.gps1[data.gps1.length - 2].lng, data.gps1[data.gps1.length - 2].lat)
    }
    let arrPois = []
    for (let j = 0; j < plan.getNumRoutes(); j++) {
      let route = plan.getRoute(j)
      arrPois = arrPois.concat(route.getPath())
    }
    // 预计走的路线
    // this.state.map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}))
    // this.state.map.setViewport(arrPois)
    this.setState({
      stillNeedTime: plan.getDuration(true),
    })
    let IconCar = new BMap.Icon(require('../../../assets/image/che.svg'), new BMap.Size(36, 16))
    debugger
    if (currentPoint && beforePoint) {
      new BMapLib.LuShu(this.state.map, [beforePoint, currentPoint], {
        defaultContent: "",
        autoView: true,
        icon: IconCar,
        speed: 4500,
        enableRotation: true,
        landmarkPois: []
      }).start()
    } else {
      this.state.map.addOverlay(new BMap.Marker(currentPoint, {icon: IconCar}))
    }
  }

  setTotalDistance = (results) => {
    let plan = results.getPlan(0)
    this.setState({
      totalDistance: plan.getDistance(true),
    })
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

  serializationPoint = (data) => {
    let arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(new BMap.Point(data[i].lng, data[i].lat))
    }
    return arr
  }

  getData = () => {
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
        <MapDetail currentLogistics={currentLogistics}
                   alreadyDriven={this.state.alreadyDriven}
                   stillNeedTime={this.state.stillNeedTime}
                   totalDistance={this.state.totalDistance}/>
        <div className="mapContainer" id="mapContainer"></div>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const {currentLogistics, currentOrder, orderMapData, logMapData} = state.home
  return {
    currentLogistics,
    currentOrder,
    orderMapData,
    logMapData,
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(withRouter(LogisticsMap))
