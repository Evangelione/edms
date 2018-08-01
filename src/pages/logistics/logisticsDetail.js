import {Card, Steps} from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import styles from './logistics.css'
import LogisticsForm from './components/LogisticsForm'
import TimeLine from '../../components/TimeLine/TimeLine'
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import {connect} from 'dva'

const Step = Steps.Step

function mapStateToProps(state) {
  const {step, detailForm} = state.logisticsDetail
  return {
    step,
    detailForm,
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(({dispatch, editable, step, detailForm}) => {
  return (
    <div>
      <PageTitle>运单详情</PageTitle>
      <Card style={{borderColor: '#CFCFCF', marginBottom: 10}} title={`运单编号：${detailForm.deliver_code}`}
            extra={<div>对应订单编号：{detailForm.order_code}</div>}>
        <div className={styles.createTime} style={{marginLeft: 20}}>
          创建时间：{detailForm.create_time}
        </div>
        <Steps progressDot current={step} style={{margin: '70px 0'}}>
          <Step title="待调度"/>
          <Step title="待接单"/>
          <Step title="已接单"/>
          <Step title="运输中"/>
          <Step title="已卸车"/>
          <Step title="已完成"/>
        </Steps>
      </Card>
      <LogisticsForm></LogisticsForm>
      <Card style={{borderColor: '#CFCFCF', marginTop: 10}} title={`物流信息`}>
        <TimeLine detail={detailForm}></TimeLine>
        {step > 0 ?
          <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
            <Marker position={{lng: 116.402544, lat: 39.928216}}/>
            <NavigationControl/>
            <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
          </Map> : ''}
      </Card>
    </div>
  )
})
