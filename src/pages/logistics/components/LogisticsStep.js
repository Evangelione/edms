import React, { PureComponent } from 'react'
import { Steps, Icon } from 'antd'
import ImageModal from '../../../components/ImageModal/ImageModal'

const Step = Steps.Step
const MatchYear = /[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))/g
const MatchTime = /(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?/g

class LogisticsStep extends PureComponent {
  render() {
    const currentLogistics = this.props.currentLogistics
    return (
      <Steps progressDot current={currentLogistics.deliver_status - 1}
             style={{margin: '90px -60px 130px', ...this.props.style}}>
        <Step title={<div
          style={{
            position: 'absolute',
            top: 65,
            left: '-12px',
            width: 50,
          }}>待调度</div>}
              description={<div style={{
                position: 'absolute',
                top: '-50px',
                left: 65,
                display: (currentLogistics.deliver_status - 1) >= 0 ? 'block' : 'none',
              }}>
                <div>{currentLogistics.create_time ? currentLogistics.create_time.match(MatchYear) : ''}</div>
                <div>{currentLogistics.create_time ? currentLogistics.create_time.match(MatchTime) : ''}</div>
              </div>}/>


        <Step title={<div style={{
          position: 'absolute',
          top: 65,
          left: '-10px',
          textAlign: 'left',
        }}>
          <div style={{width: 50}}>待接单</div>
          <div style={{
            width: 200,
            color: '#9DA6B1',
            fontSize: 13,
            fontWeight: 400,
            display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
          }}>
            <div style={{marginTop: 10}}>调度：{currentLogistics.dispatch_name ? currentLogistics.dispatch_name : ''}</div>
            <div>电话：{currentLogistics.dispatch_mobile ? currentLogistics.dispatch_mobile : ''}</div>
          </div>
        </div>}
              description={<div style={{
                position: 'absolute',
                top: '-50px',
                left: 62,
                display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
              }}>
                <div>{currentLogistics.dispatch_time ? currentLogistics.dispatch_time.match(MatchYear) : ''}</div>
                <div>{currentLogistics.dispatch_time ? currentLogistics.dispatch_time.match(MatchTime) : ''}</div>
              </div>}/>


        <Step title={<div style={{
          position: 'absolute',
          top: 65,
          left: '-10px',
          textAlign: 'left',
        }}>
          <div style={{width: 50}}>已接单</div>
          <div style={{
            width: 200,
            color: '#9DA6B1',
            fontSize: 13,
            fontWeight: 400,
            display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
          }}>
            <div style={{marginTop: 10}}>司机：{currentLogistics.driver_name ? currentLogistics.driver_name : ''}</div>
            <div>电话：{currentLogistics.driver_mobile ? currentLogistics.driver_mobile : ''}</div>
          </div>
        </div>}
              description={<div style={{
                position: 'absolute',
                top: '-50px',
                left: 62,
                display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
              }}>
                <div>{currentLogistics.take_time ? currentLogistics.take_time.match(MatchYear) : ''}</div>
                <div>{currentLogistics.take_time ? currentLogistics.take_time.match(MatchTime) : ''}</div>
              </div>}/>


        <Step title={<div style={{
          position: 'absolute',
          top: 65,
          left: '-10px',
          textAlign: 'left',
        }}>
          <div style={{width: 50}}>运输中</div>
          <div style={{
            width: 200,
            color: '#9DA6B1',
            fontSize: 13,
            fontWeight: 400,
            display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
          }}>
            <div style={{marginTop: 10}}>装车量：{currentLogistics.load_num ? currentLogistics.load_num : ''}</div>
            <div>{currentLogistics.load_url ?
              <ImageModal imgUrl={currentLogistics.load_url} title='装车磅票'>
                <Icon style={{verticalAlign: 'middle'}} type="file-text"/> 查看装车磅票
              </ImageModal> : <div>暂无装车磅票</div>}</div>
          </div>
        </div>}
              description={<div style={{
                position: 'absolute',
                top: '-50px',
                left: 62,
                display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
              }}>
                <div>{currentLogistics.load_time ? currentLogistics.load_time.match(MatchYear) : ''}</div>
                <div>{currentLogistics.load_time ? currentLogistics.load_time.match(MatchTime) : ''}</div>
              </div>}/>


        <Step title={<div style={{
          position: 'absolute',
          top: 65,
          left: '-10px',
          textAlign: 'left',
        }}>
          <div style={{width: 50}}>已卸车</div>
          <div style={{
            width: 200,
            color: '#9DA6B1',
            fontSize: 13,
            fontWeight: 400,
            display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
          }}>
            <div style={{marginTop: 10}}>卸车量：{currentLogistics.unload_num ? currentLogistics.unload_num : ''}</div>
            <div>{currentLogistics.unload_url ?
              <ImageModal imgUrl={currentLogistics.unload_url} title='装车磅票'>
                <Icon style={{verticalAlign: 'middle'}} type="file-text"/> 查看卸车磅票
              </ImageModal> : <div>暂无卸车磅票</div>}</div>
          </div>
        </div>}
              description={<div style={{
                position: 'absolute',
                top: '-50px',
                left: 62,
                display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
              }}>
                <div>{currentLogistics.unload_time ? currentLogistics.unload_time.match(MatchYear) : ''}</div>
                <div>{currentLogistics.unload_time ? currentLogistics.unload_time.match(MatchTime) : ''}</div>
              </div>}/>


        <Step title={<div style={{
          position: 'absolute',
          top: 65,
          left: '-40px',
          textAlign: 'left',
        }}>
          <div style={{width: 50}}>已完成</div>
          <div style={{
            width: 200,
            color: '#9DA6B1',
            fontSize: 13,
            fontWeight: 400,
            display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
          }}>
            <div style={{marginTop: 10}}>调度：{currentLogistics.dispatch_name ? currentLogistics.dispatch_name : ''}</div>
            <div>电话：{currentLogistics.dispatch_mobile ? currentLogistics.dispatch_mobile : ''}</div>
          </div>
        </div>}
              description={<div style={{
                position: 'absolute',
                top: '-50px',
                left: 62,
                display: (currentLogistics.deliver_status - 1) >= 1 ? 'block' : 'none',
              }}>
                <div>{currentLogistics.finish_time ? currentLogistics.finish_time.match(MatchYear) : ''}</div>
                <div>{currentLogistics.finish_time ? currentLogistics.finish_time.match(MatchTime) : ''}</div>
              </div>}/>


      </Steps>
    )
  }
}

export default LogisticsStep
