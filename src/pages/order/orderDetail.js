import React from 'react'
import {Card, Steps, Divider, Button} from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import styles from './order.css'
import DetailForm from './components/DetailForm'
import TimeLine from '../../components/TimeLine/TimeLine'
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import {connect} from 'dva'
import ResultModal from './components/ResultModal'
import PromptModal from '../../components/PromptModal/PromptModal'
import StatusModal from './components/StatusModal'
import withRouter from 'umi/withRouter'

const Step = Steps.Step

class orderDetail extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
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
          {detailForm.order_status === 0 || detailForm.order_status === 3 ?
            <div>
              <Divider></Divider>
              <div style={{lineHeight: '35px', margin: '20px 0', float: 'left'}}>
                <div style={{fontWeight: 600, fontSize: 18, marginBottom: 20}}>订单状态：待支付</div>
                <div>
                  预计运费：￥{yunfei}
                </div>
                <div>
                  预计货费：￥{huofei}
                </div>
                <div>
                  （多含7.5%预付款）<span style={{fontSize: 18, fontWeight: 600, color: '#3477ED'}}>合计金额：￥{heji}</span>
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
                        <StatusModal></StatusModal>
                        <Button className={'blueBorder'} onClick={this.editForm.bind(null, true)}>修改订单</Button>
                        <PromptModal state={'cancelOrder'} cancelId={location.query.id}>
                          <Button>取消订单</Button>
                        </PromptModal>
                      </div>
                    }
                  </div>
                }
              </div>
            </div> : ''
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
