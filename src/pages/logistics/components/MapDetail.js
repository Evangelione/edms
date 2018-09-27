import React, { PureComponent } from 'react'
import LogisticsStep from "./LogisticsStep";

class MapDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showDetail: false
    }
  }

  toggleMapDetail = (e) => {
    e.stopPropagation()
    this.setState({
      showDetail: !this.state.showDetail
    })
  }

  render() {
    const currentLogistics = this.props.currentLogistics
    return (
      <div>
        <div className='map-title' style={this.state.showDetail ? {top: 255} : {}}>
          <div className='map-title-item' style={{cursor: 'pointer'}} onClick={this.toggleMapDetail}>
            <div className={currentLogistics.deliver_status >= 3 ? 'poitionBtn-B' : 'poitionBtn'}></div>
            <div style={{
              color: '#777777',
              fontSize: 14,
              marginTop: 19,
              marginLeft: 10
            }}>{currentLogistics.status_name}</div>
            <div className='expendBtn' style={this.state.showDetail ? {transform: 'rotate(-180deg)'} : {}}></div>
          </div>
          <div className='map-title-item'>
            <div className='map-title-item-status'>
              <div>当前已行驶</div>
              <div>0 公里</div>
            </div>
            <div className='map-title-item-status'>
              <div>还需时长</div>
              <div>1小时43分</div>
            </div>
            <div className='map-title-item-status'>
              <div>总运距</div>
              <div>143.9公里</div>
            </div>
          </div>
          <div className='map-title-item'>
            <div>
              <div className='map-title-car'></div>
              <div style={{color: '#999999', marginLeft: 8, marginTop: 1}}>车辆</div>
            </div>
            {currentLogistics.driver_name ?
              <div style={{marginTop: 10, marginLeft: 15, color: '#000000', fontSize: 14}}>
                <div>{currentLogistics.car_head}</div>
                <div>{currentLogistics.driver_name} {currentLogistics.driver_mobile}</div>
              </div> :
              <div style={{color: '#000', marginTop: 20, marginLeft: 15}}>暂无车辆信息（待调度）</div>
            }
          </div>
          <div className='map-title-item' style={{color: '#999999'}}>
            <div style={{display: 'block', paddingLeft: 25, position: 'relative', marginTop: 5}}>
              <span className='greenMarker'></span>
              <span>发货地：</span>
              <span style={{color: '#697087'}}>
                {currentLogistics.cargo_province ? currentLogistics.cargo_province + currentLogistics.cargo_city + (currentLogistics.cargo_area ? currentLogistics.cargo_area : '') : '暂无'}
              </span>
            </div>
            <div style={{
              height: 1,
              backgroundColor: '#F0F0F0',
              display: 'block',
              marginTop: 5,
              marginBottom: 3
            }}></div>
            <div style={{display: 'block', paddingLeft: 25, position: 'relative', marginTop: 2}}>
              <span className='redMarker'></span>
              <span>收货地：</span>
              <span style={{color: '#697087'}}>
                {currentLogistics.delivery_province ? currentLogistics.delivery_province + currentLogistics.delivery_city + (currentLogistics.delivery_area ? currentLogistics.delivery_area : '') : '暂无'}
              </span>
            </div>
          </div>
        </div>
        <div className='map-detail' style={this.state.showDetail ? {height: 180} : {}}>
          <LogisticsStep currentLogistics={currentLogistics} style={{margin: '70px -60px 130px'}}/>
        </div>
      </div>
    )
  }
}

export default MapDetail
