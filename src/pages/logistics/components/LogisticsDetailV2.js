import React, { PureComponent } from 'react'
import { Card, Steps, Divider, Button, Row, Col, Collapse, Modal, Form, AutoComplete, Input } from 'antd'
import TimeLine from '../../../components/TimeLine/TimeLine'
import PromptModal from '../../../components/PromptModal/PromptModal'
import { connect } from "dva/index"
import { routerRedux } from 'dva/router'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
import styles from '../logistics.css'
import moment from 'moment'
import PoundModal from './PoundModal'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

const Step = Steps.Step
const Panel = Collapse.Panel
const FormItem = Form.Item
const Option = AutoComplete.Option

class LogisticsDetailV2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
      activeKey: [],
      schedulingBtn: false,
      visible: false,
      etime: moment(),
      acceptBtn: false,
      refuseBtn: false
      // yuePay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? (total * 1.075).toFixed(2) : (this.state.balance - 0),
      // xinyongPay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? 0 : ((total * 1.075).toFixed(2) - (this.state.balance - 0)),

    }
  }

  expand = () => {
    this.setState({
      expand: !this.state.expand,
      activeKey: this.state.activeKey.length === 0 ? ['1'] : []
    })
  }

  viewReport = () => {
    window.open(this.props.currentLogistics.temperament_report)
  }

  goLogisticsList = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/logistics',
    }))
  }

  scheduling = (id) => {
    this.setState({
      schedulingBtn: true,
      id: id
    })
    this.props.dispatch({
      type: 'logisticsDetail/getDetail',
      payload: {
        id: id
      }
    }).then(() => {
      this.props.dispatch({
        type: 'logisticsDetail/getCompanyOption'
      }).then(() => {
        this.setState({
          visible: true,
          schedulingBtn: false
        })
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

  companyChange = (value, item) => {
    this.props.dispatch({
      type: 'logisticsDetail/getCarOption',
      payload: {
        logistic_company: value
      }
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

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
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
        values.id = this.state.id
        this.props.dispatch({
          type: 'logisticsDetail/doDispatch',
          payload: {
            form: values
          }
        }).then(() => {
          this.setState({
            visible: false
          })
        })
      }
    })
  }

  acceptOrder = (id, e) => {
    e.stopPropagation()
    this.setState({
      acceptBtn: true
    })
    this.props.dispatch({
      type: 'logistics/acceptOrder',
      payload: {
        id: id
      }
    }).then(() => {
      this.setState({
        acceptBtn: false
      })
      this.props.dispatch(routerRedux.push({
        pathname: '/logistics',
      }))
    })
  }

  refuseOrder = (id, e) => {
    e.stopPropagation()
    this.setState({
      refuseBtn: true
    })
    this.props.dispatch({
      type: 'logistics/refuseOrder',
      payload: {
        id: id
      }
    }).then(() => {
      this.setState({
        refuseBtn: false
      })
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {currentLogistics, companyOption, carOption, loading} = this.props
    const companyOptions = companyOption.map((option, index) =>
      <Option key={option.logistic_company} value={option.logistic_company}>
        {option.logistic_company}
      </Option>)
    const carHeadOptions = carOption.car_head.map((option, index) =>
      <Option key={index} value={option.car_head}>{option.car_head}</Option>
    )
    const carBodyOptions = carOption.car_body.map((option, index) =>
      <Option key={index} value={option.car_body} load={option.rated_load}>{option.car_body}</Option>
    )
    const driverOptions = carOption.driver.map((option, index) =>
      <Option key={index} value={option.driver} phone={option.driver_mobile}>{option.driver}</Option>
    )
    let locale = {
      "format": 'YYYY-MM-DD',
      "separator": " - ",
      "applyLabel": "确定",
      "cancelLabel": "取消",
      "fromLabel": "起始时间",
      "toLabel": "结束时间'",
      "customRangeLabel": "自定义",
      "weekLabel": "W",
      "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
      "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      "firstDay": 1
    }
    let time = this.state.etime.format('YYYY-MM-DD HH:mm:00')
    return (
      <Card bodyStyle={{transition: 'all 0.5s'}}
            style={{borderColor: '#e8e8e8', marginBottom: 10}}
            title={<div><span style={{color: '#545F76', fontSize: 15}}>运单编号：{currentLogistics.deliver_code}</span><span
              style={{fontSize: 15, paddingLeft: 50, color: '#aaa'}}>创建时间：{currentLogistics.create_time}</span>
            </div>}
            extra={<div>对应订单编号：{currentLogistics.order_code}</div>}
      >
        <Steps progressDot current={currentLogistics.deliver_status - 0} style={{margin: '70px 0'}}>
          <Step title="待调度"/>
          <Step title="待接单"/>
          <Step title="已接单"/>
          <Step title="运输中"/>
          <Step title="已卸车"/>
          <Step title="已完成"/>
        </Steps>
        <div style={{margin: '0 20px'}}>
          <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
        </div>
        {/*订单状态*/}
        <div style={{paddingLeft: 20, margin: '40px 0'}}>
          <div style={{
            color: '#545F76',
            fontWeight: 600,
            fontSize: 17,
            marginBottom: 8
          }}>运单状态：{currentLogistics.status_name}</div>
          {currentLogistics.deliver_status === '0' ?
            <div>
              <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>调度后订单才能继续往下进行哦~</div>
              <div style={{float: 'right', marginTop: '-60px', marginRight: 20}}>
                <Button type='primary' style={{marginRight: 10}} loading={this.state.schedulingBtn}
                        onClick={this.scheduling.bind(null, currentLogistics.id)}>调度</Button>
              </div>
            </div> : currentLogistics.deliver_status === '1' ?
              <div>
                <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>司机没有及时接单的话，可以在这里操作帮他接单，保证订单能顺利进行~</div>
                <div style={{float: 'right', marginTop: '-60px', marginRight: 20}}>
                  <Button size='large' type='primary' onClick={this.acceptOrder.bind(null, currentLogistics.id)}
                          loading={this.state.acceptBtn}>接单</Button>
                  <Button size='large' onClick={this.refuseOrder.bind(null, currentLogistics.id)}
                          style={{
                            background: '#EA7878',
                            borderColor: '#EA7878',
                            marginLeft: 10,
                            marginRight: 10,
                            color: '#fff'
                          }}
                          loading={this.state.refuseBtn}>拒绝</Button>
                  <PromptModal state='cancelLogistics' cancelID={currentLogistics.id} txt={currentLogistics}>
                    <Button size='large'>取消运单</Button>
                  </PromptModal>
                </div>
              </div> : currentLogistics.deliver_status === '2' ?
                <div>
                  <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>请及时上传装车磅单</div>
                  <div style={{float: 'right', marginTop: '-63px', marginBottom: '40px', marginRight: 20}}>
                    <PoundModal title='上传装车磅单' load_num={currentLogistics.load_num} load_url={currentLogistics.load_url}
                                hidden={'load'} id={currentLogistics.id}>
                      <Button>上传装车磅单</Button>
                    </PoundModal>
                  </div>
                </div> : currentLogistics.deliver_status === '3' ?
                  <div>
                    <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>请及时上传卸车磅单</div>
                    <div style={{float: 'right', marginTop: '-63px', marginBottom: '40px', marginRight: 20}}>
                      <PoundModal title='上传卸车磅单' unload_num={currentLogistics.unload_num}
                                  unload_url={currentLogistics.unload_url} hidden={'unload'} id={currentLogistics.id}>
                        <Button>上传卸车磅单</Button>
                      </PoundModal>
                    </div>
                  </div> : currentLogistics.deliver_status === '4' ?
                    <div>
                      <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>点击“确认磅单”，在弹窗上查看并确认磅单</div>
                      <div style={{float: 'right', marginTop: '-63px', marginBottom: '40px', marginRight: 20}}>
                        <PoundModal title='确认磅单' hidden='all' load_num={currentLogistics.load_num} load_url={currentLogistics.load_url}
                                    unload_num={currentLogistics.unload_num} unload_url={currentLogistics.unload_url} id={currentLogistics.id}
                                    load_time={currentLogistics.load_time} unload_time={currentLogistics.unload_time}>
                          <Button type='primary' style={{background: '#59C694', borderColor: '#59C694'}}>确认磅单</Button>
                        </PoundModal>
                      </div>
                    </div> : currentLogistics.deliver_status === '5' ?
                      <div>
                        <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>恭喜您，本订单已完成！您可以继续操作其它订单！</div>
                        <div style={{float: 'right', marginTop: '-63px', marginBottom: '40px', marginRight: 20}}>
                          <PoundModal title='查看磅单' type='look' hidden='all' load_num={currentLogistics.load_num}
                                      load_url={currentLogistics.load_url}
                                      unload_num={currentLogistics.unload_num} unload_url={currentLogistics.unload_url}>
                            <Button>查看磅单</Button>
                          </PoundModal>
                        </div>
                      </div> : ''
          }
        </div>
        <div style={{margin: '0 20px'}}>
          <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
        </div>
        {/*装货信息*/}
        <div>
          <div style={{paddingLeft: 20, margin: '30px 0'}}>
            <Row>
              <Col span={12} style={{fontSize: 14}}>
                <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>装货信息</div>
                <div>
                  <div style={{marginBottom: 4}}>{currentLogistics.cargo_contact}</div>
                  <div style={{marginBottom: 6}}>{currentLogistics.cargo_mobile}</div>
                  <div
                    style={{marginBottom: 6}}>{currentLogistics.cargo_province + '/' + currentLogistics.cargo_city + '/' + (currentLogistics.cargo_area ? currentLogistics.cargo_area + '/' : '') + currentLogistics.detailed_address}</div>
                  {currentLogistics.temperament_report ?
                    <div style={{marginBottom: 6, color: '#3477ED', cursor: 'pointer'}}
                         onClick={this.viewReport}>查看气质报告</div> :
                    <div style={{marginBottom: 6}}>暂无气质报告</div>}
                </div>
              </Col>
              <Col span={12} style={{fontSize: 14}}>
                <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>收货信息</div>
                <div style={{marginBottom: 4, fontWeight: 600}}>
                  {currentLogistics.site_name}
                  <span style={{
                    background: 'rgba(28,134,246, 0.2)',
                    color: '#1C86F6',
                    padding: '0 5px',
                    display: 'inline-block',
                    height: 18,
                    fontSize: 12,
                    marginLeft: 10
                  }}>{currentLogistics.site_type_name}</span>
                </div>
                <div style={{marginBottom: 4}}>{currentLogistics.recv_contact}</div>
                <div style={{marginBottom: 6}}>{currentLogistics.recv_phone}</div>
                <div
                  style={{marginBottom: 6}}>{currentLogistics.delivery_province + '/' + currentLogistics.delivery_city + '/' + (currentLogistics.delivery_area ? currentLogistics.delivery_area + '/' : '') + currentLogistics.detaileds_address}</div>
                <div style={{marginBottom: 6}}>交货时间: {currentLogistics.recv_time}</div>
                <div style={{
                  marginBottom: 6,
                  marginTop: 12,
                  color: '#A1A9B3'
                }}>用户类型: {currentLogistics.user_type_name}</div>
                <div style={{marginBottom: 6, color: '#A1A9B3'}}>配送方式: {currentLogistics.deliver_type_name}</div>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{margin: '0 20px'}}>
          <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
        </div>
        <Collapse style={{border: 0}} onChange={this.expand} activeKey={this.state.activeKey}>
          <Panel style={{
            background: '#fff',
            borderRadius: 4,
            marginBottom: 61,
            border: 0,
            overflow: 'hidden'
          }} activeKey={[]} showArrow={false}
                 header={this.state.expand ? <span style={{color: '#A1A9B3', paddingLeft: 10}}>详细信息：</span>
                   :
                   <span style={{color: '#A1A9B3', paddingLeft: 10}}>展开更多</span>} key="1">
            {/*供应商信息*/}
            <div style={{paddingLeft: 20, margin: '40px 0'}}>
              <Row>
                <Col span={12} style={{fontSize: 14}}>
                  <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>供应商信息</div>
                  <div style={{marginBottom: 4}}>{currentLogistics.supp_name}</div>
                  <div style={{marginBottom: 4}}>{currentLogistics.supp_contact}</div>
                  <div style={{marginBottom: 6}}>{currentLogistics.supp_mobile}</div>
                  <div style={{fontWeight: 600}}>采购价：{currentLogistics.purchase_price}元/吨</div>
                </Col>
                <Col span={12} style={{fontSize: 14}}>
                  <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>客户信息</div>
                  <div style={{marginBottom: 4}}>{currentLogistics.customer_name}</div>
                  <div style={{marginBottom: 4}}>{currentLogistics.customer_contact}</div>
                  <div style={{marginBottom: 6}}>{currentLogistics.customer_mobile}</div>
                  <div style={{fontWeight: 600}}>销售价：{currentLogistics.saler_price}元/吨</div>
                </Col>
              </Row>
            </div>
            <div style={{margin: '0 20px'}}>
              <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
            </div>
            {/*物流信息*/}
            <div style={{paddingLeft: 20, margin: '40px 0'}}>
              <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>物流信息</div>
              <div style={{marginBottom: 4, color: '#545F76'}}>运距: {currentLogistics.distance}公里</div>
              <div style={{marginBottom: 4, color: '#545F76'}}>运费单价: {currentLogistics.deliver_price}元/吨/公里</div>
              <div
                style={{
                  float: 'right',
                  marginTop: '-88px',
                  marginRight: 20,
                  color: '#545F76'
                }}>运单编号：{currentLogistics.deliver_code}
              </div>
            </div>
            <div style={{margin: '0 20px'}}>
              <Divider style={{backgroundColor: '#e8e8e8', height: 2}}/>
            </div>
            {/*进度条*/}
            <div>
              <TimeLine detail={currentLogistics}/>
              {currentLogistics.deliver_status !== '0' ?
                <div style={{margin: '0 40px 30px'}}>
                  <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
                    <Marker position={{lng: 116.402544, lat: 39.928216}}/>
                    <NavigationControl/>
                    <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
                  </Map>
                </div> : ''}
            </div>
            <div style={{color: '#A1A9B3', paddingLeft: 25, cursor: 'pointer'}} onClick={this.expand}>收起</div>
          </Panel>
        </Collapse>
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
            </Row>
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
                />
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
                    />
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
                    />
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
                    <Input placeholder='选择车挂后显示...' disabled addonAfter={'吨'}/>
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
                    />
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
                      pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7,9]))\\d{8}$'
                    }],
                    validateTrigger: 'onBlur',
                  })(
                    <Input placeholder="填写司机电话"/>
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
                    <Input/>
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
                    <Input placeholder="选择押运员后显示" disabled/>
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
                    <Input disabled/>
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
                    <Input disabled/>
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
                    </DateRangePicker>
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
                    <Input disabled/>
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
                      <Input disabled style={{marginLeft: 20}}/>
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
                      <Input disabled/>
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
                    <Input disabled/>
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
                    <Input disabled/>
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
                    <Input disabled/>
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
                    <Input disabled/>
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
                      <Input disabled style={{marginLeft: 20}}/>
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
                      <Input disabled/>
                    )}
                  </FormItem>
                </Col>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const {currentLogistics} = state.logistics
  const {detailForm, companyOption, carOption} = state.logisticsDetail
  return {
    currentLogistics,
    detailForm,
    companyOption,
    carOption,
    loading: state.loading.models.logisticsDetail
  }
}

export default Form.create()(connect(mapStateToProps)(LogisticsDetailV2))
