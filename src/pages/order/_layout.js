import React, { Component } from 'react'
import { Card, Tabs, Button, Row, Col, Divider, Spin, DatePicker, Input, Select } from 'antd'
import { connect } from 'dva'
import OrderTableV2 from './components/OrderTableV2'
import LogisticsMap from '../logistics/components/LogisticsMap'
import OrderModal from './components/OrderModal'
import AnimatePage from '../../components/AnimatePage/AnimatePage'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { IconFont, orderTabs } from '../../common/constants'
import styles from './order.css'

const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker
const {Search} = Input
const {Option} = Select
let timer = null

function mapStateToProps(state) {
  const {currentTab, find_str, order_status, statusNum, currentOrder, order_type, list, page, stime, etime, time_type} = state.order
  return {
    page,
    stime,
    etime,
    list,
    currentTab,
    find_str,
    order_status,
    statusNum,
    currentOrder,
    order_type,
    time_type,
    loading: state.loading.models.order,
  }
}

class Order extends Component {
  createTabs = () => {
    return orderTabs.map(item =>
      <div onClick={this.changeOrderStatus.bind(null, item.name, item.status)}
           className={this.props.currentTab === item.name ? styles.blueFont : styles.grayFont}
           key={item.name}>
        <IconFont type={item.name} style={{fontSize: '1.714rem', verticalAlign: 'middle', marginRight: 8}}/>
        <span>{item.value}</span>
        <span style={{color: '#D0021B', marginLeft: '0.714rem'}}>({this.props.statusNum[item.count]})</span>
      </div>,
    )
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'order/fetchSelect',
    })
    this.props.dispatch({type: 'order/fetch', payload: {}})
  }

  changeOrderStatus = (type, state) => {
    if (this.props.loading) return false
    this.props.dispatch({
      type: 'order/save',
      payload: {
        currentTab: type,
        currentIndex: 0,
      },
    })
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        order_status: state,
        stime: this.props.stime,
        etime: this.props.etime,
        order_type: this.props.order_type,
        find_str: this.props.find_str,
        time_type: this.props.time_type,

      },
    })
  }

  changeRadio = (value) => {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        order_type: value,
        currentIndex: 0,
      },
    })
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        order_type: value,
        stime: this.props.stime,
        etime: this.props.etime,
        order_status: this.props.order_status,
        find_str: this.props.find_str,
        time_type: this.props.time_type,
      },
    })
  }

  rangeChange = (date, dateString) => {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        page: 1,
        order_type: this.props.order_type,
        order_status: this.props.order_status,
        stime: dateString[0],
        etime: dateString[1],
        find_str: this.props.find_str,
        time_type: this.props.time_type,
      },
    })
  }

  debounce = (e) => {
    let val = e.target.value
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      this.iptSearch(val)
    }, 800)
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        page: 1,
        order_type: this.props.order_type,
        order_status: this.props.order_status,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: value,
        time_type: this.props.time_type,
      },
    })
  }

  handleChange = (value) => {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        page: 1,
        order_type: this.props.order_type,
        order_status: this.props.order_status,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: this.props.find_str,
        time_type: value,
      },
    })
  }

  render() {
    const {loading, list, order_type, currentOrder} = this.props
    return (
      <AnimatePage>
        <div className='searchBox' style={{right: 158}} id='dwww'>
          <Select defaultValue="1" style={{width: '10rem', marginRight: 10, fontSize: '1rem'}}
                  onChange={this.handleChange}
                  getPopupContainer={() => {
                    return document.getElementById('dwww')
                  }}>
            <Option value="1">预计到达时间</Option>
            <Option value="2">实际装车时间</Option>
            <Option value="3">预计装车时间</Option>
          </Select>
          <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
          <Search style={{width: '18rem', marginLeft: 10}} placeholder='输入关键字进行查询'
                  onChange={this.debounce} onSearch={this.iptSearch}/>
        </div>
        <Tabs>
          <TabPane tab="订单管理" key="1">
            <div className={'toolBar'} style={{top: 0, right: 0}}>
              <OrderModal>
                <Button type='primary'
                        style={{boxShadow: '0px 1px 10px #1890ff', width: '10rem', height: 47}}>新的订单</Button>
              </OrderModal>
            </div>
            <Card style={{borderRadius: 12}}>
              <div className='changeList'>
                {this.createTabs()}
              </div>
              <Divider/>
              <div className={styles.radioGp}>
                <div onClick={this.changeRadio.bind(null, '3')}
                     className={order_type === '3' ? styles.blueFont : styles.grayFont}>
                  <IconFont type='icon-icon-test11'
                            style={{fontSize: '1.714rem', verticalAlign: 'middle', marginRight: 8}}/>全部订单
                </div>
                <div onClick={this.changeRadio.bind(null, '1')}
                     className={order_type === '1' ? styles.blueFont : styles.grayFont}>
                  <IconFont type='icon-xinyongqia'
                            style={{fontSize: '1.714rem', verticalAlign: 'middle', marginRight: 8}}/>预付款订单
                </div>
                <div onClick={this.changeRadio.bind(null, '2')}
                     className={order_type === '2' ? styles.blueFont : styles.grayFont}>
                  <IconFont type='icon-icon-test10'
                            style={{fontSize: '1.714rem', verticalAlign: 'middle', marginRight: 8}}/>赊销订单
                </div>
              </div>
            </Card>
            <Row gutter={10} style={{marginTop: 10}}>
              <Col span={12}>
                <Spin spinning={loading}>
                  {list.length ? <OrderTableV2/> : <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8e8e8',
                    padding: 22,
                    textAlign: 'center',
                  }}>暂无订单信息</div>}
                </Spin>
              </Col>
              <Col span={12}>
                <Spin spinning={loading}>
                  {currentOrder.id ?
                    <LogisticsMap/> :
                    <div style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e8e8e8',
                      padding: 22,
                      textAlign: 'center',
                    }}>暂无订单信息</div>}
                </Spin>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </AnimatePage>
    )
  }

}

export default connect(mapStateToProps)(Order)
