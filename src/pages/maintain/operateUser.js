import React from 'react'
import {Card, Button, Input, Form, Row, Col, Divider, Select, Cascader} from 'antd'
import {connect} from 'dva'
import PageTitle from '../../components/PageTitle/PageTitle'
import withRouter from 'umi/withRouter'
import {routerRedux} from "dva/router";

const FormItem = Form.Item
const Option = Select.Option

class operateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOption: '1',
      userType1: ['LNG加气站', 'L-CNG加气站', 'LNG L-CNG合建站', 'LNG CNG合建站', 'LNG 汽柴油合建站', 'LNG泵船', '其他'],
      userType2: ['电厂', '城市居民', '城市商服', '城市供暖', '工业燃料', '工业原料', '其他', '分布式项目']
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        district_code: ''
      }
    })
    if (this.props.location.query.type === 'edit') {
      console.log(this.props.editForm)
      if (!Object.keys(this.props.editForm).length) {
        this.props.dispatch(routerRedux.push({
          pathname: '/maintain'
        }))
        return false
      }
      this.setState({
        selectOption: this.props.editForm.site_type
      }, () => {
        this.props.form.setFieldsValue({
          user_type: this.props.editForm.user_type - 0
        })
      })
    }
  }

  saveForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let delivery_province = values.delivery[0]
        let delivery_city = values.delivery[1]
        let delivery_area = values.delivery[2]
        values.delivery_province = delivery_province
        values.delivery_city = delivery_city
        values.delivery_area = delivery_area
        delete values.delivery
        console.log(values)
        if (this.props.location.query.type === 'insert') {
          this.props.dispatch({
            type: 'maintain/insertCustomer',
            payload: values
          })
        } else {
          values.id = this.props.editForm.id
          this.props.dispatch({
            type: 'maintain/modifyCustomer',
            payload: values
          })
        }
        // this.props.dispatch({
        //   type: 'maintain/save',
        //   payload: {currentTab: 2}
        // })
      }
    })
  }

  cacelForm = () => {
    this.props.form.resetFields()
    this.props.dispatch(routerRedux.push({
      pathname: '/maintain'
    }))
  }

  selectChange = (value) => {
    this.setState({
      selectOption: value,
    })
    this.props.form.setFieldsValue({
      user_type: 1,
    })

  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        district_code: targetOption.code,
        targetOption
      }
    })
  }

  render() {
    const typeList1 = this.state.userType1.map((type, index) => <Option key={type} value={index + 1}>{type}</Option>)
    const typeList2 = this.state.userType2.map((type, index) => <Option key={type} value={index + 1}>{type}</Option>)
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 5},
    }
    const title = this.props.location.query.type === 'edit' ? '编辑' : '新增'
    return (
      <div>
        <div>
          <PageTitle>{title}用户</PageTitle>
          <Card>
            <Form>
              <div className={'itemTitle'}>1.客户信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="客户姓名"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('customer_name', {
                      initialValue: this.props.editForm.customer_name ? this.props.editForm.customer_name : '',
                      rules: [{required: true, message: '请输入客户姓名！'}],
                    })(
                      <Input placeholder="请填写客户姓名..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="客户类型"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('customer_type', {
                      initialValue: this.props.editForm.customer_type ? this.props.editForm.customer_type : undefined,
                      rules: [{required: true, message: '请选择客户类型！'}],
                    })(
                      <Select placeholder="请选择客户类型...">
                        <Option value="1">终端用户</Option>
                        <Option value="2">贸易商</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="客户联系人"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('customer_contact', {
                      initialValue: this.props.editForm.customer_contact ? this.props.editForm.customer_contact : '',
                      rules: [{required: true, message: '请输入客户联系人！'}],
                    })(
                      <Input placeholder="请填写客户联系人..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('customer_mobile', {
                      initialValue: this.props.editForm.customer_mobile ? this.props.editForm.customer_mobile : '',
                      rules: [{
                        required: true,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话..."/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>2.站点信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="站点简称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('site_name', {
                      initialValue: this.props.editForm.site_name ? this.props.editForm.site_name : '',
                      rules: [{required: true, message: '请填写站点简称！'}],
                    })(
                      <Input placeholder="请填写站点简称..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="站点全称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('full_site_name', {
                      initialValue: this.props.editForm.full_site_name ? this.props.editForm.full_site_name : '',
                      rules: [{required: true, message: '请填写站点全称！'}],
                    })(
                      <Input placeholder="请填写站点全称..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="站点类型"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('site_type', {
                      initialValue: this.props.editForm.site_type ? this.props.editForm.site_type : undefined,
                      rules: [{required: true, message: '请选择站点类型！'}],
                    })(
                      <Select placeholder="请选择站点类型..." onChange={this.selectChange}>
                        <Option value="1">加气站</Option>
                        <Option value="2">气化站</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="用户类型"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('user_type', {
                      rules: [{required: true, message: '请选择用户类型！'}],
                    })(
                      <Select placeholder="请选择用户类型...">
                        {this.state.selectOption === '1' ?
                          typeList1 : typeList2
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>3.收货信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="收货联系人1"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('delivery_contact1', {
                      initialValue: this.props.editForm.delivery_contact1 ? this.props.editForm.delivery_contact1 : '',
                      rules: [{required: true, message: '请填写收货联系人！'}],
                    })(
                      <Input placeholder="请填写收货联系人1..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('delivery_mobile1', {
                      initialValue: this.props.editForm.delivery_mobile1 ? this.props.editForm.delivery_mobile1 : '',
                      rules: [{
                        required: true,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="收货联系人2"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('delivery_contact2', {
                      initialValue: this.props.editForm.delivery_mobile2 ? this.props.editForm.delivery_mobile2 : '',
                      rules: [{message: '请填写收货联系人！'}],
                    })(
                      <Input placeholder="请填写收货联系人2..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('delivery_mobile2', {
                      initialValue: this.props.editForm.delivery_mobile2 ? this.props.editForm.delivery_mobile2 : '',
                      rules: [{
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24} style={{margin: '0 10px'}}>
                  <Col span={7} style={{padding: '0 10px'}}>
                    <FormItem
                      label="收货地址"
                      labelCol={{span: 6}}
                      wrapperCol={{span: 18}}
                    >
                      {getFieldDecorator('delivery', {
                        initialValue: this.props.editForm ? [this.props.editForm.delivery_province.code, this.props.editForm.delivery_city.code, this.props.editForm.delivery_area.code] : undefined,
                        rules: [{required: true, message: '请选择收货地址！'}],
                      })(
                        <Cascader options={this.props.CascaderOptions}
                                  loadData={this.loadData}
                                  placeholder="请选择收货地址..."
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      label=""
                      labelCol={{span: 0}}
                      wrapperCol={{span: 12}}
                    >
                      {getFieldDecorator('detailed_address', {
                        initialValue: this.props.editForm.detailed_address ? this.props.editForm.detailed_address : '',
                        rules: [{required: true, message: '请填写正确详细收货地址！'}],
                      })(
                        <Input placeholder="请选择详细收货地址..."/>
                      )}
                    </FormItem>
                  </Col>
                </Col>
              </Row>
              <Row style={{width: 500, margin: '42px 0 20px 85px'}}>
                <Col span={5} offset={2}>
                  <Button className='grayButton' style={{width: 100}} onClick={this.cacelForm}>取消</Button>
                </Col>
                <Col span={5} offset={2}>
                  <Button type='primary' style={{width: 100}} onClick={this.saveForm}>保存</Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {editForm, CascaderOptions} = state.maintain
  return {
    editForm,
    CascaderOptions,
    loading: state.loading.models.order
  }
}

export default Form.create()(connect(mapStateToProps)(withRouter(operateUser)))
