import React from 'react'
import moment from 'moment'
import {Card, Divider, Row, Col, Form, Input, Select, DatePicker, Button, Icon, AutoComplete} from 'antd'
import {connect} from 'dva'
import withRouter from 'umi/withRouter'
import styles from '../order.css'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import {routerRedux} from 'dva/router'

const FormItem = Form.Item
const Option = Select.Option
const Option2 = AutoComplete.Option

class DetailForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      report: null,
      dataSource: [],
      yunfei: 0,
      huofei: 0,
      heji: 0
    }
  }

  renderOption = (item) => {
    return (
      <Option2 key={item.delivery_mobile} value={item.delivery_contact}>
        {item.delivery_contact}
      </Option2>
    );
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        delete values.cust_id2
        delete values.cust_id3
        delete values.delivery
        delete values.goods_adress
        delete values.goods_contact
        delete values.goods_delivery
        delete values.goods_source
        delete values.adress
        delete values.goods_mobile
        delete values.lianxidianhua
        delete values.qiyuanchandi
        delete values.shuliang
        delete values.site_id2
        delete values.site_id3
        delete values.supp_id2
        delete values.supp_id3
        delete values.xiaoshouyuan
        values.recv_time = values.recv_time.format('YYYY-MM-DD HH:mm:ss')
        this.props.dispatch({
          type: 'order/addOrder',
          payload: {
            values
          }
        })
      }
    })
  }

  UNSAFE_componentWillMount() {
    if (this.props.location.pathname === '/order/orderDetail') {
      this.props.dispatch({
        type: 'orderDetail/orderInfo',
        payload: {
          id: this.props.location.query.id
        }
      }).then(() => {
        const form = this.props.detailForm
        this.setState({
          report: form.temperament_report,
          dataSource: form.shouhuo.map(this.renderOption)
        })
        let text = form.user_type
        let result_type = ''
        if (form.site_type === '1') {
          if (text === '1') {
            result_type = 'LNG加气站'
          } else if (text === '2') {
            result_type = 'L-CNG加气站'
          } else if (text === '3') {
            result_type = 'LNG L-CNG合建站'
          } else if (text === '4') {
            result_type = 'LNG CNG合建站'
          } else if (text === '5') {
            result_type = 'LNG 汽柴油合建站'
          } else if (text === '6') {
            result_type = 'LNG泵船'
          } else if (text === '7') {
            result_type = '其他'
          } else if (text === '0') {
            result_type = '--'
          }
        } else if (form.site_type === '2') {
          if (text === '1') {
            result_type = '电厂'
          } else if (text === '2') {
            result_type = '城市居民'
          } else if (text === '3') {
            result_type = '城市商服'
          } else if (text === '4') {
            result_type = '城市供暖'
          } else if (text === '5') {
            result_type = '工业燃料'
          } else if (text === '6') {
            result_type = '工业原料'
          } else if (text === '7') {
            result_type = '其他'
          } else if (text === '8') {
            result_type = '分布式项目'
          } else if (text === '0') {
            result_type = '--'
          }
        }
        this.props.form.setFieldsValue({
          cust_id: form.cust_id,
          cust_id2: form.customer_contact,
          cust_id3: form.customer_mobile,
          pay_type: form.pay_type,
          saler_price: form.saler_price,
          saler_num: form.saler_num,
          deliver_type: form.deliver_type,
          distance: form.distance,
          deliver_price: form.deliver_price,
          site_id: form.site_id,
          site_id2: form.site_type,
          site_id3: result_type,
          recv_contact: form.recv_contact,
          recv_phone: form.recv_phone,
          recv_time: moment(form.order_date),
          delivery: form.delivery_province + form.delivery_city + (form.delivery_area ? form.delivery_area : ''),
          adress: form.detaileds_address,
          supp_id: form.supp_id,
          supp_id2: form.supp_contact,
          supp_id3: form.supp_mobile,
          purchase_price: form.purchase_price,
          shuliang: form.saler_num,
          goods_id: form.goods_id,
          goods_source: form.origin_gas_source,
          goods_contact: form.cargo_contact,
          goods_mobile: form.cargo_mobile,
          goods_delivery: form.cargo_province + form.cargo_city + (form.cargo_area ? form.cargo_area : ''),
          goods_adress: form.detailed_address,
        })
        let yunju = this.props.form.getFieldValue('distance')
        let yunfeidanjia = this.props.form.getFieldValue('deliver_price')
        let shuliang = this.props.form.getFieldValue('saler_num')
        let xiaoshoujiage = this.props.form.getFieldValue('saler_price')
        this.props.getNum(yunju, yunfeidanjia, shuliang, xiaoshoujiage)
      })
      this.props.getForm(this.props.form, this.props.location.query.id)
    }
  }

  customerChange = (value, item) => {
    this.props.dispatch({
      type: 'order/fetchSite',
      payload: {
        customer_id: value
      }
    })
    this.props.form.setFieldsValue({
      cust_id2: item.props.contact,
      cust_id3: item.props.mobile,
      site_id: undefined,
      site_id2: undefined,
      site_id3: undefined,
      delivery: undefined,
      adress: undefined,
      pay_type: undefined,
      saler_price: undefined,
      saler_num: undefined,
      deliver_type: undefined,
      distance: undefined,
      deliver_price: undefined
    })
  }

  siteChange = (value, item) => {
    this.props.form.setFieldsValue({
      site_id2: item.props.sitetype,
      site_id3: item.props.usertype,
      delivery: item.props.province + item.props.city + item.props.area,
      adress: item.props.address,
      recv_contact: undefined,
      recv_phone: undefined,
      recv_time: undefined
    })
    this.setState({
      dataSource: item.props.shouhuo.map(this.renderOption)
    })
  }

  suppChange = (value, item) => {
    this.props.dispatch({
      type: 'order/fetchGoods',
      payload: {
        supplier_id: value
      }
    })
    this.props.form.setFieldsValue({
      supp_id2: item.props.contact,
      supp_id3: item.props.mobile,
      purchase_price: undefined
    })
  }

  goodsChange = (value, item) => {
    this.props.form.setFieldsValue({
      goods_source: item.props.source,
      goods_contact: item.props.contact,
      goods_mobile: item.props.mobile,
      goods_delivery: item.props.province + item.props.city + item.props.area,
      goods_adress: item.props.address
    })
    this.setState({
      report: item.props.report
    })
  }

  autoSelect = (value, option) => {
    this.props.form.setFieldsValue({
      recv_phone: option.key
    })
  }

  openPDF = () => {
    window.open(this.state.report)
  }

  goOrderList = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    }))
  }

  calculation = () => {
    setTimeout(() => {
      let yunju = this.props.form.getFieldValue('distance')
      let yunfeidanjia = this.props.form.getFieldValue('deliver_price')
      let shuliang = this.props.form.getFieldValue('saler_num')
      let xiaoshoujiage = this.props.form.getFieldValue('saler_price')
      this.setState({
        yunfei: ((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0)).toFixed(2),
        huofei: ((xiaoshoujiage - 0) * (shuliang - 0)).toFixed(2),
        heji: (((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0) + (xiaoshoujiage - 0) * (shuliang - 0)) * 1.075).toFixed(2)
      })
      if (this.props.location.pathname === '/order/doOrder') {
        return false
      }
      this.props.getNum(yunju, yunfeidanjia, shuliang, xiaoshoujiage)
    }, 100)
  }

  render() {
    const {editable, form, defaultSubmit, customOption, siteOption, supplierOption, goodsOption, loading} = this.props
    const customOptions = customOption.map(option => {
      return <Option key={option.id} value={option.id} mobile={option.customer_mobile}
                     contact={option.customer_contact}>{option.customer_name}</Option>
    })
    const siteOptions = siteOption.map(option => {
      return <Option key={option.id}
                     sitetype={option.site_type}
                     usertype={option.user_type_name}
                     province={option.delivery_province}
                     city={option.delivery_city}
                     area={option.delivery_area}
                     address={option.detailed_address}
                     shouhuo={option.shouhuo}
                     value={option.id}>{option.site_name}</Option>
    })
    const supplierOptions = supplierOption.map(option => {
      return <Option key={option.id} contact={option.supp_contact} mobile={option.supp_mobile}
                     value={option.id}>{option.supp_name}</Option>
    })
    const goodsOptions = goodsOption.map(option => {
      return <Option key={option.id} source={option.origin_gas_source}
                     contact={option.cargo_contact}
                     mobile={option.cargo_mobile}
                     province={option.cargo_province}
                     city={option.cargo_city}
                     area={option.cargo_area}
                     address={option.detailed_address}
                     report={option.temperament_report}
                     value={option.id}>{option.name_gas_source}</Option>
    })
    const {getFieldDecorator} = form
    return (
      <Card style={{borderColor: '#CFCFCF'}}>
        <Form>
          <div className={'itemTitle'}>1.客户信息</div>
          <Divider></Divider>
          <Row style={{marginTop: 35}}>
            <Col span={6}>
              <FormItem
                label="客户名称aaaaaaaaaaaaaaaa"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('cust_id', {
                  rules: [{required: true, message: '此项为必选项！'}],
                })(
                  <Select placeholder="请选择客户名称" style={{width: 210}} disabled={!editable}
                          onChange={this.customerChange}>
                    {customOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="客户联系人"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('cust_id2')(
                  <Input placeholder="请填写客户联系人姓名" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="联系电话"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('cust_id3')(
                  <Input placeholder="请填写联系电话" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                label="付款方式"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('pay_type', {
                  rules: [{required: true, message: '此项为必选项！'}],
                })(
                  <Select placeholder="请选择付款方式" style={{width: 150}} disabled={!editable}>
                    <Option value="1">预付款</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="销售金额"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('saler_price', {
                  rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
                })(
                  <Input placeholder="请填写销售价" addonAfter='元 / 吨' disabled={!editable} onChange={this.calculation}
                         className={styles.blueBd}/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="数量"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 15, offset: 1}}
              >
                {getFieldDecorator('saler_num', {
                  rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
                })(
                  <Input placeholder="请填写数量" addonAfter='吨' disabled={!editable} onChange={this.calculation}
                         className={styles.blueBd}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{marginBottom: 20}}>
            <Col span={6}>
              <FormItem
                label="配送方式"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('deliver_type', {
                  rules: [{required: true, message: '此项为必选项！'}],
                })(
                  <Select placeholder="请选择配送方式" style={{width: 150}} disabled={!editable}>
                    <Option value="1">卖家配送</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="运距"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('distance', {
                  rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
                })(
                  <Input placeholder="请填写运距" addonAfter='公里' disabled={!editable} onChange={this.calculation}
                         className={styles.blueBd}/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="运费单价"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 15, offset: 1}}
              >
                {getFieldDecorator('deliver_price', {
                  rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
                })(
                  <Input placeholder="请填写运费单价" addonAfter='元 / 吨 / 公里' disabled={!editable}
                         onChange={this.calculation} className={styles.blueBd}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <div className={'itemTitle'}>2.收货信息</div>
          <Divider></Divider>
          <Row style={{marginTop: 35}}>
            <Col span={6}>
              <FormItem
                label="站点简称"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('site_id', {
                  rules: [{required: true, message: '此项为必选项！'}],
                })(
                  <Select placeholder="请选择站点简称" style={{width: 210}} disabled={!editable} onChange={this.siteChange}>
                    {siteOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="站点类型"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('site_id2', {
                  rules: [{required: true, message: 'Please input your note!'}],
                })(
                  <Select placeholder="请选择站点类型" style={{width: 150}} disabled>
                    <Option value="1">加气站</Option>
                    <Option value="2">气化站</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="用户类型"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('site_id3', {
                  rules: [{required: true, message: 'Please input your note!'}],
                })(
                  <Select placeholder="请选择用户类型" style={{width: 150}} disabled>

                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                label="收货联系人"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('recv_contact', {
                  rules: [{required: true, message: 'Please input your note!'}],
                })(
                  <AutoComplete
                    onSelect={this.autoSelect}
                    dataSource={this.state.dataSource}
                    placeholder="请填写收货联系人姓名"
                    disabled={!editable}
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="联系电话"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('recv_phone', {
                  rules: [{
                    required: true,
                    message: '请填写正确联系电话！',
                    max: 11,
                    pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$'
                  }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder="请填写联系电话" disabled={!editable}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{marginBottom: 20}}>
            <Col span={6}>
              <FormItem
                label="交货时间"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('recv_time', {
                  rules: [{required: true, message: '请选择交货时间！'}],
                })(
                  <DatePicker placeholder="请选择交货时间" format={'YYYY-MM-DD HH:mm:ss'} disabled={!editable} showTime
                              locale={locale}></DatePicker>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <Col span={7}>
                <FormItem
                  label="收货地址"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                >
                  {getFieldDecorator('delivery', {
                    rules: [{required: true, message: '请选择收货地址！'}],
                  })(
                    <Input placeholder="请选择收货地址" style={{marginLeft: 16}} disabled/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label=""
                  labelCol={{span: 0}}
                  wrapperCol={{span: 12}}
                >
                  {getFieldDecorator('adress', {
                    rules: [{required: true, message: '请填写正确详细收货地址！'}],
                  })(
                    <Input placeholder="请选择详细收货地址" style={{marginLeft: 26}} disabled/>
                  )}
                </FormItem>
              </Col>
            </Col>
          </Row>
          <div className={'itemTitle'}>3.供应商信息</div>
          <Divider></Divider>
          <Row style={{marginTop: 35}}>
            <Col span={6}>
              <FormItem
                label="供应商名称"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('supp_id', {
                  rules: [{required: true, message: '此项为必选项！'}],
                })(
                  <Select placeholder="请选择供应商名称" style={{width: 210}} disabled={!editable}
                          onChange={this.suppChange}>
                    {supplierOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="供应商联系人"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('supp_id2')(
                  <Input placeholder="请填写供应商联系人" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="联系电话"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('supp_id3')(
                  <Input placeholder="请填写联系电话" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                label="采购价"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('purchase_price', {
                  rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
                })(
                  <Input placeholder="请填写采购价" addonAfter='元 / 吨' disabled={!editable} className={styles.blueBd}/>
                )}
              </FormItem>
            </Col>
            <Col span={5} style={{display: 'none'}}>
              <FormItem
                label="数量"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('shuliang', {
                  rules: [{required: false, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
                })(
                  <Input placeholder="请填写数量" addonAfter='吨' disabled={!editable}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <div className={'itemTitle'}>4.气源信息</div>
          <Divider></Divider>
          <Row style={{marginTop: 35}}>
            <Col span={6}>
              <FormItem
                label="气源名称"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('goods_id', {
                  rules: [{required: true, message: '此项为必选项！'}],
                })(
                  <Select placeholder="请选气源名称" style={{width: 210}} disabled={!editable} onChange={this.goodsChange}>
                    {goodsOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="气源产地"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('goods_source')(
                  <Input placeholder="请填写气源产地" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="气质报告"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('qiyuanchandi')(
                  <div>
                    {this.state.report ?
                      <div style={{color: '#3477ED', cursor: 'pointer'}} onClick={this.openPDF}>
                        <Icon type="file-text"/> 查看气质报告
                      </div>
                      :
                      <div>暂无气质报告</div>
                    }
                  </div>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                label="装货联系人"
                labelCol={{span: 7}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('goods_contact')(
                  <Input placeholder="请填写装货联系人姓名" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                label="联系电话"
                labelCol={{span: 7, offset: 1}}
                wrapperCol={{span: 13, offset: 1}}
              >
                {getFieldDecorator('goods_mobile')(
                  <Input placeholder="请填写联系电话" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{marginBottom: 20}}>
            <Col span={24}>
              <Col span={7}>
                <FormItem
                  label="装货地址"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                >
                  {getFieldDecorator('goods_delivery', {
                    rules: [{required: true, message: '请选择装货地址！'}],
                  })(
                    <Input placeholder="请选择装货地址" style={{marginLeft: 16}} disabled/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label=""
                  labelCol={{span: 0}}
                  wrapperCol={{span: 12}}
                >
                  {getFieldDecorator('goods_adress', {
                    rules: [{required: true, message: '请填写正确详细装货地址！'}],
                  })(
                    <Input placeholder="请填写详细装货地址" style={{marginLeft: 26}} disabled/>
                  )}
                </FormItem>
              </Col>
            </Col>
          </Row>
          {/*<div className={'itemTitle'} style={{display: 'none'}}>5.我的销售员</div>*/}
          {/*<Divider style={{display: 'none'}}></Divider>*/}
          {/*<Row style={{marginTop: 35}} style={{display: 'none'}}>*/}
          {/*<Col span={6}>*/}
          {/*<FormItem*/}
          {/*label="销售员"*/}
          {/*labelCol={{span: 7}}*/}
          {/*wrapperCol={{span: 13, offset: 1}}*/}
          {/*>*/}
          {/*{getFieldDecorator('xiaoshouyuan', {*/}
          {/*initialValue: JSON.parse(sessionStorage.getItem('userData')).name*/}
          {/*})(*/}
          {/*<Input placeholder="请填写销售员" disabled/>*/}
          {/*)}*/}
          {/*</FormItem>*/}
          {/*</Col>*/}
          {/*<Col span={5}>*/}
          {/*<FormItem*/}
          {/*label="联系电话"*/}
          {/*labelCol={{span: 7, offset: 1}}*/}
          {/*wrapperCol={{span: 13, offset: 1}}*/}
          {/*>*/}
          {/*{getFieldDecorator('lianxidianhua', {*/}
          {/*initialValue: JSON.parse(sessionStorage.getItem('userData')).mobile*/}
          {/*})(*/}
          {/*<Input placeholder="请填写联系电话" disabled/>*/}
          {/*)}*/}
          {/*</FormItem>*/}
          {/*</Col>*/}
          {/*</Row>*/}
        </Form>
        {defaultSubmit ?
          <div style={{fontSize: 16}}>
            <Divider></Divider>
            <div className={styles.resultBox}>
              <div style={{margin: '5px 0'}}>
                预计运费：￥{isNaN(this.state.yunfei) ? '填写错误' : this.state.yunfei}
              </div>
              <div style={{margin: '5px 0'}}>
                预计货款：￥{isNaN(this.state.huofei) ? '填写错误' : this.state.huofei}
              </div>
              <div style={{margin: '5px 0'}}>
                （多含7.5%预付款）
                <span style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'red'
                }}>合计金额：￥{isNaN(this.state.heji) ? '填写错误' : this.state.heji}</span>
              </div>
              <Button style={{margin: '10px 10px'}} onClick={this.goOrderList}>取消</Button>
              <Button type='primary' onClick={this.submit} loading={loading} style={{margin: '10px 0'}}>提交订单</Button>
            </div>
          </div>
          :
          ''
        }
      </Card>
    )
  }
}


function mapStateToProps(state) {
  const {customOption, siteOption, supplierOption, goodsOption} = state.order
  const {detailForm} = state.orderDetail
  return {
    customOption,
    siteOption,
    supplierOption,
    goodsOption,
    detailForm,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(Form.create()(withRouter(DetailForm)))
