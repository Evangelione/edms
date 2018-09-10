import React, { PureComponent } from 'react'
import { Card, Steps, Divider, Button, Row, Col, Collapse } from 'antd'
import TimeLine from '../../../components/TimeLine/TimeLine'
import { connect } from "dva/index"

const Step = Steps.Step
const Panel = Collapse.Panel

class OrderDetailV2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
      activeKey: []
    }
  }

  expand = () => {
    this.setState({
      expand: !this.state.expand,
      activeKey: this.state.activeKey.length === 0 ? ['1'] : []
    })
  }

  render() {
    const {currentOrder, detailForm} = this.props
    return (
      <Card bodyStyle={{transition: 'all 0.5s'}}
            style={{borderColor: '#e8e8e8', marginBottom: 10}}
            title={<div style={{color: '#545F76', fontSize: 15}}>订单编号：{currentOrder.order_code}</div>}
            extra={<div>创建时间：{currentOrder.order_date}</div>}
      >
        <Steps progressDot current={currentOrder.order_status - 0} style={{margin: '70px 0'}}>
          <Step title="待支付"/>
          <Step title="待发货"/>
          <Step title="待收货"/>
          <Step title="待结算"/>
          <Step title="已结算"/>
        </Steps>
        <div style={{margin: '0 20px'}}>
          <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
        </div>
        {/*订单状态*/}
        <div style={{paddingLeft: 20, margin: '40px 0'}}>
          <div style={{color: '#545F76', fontWeight: 600, fontSize: 17, marginBottom: 8}}>订单状态：待支付</div>
          <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>付款方式：{currentOrder.status_name}</div>
          <div style={{color: '#545F76', fontWeight: 600, fontSize: 17, marginBottom: 8}}>
            合计金额：
            <span
              style={{color: '#FF4241'}}>￥{currentOrder.final_money}</span>
            <span
              style={{color: '#A1A9B3', fontWeight: 400}}>&nbsp;&nbsp;(多含7.5%预付款)</span>
          </div>
          <div style={{color: '#A1A9B3', fontSize: 15}}>(余额支付883.12元，信用支付231.00元)</div>
          <div style={{float: 'right', marginTop: '-32px', marginRight: 20}}>
            <Button type='primary' style={{marginRight: 10}}>立即支付</Button>
            <Button className='blueBorder' style={{height: 32, marginRight: 10}}>修改订单</Button>
            <Button>取消订单</Button>
          </div>
        </div>
        <div style={{margin: '0 20px'}}>
          <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
        </div>
        {/*供应商信息*/}
        <div style={{paddingLeft: 20, margin: '40px 0'}}>
          <Row>
            <Col span={12} style={{fontSize: 14}}>
              <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>供应商信息</div>
              <div style={{marginBottom: 4}}>浙江华能恒源有限公司</div>
              <div style={{marginBottom: 4}}>马可波罗</div>
              <div style={{marginBottom: 6}}>18033333333</div>
              <div style={{fontWeight: 600}}>采购价：4000元/吨</div>
            </Col>
            <Col span={12} style={{fontSize: 14}}>
              <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>客户信息</div>
              <div style={{marginBottom: 4}}>浙江华能恒源有限公司</div>
              <div style={{marginBottom: 4}}>黄忠</div>
              <div style={{marginBottom: 6}}>18033333333</div>
              <div style={{fontWeight: 600}}>销售价：4000元/吨</div>
            </Col>
          </Row>
        </div>
        <div style={{margin: '0 20px'}}>
          <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
        </div>
        {/*装货信息*/}
        <Collapse style={{border: 0}} onChange={this.expand} activeKey={this.state.activeKey}>
          <Panel style={{
            background: '#fff',
            borderRadius: 4,
            marginBottom: 61,
            border: 0,
            overflow: 'hidden'
          }} activeKey={[]} showArrow={false}
                 header={this.state.expand ? <span style={{color: '#A1A9B3', paddingLeft: 10}}>物流信息：</span>
                   :
                   <span style={{color: '#A1A9B3', paddingLeft: 10}}>展开更多</span>} key="1">
            <div>
              <div style={{paddingLeft: 20, margin: '30px 0'}}>
                <Row>
                  <Col span={12} style={{fontSize: 14}}>
                    <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>装货信息</div>
                    <div style={{marginBottom: 4, fontWeight: 600}}>天津华能液化厂</div>
                    <div style={{marginBottom: 4}}>李白</div>
                    <div style={{marginBottom: 6}}>18033333333</div>
                    <div style={{marginBottom: 6}}>天津市/高新区 文兴路1241号</div>
                    <div style={{marginBottom: 6, color: '#3477ED'}}>查看气质报告</div>
                  </Col>
                  <Col span={12} style={{fontSize: 14}}>
                    <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>收货信息</div>
                    <div style={{marginBottom: 4, fontWeight: 600}}>
                      山东聊城小儿装加气站
                      <span style={{
                        background: 'rgba(28,134,246, 0.2)',
                        color: '#1C86F6',
                        padding: '0 5px',
                        display: 'inline-block',
                        height: 18,
                        fontSize: 12,
                        marginLeft: 10
                      }}>加气站</span>
                    </div>
                    <div style={{marginBottom: 4}}>李白</div>
                    <div style={{marginBottom: 6}}>18033333333</div>
                    <div style={{marginBottom: 6}}>山东省/济南市/上城区 文兴路1241号</div>
                    <div style={{marginBottom: 6}}>交货时间: 2018-01-21 12:30:00</div>
                    <div style={{marginBottom: 6, marginTop: 12, color: '#A1A9B3'}}>用户类型: LNG加气站</div>
                    <div style={{marginBottom: 6, color: '#A1A9B3'}}>配送方式: 卖家配送</div>
                  </Col>
                </Row>
              </div>
              <div style={{margin: '0 20px'}}>
                <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
              </div>
              {/*物流信息*/}
              <div style={{paddingLeft: 20, margin: '40px 0'}}>
                <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>物流信息</div>
                <div style={{marginBottom: 4, color: '#545F76'}}>运距: 60公里</div>
                <div style={{marginBottom: 4, color: '#545F76'}}>运费单价: 45元/吨/公里</div>
                <div
                  style={{
                    float: 'right',
                    marginTop: '-88px',
                    marginRight: 20,
                    color: '#545F76'
                  }}>运单编号：102030312301230411
                </div>
              </div>
              <div style={{margin: '0 20px'}}>
                <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
              </div>
              {/*进度条*/}
              {detailForm.createTime ?
                <TimeLine detail={detailForm}/> : ''
              }
              <div style={{color: '#A1A9B3', paddingLeft: 25, cursor: 'pointer'}} onClick={this.expand}>收起</div>
            </div>
          </Panel>
        </Collapse>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const {currentOrder, list} = state.order
  const {detailForm} = state.orderDetail
  return {
    list,
    currentOrder,
    detailForm,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(OrderDetailV2)
