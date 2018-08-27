import React from 'react'
import { Card, Steps, Divider, Button, notification } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import styles from './order.css'
import DetailForm from './components/DetailForm'
import TimeLine from '../../components/TimeLine/TimeLine'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
import { connect } from 'dva'
import ResultModal from './components/ResultModal'
import PromptModal from '../../components/PromptModal/PromptModal'
import StatusModal from './components/StatusModal'
import withRouter from 'umi/withRouter'
import { routerRedux } from "dva/router"
import CountUp from 'react-countup'


const Step = Steps.Step

class orderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: ['待支付', '待发货', '待收货', '待结算', '已结算'],
      flag: true
    }
  }

  componentWillUnmount() {
    console.log('销毁')
    this.props.dispatch({
      type: 'orderDetail/save',
      payload: {
        detailForm: {}
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.detailForm.order_status === 1) {
      if (!this.state.flag) return false
      if ((sessionStorage.getItem('loginAuth') & 2) === 0) return false
      this.setState({
        flag: false
      })
      const key = `open${Date.now()}`;
      const btn = (
        <Button type="primary" onClick={() => {
          notification.close(key)
          this.props.dispatch(routerRedux.push({
            pathname: '/logistics',
          }))
        }}>
          去调度
        </Button>
      );
      const args = {
        message: '温馨提示',
        description: '已支付，请前往 我的物流-运单管理 进行调度操作',
        key,
        btn,
        duration: 0,
      };
      notification.info(args)
    }
  }

  editForm = (bool) => {
    if (!bool) {
      this.props.dispatch({type: 'orderDetail/modifyForm'})
    } else {
      this.props.dispatch({
        type: 'orderDetail/save',
        payload: {
          editable: bool
        }
      })
    }
  }

  getForm = (form, id) => {
    this.props.dispatch({
      type: 'orderDetail/save',
      payload: {
        modifyForm: form,
        modifyId: id
      }
    })
  }

  goOrderList = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    }))
  }

  getNum = (yunju, yunfeidanjia, shuliang, xiaoshoujiage) => {
    this.props.dispatch({
      type: 'orderDetail/save',
      payload: {
        yunfei: ((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0)).toFixed(2),
        huofei: ((xiaoshoujiage - 0) * (shuliang - 0)).toFixed(2),
        heji: (((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0) + (xiaoshoujiage - 0) * (shuliang - 0)) * 1.075).toFixed(2)
      }
    })
  }

  render() {
    const {location, editable, detailForm, yunfei, huofei, heji} = this.props
    return (
      <div>
        <PageTitle>订单详情</PageTitle>
        <Card style={{borderColor: '#CFCFCF', marginBottom: 10}} title={`订单编号：${detailForm.order_code}`}
              extra={<div>创建时间：{detailForm.order_date}</div>}>
          <Steps progressDot current={detailForm.order_status} style={{margin: '70px 0'}}>
            <Step title="待支付"/>
            <Step title="待发货"/>
            <Step title="待收货"/>
            <Step title="待结算"/>
            <Step title="已结算"/>
          </Steps>
          {detailForm.order_status < 4 ?
            <div>
              <Divider></Divider>
              <div style={{lineHeight: '35px', margin: '20px 0', float: 'left', fontSize: 16}}>
                <div style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 20
                }}>订单状态：{this.state.step[detailForm.order_status]}</div>
                <div style={{color: '#A1A9B3'}}>
                  预计运费：￥<CountUp start={0} end={yunfei} duration={2}/>
                </div>
                <div style={{color: '#A1A9B3'}}>
                  预计货款：￥<CountUp start={0} end={huofei} duration={2}/>
                </div>
                <div style={{color: '#A1A9B3'}}>
                  <span style={{fontSize: 18, fontWeight: 600, color: 'red'}}>合计金额：￥<CountUp start={0} end={heji}
                                                                                             duration={2}/></span>（多含7.5%预付款）
                </div>
              </div>
              <div className={styles.resultBox} style={{marginTop: 120}}>
                {editable ?
                  <div>
                    <Button type='primary' onClick={this.editForm.bind(null, false)}>保存</Button>
                    <PromptModal state={'cancelEdit'}>
                      <Button>取消</Button>
                    </PromptModal>
                  </div>
                  :
                  <div>
                    {detailForm.order_status === 3 ?
                      <ResultModal>
                        <Button type='primary'>去结算</Button>
                      </ResultModal>
                      :
                      <div>
                        {detailForm.order_status === 0 ? <div>
                          <StatusModal></StatusModal>
                          <Button className={'blueBorder'} onClick={this.editForm.bind(null, true)}>修改订单</Button>
                          <PromptModal state={'cancelOrder'} cancelId={location.query.id}>
                            <Button>取消订单</Button>
                          </PromptModal>
                        </div> : ''}
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
            :
            <div>
              {detailForm.order_status === 4 ?
                <div>
                  <Divider></Divider>
                  <div style={{lineHeight: '35px', margin: '20px 0', float: 'left', fontSize: 16}}>
                    <div style={{
                      fontWeight: 600,
                      fontSize: 18,
                      marginBottom: 20
                    }}>订单状态：{this.state.step[detailForm.order_status]}</div>
                    <div style={{color: '#A1A9B3'}}>
                      结算运费：￥{detailForm.jiesuan.deliver_fee}
                    </div>
                    <div style={{color: '#A1A9B3'}}>
                      结算货款：￥{detailForm.jiesuan.goods_total}
                    </div>
                    <div style={{color: '#A1A9B3'}}>
                      <span style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'red'
                      }}>结算金额：￥{detailForm.jiesuan.final_money}</span>
                    </div>
                  </div>
                </div> : ''}
            </div>

          }
        </Card>
        <DetailForm id='scroll' defaultSubmit={false} editable={editable} detailForm={detailForm}
                    getForm={this.getForm} getNum={this.getNum}></DetailForm>
        {detailForm.order_status === 1 ?
          <Card style={{borderColor: '#CFCFCF', marginTop: 10}} title={`物流信息`}
                extra={<div>运单编号：{detailForm.deliver_code}</div>}>
            <TimeLine detail={detailForm}></TimeLine>
          </Card> : ''}
        {detailForm.order_status >= 2 ?
          <Card style={{borderColor: '#CFCFCF', marginTop: 10}} title={`物流信息`}
                extra={<div>运单编号：{detailForm.deliver_code}</div>}>
            <TimeLine detail={detailForm}></TimeLine>
            <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
              <Marker position={{lng: 116.402544, lat: 39.928216}}/>
              <NavigationControl/>
              <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
            </Map>
          </Card> : ''}
        <div style={{textAlign: 'center'}}>
          <Button size='large' type='primary' onClick={this.goOrderList} style={{marginTop: 30}}>返回我的订单</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {editable, openState, detailForm, yunfei, huofei, heji} = state.orderDetail
  return {
    editable,
    openState,
    detailForm,
    yunfei,
    huofei,
    heji,
    loading: state.loading.models.orderDetail
  }
}

export default connect(mapStateToProps)(withRouter(orderDetail))
