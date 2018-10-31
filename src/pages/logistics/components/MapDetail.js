import React, { PureComponent } from 'react'
import LogisticsStep from './LogisticsStep'
import { Row, Col } from 'antd'


class MapDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showDetail: false,
    }
  }

  toggleMapDetail = (e) => {
    e.stopPropagation()
    this.setState({
      showDetail: !this.state.showDetail,
    })
  }

  render() {
    const currentLogistics = this.props.currentLogistics
    return (
      <div>
        <div className='map-title' style={this.state.showDetail ? {top: 255} : {}}>
          <Row>
            <Col span={3} className='needLine'>
              <div className='map-title-item' style={{cursor: 'pointer'}} onClick={this.toggleMapDetail}>
                <div className={currentLogistics.deliver_status >= 3 ? 'poitionBtn-B' : 'poitionBtn'}></div>
                <div style={{
                  color: '#777777',
                  fontSize: 14,
                  marginTop: 19,
                  marginLeft: 2,
                }}>{currentLogistics.status_name ? currentLogistics.status_name.substr(0, 3) : currentLogistics.status_name}</div>
                <div className='expendBtn' style={this.state.showDetail ? {transform: 'rotate(-180deg)'} : {}}></div>
              </div>
            </Col>
            <Col span={7} className='needLine'>
              <div className='map-title-item' style={{textAlign: 'center'}}>
                <Col span={9}>
                  <div className='map-title-item-status'>
                    <div>当前已行驶</div>
                    <div>{this.props.alreadyDriven}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className='map-title-item-status'>
                    <div>还需时长</div>
                    <div>{this.props.stillNeedTime}</div>
                  </div>
                </Col>
                <Col span={7}>
                  <div className='map-title-item-status'>
                    <div>总运距</div>
                    <div>{this.props.totalDistance}</div>
                  </div>
                </Col>
              </div>
            </Col>
            <Col span={6} className='needLine'>
              <div className='map-title-item'>
                <div>
                  <div className='map-title-car'></div>
                  <div style={{color: '#999999', marginLeft: 8, marginTop: 1}}>车辆</div>
                </div>
                {currentLogistics.driver_name ?
                  <div style={{marginTop: 10, marginLeft: 15, color: '#000000', fontSize: 14}}>
                    <div title={currentLogistics.car_head}>{currentLogistics.car_head}</div>
                    <div
                      title={currentLogistics.driver_name + ' ' + currentLogistics.driver_mobile}>{currentLogistics.driver_name} {currentLogistics.driver_mobile}</div>
                  </div> :
                  <div style={{color: '#000', marginTop: 20, marginLeft: 12}}>暂无车辆信息（待调度）</div>
                }
              </div>
            </Col>
            <Col span={8}>
              <div className='map-title-item' style={{color: '#999999'}}>
                <div style={{
                  display: 'block', paddingLeft: 25, position: 'relative', marginTop: 5, maxWidth: 234,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                  <span className='greenMarker'></span>
                  <span>发货地：</span>
                  <span style={{color: '#697087'}}
                        title={currentLogistics.cargo_province ? currentLogistics.cargo_province + currentLogistics.cargo_city + (currentLogistics.cargo_area ? currentLogistics.cargo_area : '') : '暂无'}>
                {currentLogistics.cargo_province ? currentLogistics.cargo_province + currentLogistics.cargo_city + (currentLogistics.cargo_area ? currentLogistics.cargo_area : '') : '暂无'}
              </span>
                </div>
                <div style={{
                  height: 1,
                  backgroundColor: '#F0F0F0',
                  display: 'block',
                  marginTop: 5,
                  marginBottom: 3,
                }}></div>
                <div style={{
                  display: 'block', paddingLeft: 25, position: 'relative', marginTop: 2, maxWidth: 234,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                  <span className='redMarker'></span>
                  <span>收货地：</span>
                  <span style={{color: '#697087'}}
                        title={currentLogistics.delivery_province ? currentLogistics.delivery_province + currentLogistics.delivery_city + (currentLogistics.delivery_area ? currentLogistics.delivery_area : '') : '暂无'}>
                {currentLogistics.delivery_province ? currentLogistics.delivery_province + currentLogistics.delivery_city + (currentLogistics.delivery_area ? currentLogistics.delivery_area : '') : '暂无'}
              </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='map-detail' style={this.state.showDetail ? {height: 180} : {}}>
          <LogisticsStep currentLogistics={currentLogistics} style={{margin: '70px -60px 130px'}}/>
        </div>
      </div>
    )
  }
}

export default MapDetail
