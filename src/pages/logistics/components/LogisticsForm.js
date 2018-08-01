import {Card, Divider, Row, Col, Icon} from 'antd'
import {connect} from 'dva'
import styles from '../logistics.css'

function mapStateToProps(state) {
  const {detailForm} = state.logisticsDetail
  return {
    detailForm,
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(({detailForm}) => {
  function openReport(url) {
    window.open(url)
  }

  return (
    <Card style={{borderColor: '#CFCFCF'}}>
      <div className={'itemTitle'}>1.客户信息</div>
      <Divider></Divider>
      <Row style={{marginTop: 35}}>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>客户名称：</Col>
          <Col span={13}>{detailForm.customer_name}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>客户联系人：</Col>
          <Col span={13}>{detailForm.customer_contact}</Col>
        </Col>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>联系电话：</Col>
          <Col span={13}>{detailForm.customer_mobile}</Col>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>配送方式：</Col>
          <Col span={13}>{detailForm.deliver_type === '1' ? '卖家配送' : ''}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>运距：</Col>
          <Col span={13}>{detailForm.distance}</Col>
        </Col>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>数量：</Col>
          <Col span={13}>{detailForm.saler_num}</Col>
        </Col>
      </Row>
      <div className={'itemTitle'}>2.收货信息</div>
      <Divider></Divider>
      <Row style={{marginTop: 35}}>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>站点简称：</Col>
          <Col span={13}>{detailForm.site_name}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>站点类型：</Col>
          <Col span={13}>{detailForm.site_type_name}</Col>
        </Col>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>用户类型：</Col>
          <Col span={13}>{detailForm.user_type_name}</Col>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>收货联系人：</Col>
          <Col span={13}>{detailForm.recv_contact}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>联系电话：</Col>
          <Col span={13}>{detailForm.recv_phone}</Col>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>交货时间：</Col>
          <Col span={13}>{detailForm.recv_time}</Col>
        </Col>
        <Col span={18} className={styles.ColStyle}>
          <Col span={2} offset={1} style={{margin: '0 9px 0 42px'}}>收货地址：</Col>
          <Col
            span={13}>{detailForm.delivery_province + (detailForm.delivery_city ? detailForm.delivery_city : '') + (detailForm.delivery_area ? detailForm.delivery_area : '') + detailForm.detailed_address}</Col>
        </Col>
      </Row>
      <div className={'itemTitle'}>3.供应商信息</div>
      <Divider></Divider>
      <Row style={{marginTop: 35}}>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>供应商名称：</Col>
          <Col span={13}>{detailForm.supp_name}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>供应商联系人：</Col>
          <Col span={13}>{detailForm.supp_contact}</Col>
        </Col>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>联系电话：</Col>
          <Col span={13}>{detailForm.supp_mobile}</Col>
        </Col>
      </Row>
      <div className={'itemTitle'}>4.气源信息</div>
      <Divider></Divider>
      <Row style={{marginTop: 35}}>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>气源名称：</Col>
          <Col span={13}>{detailForm.name_gas_source}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>气源产地：</Col>
          <Col span={13}>{detailForm.origin_gas_source}</Col>
        </Col>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>气质报告：</Col>
          <Col span={13}>
            <div onClick={openReport.bind(null, detailForm.temperament_report)}
                 style={{color: '#3477ED', cursor: 'pointer'}}>
              <Icon type="file-text"/> 查看气质报告
            </div>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>装货联系人：</Col>
          <Col span={13}>{detailForm.cargo_contact}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>联系电话：</Col>
          <Col span={13}>{detailForm.cargo_mobile}</Col>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.ColStyle}>
          <Col span={2} offset={1}>装货地址：</Col>
          <Col style={{marginLeft: '-18px'}}
            span={13}>{detailForm.cargo_province + (detailForm.cargo_city ? detailForm.cargo_city : '') + (detailForm.cargo_area ? detailForm.cargo_area : '') + detailForm.detaileds_address}</Col>
        </Col>
      </Row>
      <div className={'itemTitle'}>5.我的销售员</div>
      <Divider></Divider>
      <Row style={{marginTop: 35}}>
        <Col span={6} className={styles.ColStyle}>
          <Col span={8} offset={3}>销售员：</Col>
          <Col span={13}>{sessionStorage.getItem('userData').name}</Col>
        </Col>
        <Col span={5} className={styles.ColStyle}>
          <Col span={8} offset={3}>联系电话：</Col>
          <Col span={13}>{sessionStorage.getItem('userData').mobile}</Col>
        </Col>
      </Row>
    </Card>
  )
})
