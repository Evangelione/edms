import React, { PureComponent } from 'react'
import { Card, Pagination, Button, Divider, Row, Col, Form, AutoComplete, Modal, Input } from 'antd'
import { connect } from 'dva'
import { IconFont, REGS } from '../../../common/constants'
import StatusModal from './StatusModal'
import OrderModal from './OrderModal'
import PromptModal from '../../../components/PromptModal/PromptModal'
import styles from '../order.css'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import ResultModal from './ResultModal'
import PoundModal from '../../logistics/components/PoundModal'

const FormItem = Form.Item
const Option = AutoComplete.Option

class OrderTableV2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabColor: {
        '待确认': '#666',
        '待支付': '#FF4241',
        '待发货': '#f2b21a',
        '待收货': '#F17C40',
        '待结算': '#54A8FD',
        '已结算': '#00B763',
      },
      tabColorOpacity: {
        '待确认': 'rgb(102,102,102,0.1)',
        '待支付': 'rgb(255,66,65,0.1)',
        '待发货': 'rgb(242,178,26,0.1)',
        '待收货': 'rgb(241,124,64,0.1)',
        '待结算': 'rgb(84,168,253,0.1)',
        '已结算': 'rgb(0,183,99,0.1)',
      },
      visible: false,
      etime: moment(),
      acceptOrder: false,
    }
  }

  clickItme = (item, index) => {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        currentOrder: item,
        currentIndex: index,
      },
    })
    this.props.dispatch({
      type: 'home/save',
      payload: {
        currentOrder: item,
      },
    })
    // this.props.dispatch({
    //   type: 'orderDetail/save',
    //   payload: {
    //     showMap: false,
    //   },
    // })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        page,
        order_status: this.props.order_status,
        order_type: this.props.order_type,
        find_str: this.props.find_str,
      },
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  toggleExpand = (id) => {
    this.setState({
      [id]: !this.state[id],
    })
  }

  scheduling = (id) => {
    this.props.dispatch({
      type: 'home/getDetail',
      payload: {
        id: id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'home/getCompanyOption',
      }).then(() => {
        this.showModal()
        const detailForm = this.props.detailForm
        this.props.form.setFieldsValue({
          zhuanghuolianxiren: detailForm.cargo_contact,
          zhuanghuolianxidianhua: detailForm.cargo_mobile,
          zhuanghuoshuliang: detailForm.load_num,
          zhuanghuodizhi: detailForm.cargo_province + (detailForm.cargo_city ? detailForm.cargo_city : '') + (detailForm.cargo_area ? detailForm.cargo_area : ''),
          zhuanghuoxiangxidizhi: detailForm.detaileds_address,
          shouhuolianxiren: detailForm.recv_contact,
          shouhuolianxidianhua: detailForm.recv_phone,
          shouhuoshijian: detailForm.recv_time,
          shouhuoshuliang: detailForm.saler_num,
          shouhuodizhi: detailForm.delivery_province + (detailForm.delivery_city ? detailForm.delivery_city : '') + (detailForm.delivery_area ? detailForm.delivery_area : ''),
          shouhuoxiangxidizhi: detailForm.detailed_address,
        })
      })
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props)
        delete values.edingzaizhong
        delete values.shouhuodizhi
        delete values.shouhuolianxiren
        delete values.shouhuolianxidianhua
        delete values.shouhuoshijian
        delete values.shouhuoshuliang
        delete values.shouhuoxiangxidizhi
        delete values.siji
        delete values.yayunyuan
        delete values.supercargo_mobile
        delete values.zhuanghuodizhi
        delete values.zhuanghuolianxiren
        delete values.zhuanghuolianxidianhua
        delete values.zhuanghuoshuliang
        delete values.zhuanghuoxiangxidizhi
        values.id = this.props.detailForm.id
        this.props.dispatch({
          type: 'home/doDispatch',
          payload: {
            form: values,
          },
        }).then(() => {
          this.setState({
            visible: false,
          })
        })
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  companyChange = (value, item) => {
    this.props.dispatch({
      type: 'home/getCarOption',
      payload: {
        logistic_company: value,
      },
    })
    this.props.form.resetFields('chetoupaizhao')
  }

  bodyChange = (value, item) => {
    this.props.form.setFieldsValue({
      edingzaizhong: item.props.load,
    })
  }

  driverChange = (value, item) => {
    this.props.form.setFieldsValue({
      driver_mobile: item.props.phone,
    })
  }

  handleApply = (event, picker) => {
    this.setState({
      etime: picker.endDate,
    })
  }

  acceptOrder = (id, e) => {
    e.stopPropagation()
    this.setState({
      acceptBtn: true,
    })
    this.props.dispatch({
      type: 'home/acceptOrder',
      payload: {
        id: id,
      },
    }).then(() => {
      this.setState({
        acceptBtn: false,
      })
    })
  }

  refuseOrder = (id, e) => {
    e.stopPropagation()
    this.setState({
      refuseBtn: true,
    })
    this.props.dispatch({
      type: 'home/refuseOrder',
      payload: {
        id: id,
      },
    }).then(() => {
      this.setState({
        refuseBtn: false,
      })
    })
  }

  render() {
    const {list, page, total, currentIndex, companyOption, carOption, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const companyOptions = companyOption.map((option, index) =>
      <Option key={option.logistic_company} value={option.logistic_company}>
        {option.logistic_company}
      </Option>)
    const carHeadOptions = carOption.car_head.map((option, index) =>
      <Option key={index} value={option.car_head}>{option.car_head}</Option>,
    )
    const carBodyOptions = carOption.car_body.map((option, index) =>
      <Option key={index} value={option.car_body} load={option.rated_load}>{option.car_body}</Option>,
    )
    const driverOptions = carOption.driver.map((option, index) =>
      <Option key={index} value={option.driver} phone={option.driver_mobile}>{option.driver}</Option>,
    )
    let locale = {
      'format': 'YYYY-MM-DD',
      'separator': ' - ',
      'applyLabel': '确定',
      'cancelLabel': '取消',
      'fromLabel': '起始时间',
      'toLabel': '结束时间\'',
      'customRangeLabel': '自定义',
      'weekLabel': 'W',
      'daysOfWeek': ['日', '一', '二', '三', '四', '五', '六'],
      'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      'firstDay': 1,
    }
    let time = this.state.etime.format('YYYY-MM-DD HH:mm:00')
    return (
      <>
        {list.map((item, index) => {
          return <Card style={{borderRadius: 12, marginTop: 30, position: 'relative', cursor: 'pointer'}}
                       bodyStyle={{padding: '12px 14px'}}
                       className={index === currentIndex ? styles.currentOrder : null}
                       key={index}
                       onClick={this.clickItme.bind(null, item, index)}>
            <div className={styles.order_title}>
              <span>NO.{index + 1}.</span>
              <span>创建时间：{item.order_date}</span>
              <span>订单编号：{item.order_code}</span>
              <span style={{
                float: 'right',
                fontWeight: 600,
                marginRight: 10,
                color: this.state.tabColor[item.status_name],
              }}>{item.status_name}</span>
            </div>
            <div style={{
              width: 44,
              height: 44,
              display: 'inline-block',
              verticalAlign: 'top',
              marginRight: 20,
              borderRadius: 6,
              overflow: 'hidden',
            }}>
              <img src={item.cust_head} width={44} height={44} alt=''/>
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', minWidth: 290}}>
              <div style={{color: '#4777E5', fontSize: 16, position: 'relative', marginBottom: 4, fontWeight: 600}}>
                {item.site_name}
                {item.order_type === '2' ? <IconFont type='icon-xinyongqia'
                                                     style={{
                                                       fontSize: 24,
                                                       verticalAlign: 'inherit',
                                                       position: 'absolute',
                                                       top: 1,
                                                       right: 35,
                                                     }}/> : ''}
              </div>
              <div style={{
                color: '#9DA3A5',
                fontSize: 12,
              }}>{item.cargo_province ? item.cargo_province + item.cargo_city : '未选择气源'} - {item.delivery_province}{item.delivery_city}</div>
              <Divider/>
              <div style={{color: '#9096A3', marginBottom: 5}}><span
                style={{
                  color: '#4777E5',
                  fontSize: 14,
                  marginRight: 16,
                  fontWeight: 600,
                }}>{item.name_gas_source ? item.name_gas_source : '未选择气源'}</span>￥ {item.saler_price ? item.saler_price : '--'} * {item.saler_num}吨
              </div>
              {item.order_status - 0 < 5 ?
                <div>7.5%预付款：<span
                  style={{color: '#D0021B', fontWeight: 600}}>￥ {item.yufukuan ? item.yufukuan : '--'} </span> 合计：<span
                  style={{color: '#D0021B', fontWeight: 600}}>￥ {item.final_money ? item.final_money : '--'}</span>
                </div> :
                <div>合计：<span
                  style={{color: '#D0021B', fontWeight: 600}}>￥ {item.final_money ? item.final_money : '--'}</span>
                </div>}
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', float: 'right'}}>
              <div style={{color: '#4777E5', marginBottom: 25, textAlign: 'right'}}>
                {item.order_status === '3' && item.deliver_status - 0 > 2 ?
                  <IconFont type='icon-huoche' style={{fontSize: 16, marginRight: 10, verticalAlign: 'inherit'}}/> : ''}
                <span style={{fontWeight: 600, fontSize: 14, marginRight: 10}}>{item.car_head}</span>
                <span style={{fontSize: 12}}>{item.recv_time}</span>
              </div>
              <div style={{marginBottom: 20}}>
                {item.order_status === '0' ?
                  <div>
                    <OrderModal confirm={true} currentOrder={item}>
                      <Button type='primary' style={{marginRight: 10}}>确认订单</Button>
                    </OrderModal>
                    <PromptModal state={'cancelOrder'} cancelId={item.order_id}>
                      <Button style={{
                        height: 32,
                        marginRight: 10,
                        backgroundColor: '#9096A3',
                        borderColor: '#9096A3',
                        color: '#fff',
                      }}>取消订单</Button>
                    </PromptModal>
                  </div> : item.order_status === '1' ?
                    <div>
                      <StatusModal id={item.order_id}/>
                      {/*<Button type='primary'*/}
                      {/*style={{backgroundColor: '#D0021B', marginRight: 10, borderColor: '#D0021B'}}>立即支付</Button>*/}
                      <OrderModal modify={true} currentOrder={item}>
                        <Button type='primary' style={{marginRight: 10}}>修改订单</Button>
                      </OrderModal>
                      <PromptModal state={'cancelOrder'} cancelId={item.order_id}>
                        <Button type='primary'
                                style={{backgroundColor: '#9096A2', borderColor: '#9096A2'}}>取消订单</Button>
                      </PromptModal>
                    </div> : item.order_status === '2' ?
                      <div style={{textAlign: 'right'}}>
                        <Button onClick={this.scheduling.bind(null, item.id)} type='primary'
                                style={{width: 88}}>调度</Button>
                        <PromptModal state={'cancelOrder'} cancelId={item.order_id}>
                          <Button style={{
                            height: 32,
                            marginLeft: 10,
                            backgroundColor: '#9096A3',
                            borderColor: '#9096A3',
                            color: '#fff',
                          }}>取消订单</Button>
                        </PromptModal>
                        {/*马上去调度*/}
                      </div> : item.order_status === '3' ?
                        <div style={{textAlign: 'right'}}>
                          {item.deliver_status === '2' ?
                            <div>
                              <Button type='primary' style={{width: 88}}
                                      onClick={this.acceptOrder.bind(null, item.id)}
                                      loading={this.state.acceptBtn}>接单</Button>
                              <Button onClick={this.refuseOrder.bind(null, item.id)}
                                      style={{
                                        width: 88,
                                        background: '#D0021B',
                                        borderColor: '#D0021B',
                                        marginLeft: 10,
                                        color: '#fff',
                                      }}
                                      loading={this.state.refuseBtn}>拒绝</Button>
                              <PromptModal state={'cancelOrder'} cancelId={item.order_id}>
                                <Button style={{
                                  height: 32,
                                  marginLeft: 10,
                                  backgroundColor: '#9096A3',
                                  borderColor: '#9096A3',
                                  color: '#fff',
                                }}>取消订单</Button>
                              </PromptModal>
                            </div> : item.deliver_status === '3' ?
                              <div>
                                <PoundModal title='上传装车磅单' load_num={item.load_num}
                                            load_url={item.load_url}
                                            hidden={'load'} id={item.id}>
                                  <Button type='primary'>上传装车磅单</Button>
                                </PoundModal>
                                <PromptModal state={'cancelOrder'} cancelId={item.order_id}>
                                  <Button style={{
                                    height: 32,
                                    marginLeft: 10,
                                    backgroundColor: '#9096A3',
                                    borderColor: '#9096A3',
                                    color: '#fff',
                                  }}>取消订单</Button>
                                </PromptModal>
                              </div> : item.deliver_status === '4' ?
                                <div>
                                  <PoundModal title='上传卸车磅单' unload_num={item.unload_num}
                                              unload_url={item.unload_url} hidden={'unload'}
                                              id={item.id}>
                                    <Button type='primary'>上传卸车磅单</Button>
                                  </PoundModal>
                                  <PromptModal state={'cancelOrder'} cancelId={item.order_id}>
                                    <Button style={{
                                      height: 32,
                                      marginLeft: 10,
                                      backgroundColor: '#9096A3',
                                      borderColor: '#9096A3',
                                      color: '#fff',
                                    }}>取消订单</Button>
                                  </PromptModal>
                                </div> : item.deliver_status === '5' ?
                                  <div>
                                    <PoundModal title='确认磅单' hidden='all' load_num={item.load_num}
                                                load_url={item.load_url}
                                                unload_num={item.unload_num}
                                                unload_url={item.unload_url}
                                                id={item.id}
                                                load_time={item.load_time}
                                                unload_time={item.unload_time}>
                                      <Button type='primary'>确认磅单</Button>
                                    </PoundModal>
                                  </div> : ''
                          }
                        </div> : item.order_status === '4' ?
                          <div>
                            {item.deliver_status === '6' ?
                              <div style={{textAlign: 'right'}}>
                                {/*<PoundModal title='查看磅单' type='look' hidden='all' load_num={item.load_num}*/}
                                {/*load_url={item.load_url}*/}
                                {/*unload_num={item.unload_num}*/}
                                {/*unload_url={item.unload_url}>*/}
                                {/*<Button type='primary'>查看磅单</Button>*/}
                                {/*</PoundModal>*/}
                                <ResultModal>
                                  <Button type='primary' style={{width: 88}}>结算</Button>
                                </ResultModal>
                              </div> : ''}
                          </div> : item.order_status === '5' ?
                            <div style={{textAlign: 'right'}}>
                              <OrderModal currentOrder={item}>
                                <Button type='primary' style={{width: 88}}>再来一单</Button>
                              </OrderModal>
                            </div> : <div style={{textAlign: 'right'}}>
                              <OrderModal modify={true} currentOrder={item}>
                                <Button type='primary' style={{
                                  width: 88,
                                  backgroundColor: '#FF6913',
                                  borderColor: '#FF6913',
                                  marginRight: 10,
                                }}>恢复订单</Button>
                              </OrderModal>
                              <PromptModal state='deleteOrder' delOrderId={item.id}>
                                <Button type='primary' style={{
                                  width: 88,
                                  backgroundColor: '#9096A3',
                                  borderColor: '#9096A3',
                                }}>删除订单</Button>
                              </PromptModal>
                            </div>}
              </div>
              <div style={{textAlign: 'right', cursor: 'pointer'}}>
                <span onClick={this.toggleExpand.bind(null, item.id)}>展开查看详情</span>
                <IconFont type='icon-xiajiantou' style={this.state[item.id] ? {
                  transform: 'rotate(-180deg)', transition: 'all 0.5s',
                  marginLeft: 4,
                  verticalAlign: 0,
                } : {
                  transition: 'all 0.5s',
                  marginLeft: 4,
                  verticalAlign: 0,
                }}></IconFont>
              </div>
            </div>
            <div style={{transition: 'all 0.5s', overflow: 'hidden', width: '100%'}}
                 className={this.state[item.id] ? styles.showExpand : styles.hideExpand}>
              <Divider/>
              <Row>
                <Col span={5} className={styles.listItem}>
                  <div>供应商信息</div>
                  {item.supp_name ?
                    <>
                      <div>{item.supp_name}</div>
                      <div>{item.supp_contact}</div>
                      <div>{item.supp_mobile}</div>
                    </> : <div>未选择气源</div>}
                </Col>
                <Col span={7} className={styles.listItem} style={{position: 'relative', paddingRight: 30}}>
                  <div>装货信息</div>
                  {item.cargo_contact ?
                    <>
                      <div>{item.cargo_contact}</div>
                      <div>{item.cargo_mobile}</div>
                      <div>{item.cargo_province}/{item.cargo_city}/{item.cargo_area}/{item.detailed_address}</div>
                      <div style={{
                        width: 1,
                        height: 160,
                        backgroundColor: '#eee',
                        position: 'absolute',
                        top: 0,
                        left: 210,
                      }}></div>
                    </> : <div>未选择气源</div>}
                </Col>
                <Col span={6} className={styles.listItem}>
                  <div>客户信息</div>
                  <div>{item.customer_name}</div>
                  <div>{item.customer_contact}</div>
                  <div>{item.customer_mobile}</div>
                </Col>
                <Col span={5} className={styles.listItem}>
                  <div>收货信息</div>
                  <div>{item.site_name}</div>
                  <div>{item.shouhuo[0].delivery_contact}</div>
                  <div>{item.shouhuo[0].delivery_mobile}</div>
                  <div>{item.delivery_province}/{item.delivery_city}/{item.delivery_area}/{item.detaileds_address}</div>
                </Col>
              </Row>
            </div>
          </Card>
        })}
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={page}
          pageSize={8}
          onChange={this.pageChangeHandler}
        />
        <Modal
          width={740}
          title="调度"
          visible={this.state.visible}
          bodyStyle={{padding: 38, maxHeight: 540, overflow: 'auto'}}
          footer={[
            <Row key='row' type='flex' justify='center' style={{margin: '10px 0'}}>
              <Col key='col'>
                <Button key='submit' type='primary' onClick={this.submit} loading={loading}>确定调度</Button>
              </Col>
            </Row>,
          ]}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Form>
            <div className={styles.pageName}>1.物流公司信息</div>
            <FormItem
              label="选择物流公司"
              labelCol={{span: 4}}
              wrapperCol={{span: 9}}
            >
              {getFieldDecorator('logistics_company', {
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <AutoComplete
                  onSelect={this.companyChange}
                  dataSource={companyOptions}
                  placeholder="请填写物流公司全程（合同名称）"
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                />,
                // <Select placeholder="请选择物流公司..." style={{marginLeft: 8}} onChange={this.companyChange}>
                //   {companyOptions}
                // </Select>
              )}
            </FormItem>
            <div className={styles.pageName}>2.车辆信息</div>
            <Row>
              <Col span={12}>
                <FormItem
                  label="车头牌照"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('car_head', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <AutoComplete
                      dataSource={carHeadOptions}
                      placeholder="请选车头牌照"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="车挂牌照"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('car_body', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <AutoComplete
                      onChange={this.bodyChange}
                      dataSource={carBodyOptions}
                      placeholder="请选车挂牌照"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{display: 'none'}}>
              <Col span={12}>
                <FormItem
                  label="额定载重"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('edingzaizhong', {
                    rules: [{required: false, message: '此项为必选项！'}],
                  })(
                    <Input placeholder='选择车挂后显示...' disabled addonAfter={'吨'}/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <div className={styles.pageName}>3.司机信息</div>
            <Row>
              <Col span={12}>
                <FormItem
                  label="司机"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('driver_name', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <AutoComplete
                      onChange={this.driverChange}
                      dataSource={driverOptions}
                      placeholder="请选择司机"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="联系电话"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('driver_mobile', {
                    rules: [{
                      required: true,
                      message: '请填写正确联系电话！',
                      max: 11,
                      pattern: REGS.phone,
                    }],
                    validateTrigger: 'onBlur',
                  })(
                    <Input placeholder="填写司机电话"/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{display: 'none'}}>
              <Col span={12}>
                <FormItem
                  label="押运员"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('yayunyuan', {
                    rules: [{required: false, message: '此项为必选项！'}],
                  })(
                    <Input/>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="联系电话"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('supercargo_mobile')(
                    <Input placeholder="选择押运员后显示" disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <div className={styles.pageName}>4.装货信息</div>
            <Row style={{display: 'none'}}>
              <Col span={12}>
                <FormItem
                  label="装货联系人"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('zhuanghuolianxiren')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="联系电话"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('zhuanghuolianxidianhua')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="装货时间"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('expect_time', {
                    initialValue: time,
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <DateRangePicker
                      containerStyles={{width: 182}}
                      startDate={this.state.etime}
                      singleDatePicker={true}
                      timePicker={true}
                      timePicker24Hour={true}
                      locale={locale}
                      drops={'up'}
                      onApply={this.handleApply}>
                      <Input type="text" value={time} readOnly/>
                    </DateRangePicker>,
                  )}
                </FormItem>
              </Col>
              <Col span={12} style={{display: 'none'}}>
                <FormItem
                  label="数量"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('zhuanghuoshuliang')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{display: 'none'}}>
              <Col span={24}>
                <Col span={12} style={{padding: '0 10px'}}>
                  <FormItem
                    label="装货地址"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 15}}
                  >
                    {getFieldDecorator('zhuanghuodizhi')(
                      <Input disabled style={{marginLeft: 20}}/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label=""
                    labelCol={{span: 0}}
                    wrapperCol={{span: 20}}
                  >
                    {getFieldDecorator('zhuanghuoxiangxidizhi')(
                      <Input disabled/>,
                    )}
                  </FormItem>
                </Col>
              </Col>
            </Row>
            <div className={styles.pageName} style={{display: 'none'}}>5.收货信息</div>
            <Row style={{display: 'none'}}>
              <Col span={12}>
                <FormItem
                  label="收货联系人"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('shouhuolianxiren')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="联系电话"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('shouhuolianxidianhua')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{display: 'none'}}>
              <Col span={12}>
                <FormItem
                  label="收货时间"
                  labelCol={{span: 7}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('shouhuoshijian')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="数量"
                  labelCol={{span: 7, offset: 1}}
                  wrapperCol={{span: 13, offset: 1}}
                >
                  {getFieldDecorator('shouhuoshuliang')(
                    <Input disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{display: 'none'}}>
              <Col span={24}>
                <Col span={12} style={{padding: '0 10px'}}>
                  <FormItem
                    label="收货地址"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 15}}
                  >
                    {getFieldDecorator('shouhuodizhi')(
                      <Input disabled style={{marginLeft: 20}}/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label=""
                    labelCol={{span: 0}}
                    wrapperCol={{span: 20}}
                  >
                    {getFieldDecorator('shouhuoxiangxidizhi')(
                      <Input disabled/>,
                    )}
                  </FormItem>
                </Col>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  const {list, total, page, order_status, currentIndex, order_type} = state.order
  const {detailForm, companyOption, carOption} = state.home
  return {
    list,
    page,
    total,
    order_status,
    currentIndex,
    order_type,
    detailForm,
    companyOption,
    carOption,
    loading: state.loading.models.order,
  }
}

export default Form.create()(connect(mapStateToProps)(OrderTableV2))
