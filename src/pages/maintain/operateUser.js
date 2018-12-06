import React from 'react'
import { connect } from 'dva'
import { Card, Button, Input, Form, Row, Col, Divider, Select, Cascader } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import withRouter from 'umi/withRouter'
import { routerRedux } from 'dva/router'
import { REGS } from '../../common/constants'

const FormItem = Form.Item
const Option = Select.Option

class operateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOption: '1',
      userType1: ['LNG加气站', 'L-CNG加气站', 'LNG L-CNG合建站', 'LNG CNG合建站', 'LNG 汽柴油合建站', 'LNG泵船', '其他'],
      userType2: ['电厂', '城市居民', '城市商服', '城市供暖', '工业燃料', '工业原料', '其他', '分布式项目'],
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        name: '',
      },
    })
    if (this.props.location.query.type === 'edit') {
      if (!Object.keys(this.props.editForm).length) {
        this.props.dispatch(routerRedux.push({
          pathname: '/maintain',
        }))
        return false
      }
      this.setState({
        selectOption: this.props.editForm.site_type,
      }, () => {
        this.props.form.setFieldsValue({
          user_type: this.props.editForm.user_type - 0,
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
        if (delivery_area === undefined) {
          delivery_area = ''
        }
        values.delivery_province = delivery_province
        values.delivery_city = delivery_city
        values.delivery_area = delivery_area
        delete values.delivery
        if (this.props.location.query.type === 'insert') {
          this.props.dispatch({
            type: 'maintain/insertCustomer',
            payload: values,
          })
        } else {
          values.id = this.props.editForm.id
          this.props.dispatch({
            type: 'maintain/modifyCustomer',
            payload: values,
          })
        }
      }
    })
  }

  cacelForm = () => {
    this.props.form.resetFields()
    this.props.dispatch(routerRedux.push({
      pathname: '/maintain',
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
        name: targetOption.value,
        targetOption,
      },
    })
  }

  // displayRender = (labels, selectedOptions, value) => labels.map((label, i) => {
  //   const option = selectedOptions[i]
  //   this.firstEnter = this.props.firstEnter;
  //   if (this.firstEnter && labels.length == 1) {
  //     var mvs = value.filter(function (item, index) {
  //       if (item) {
  //         return item
  //       }
  //     });
  //     var len = mvs.length;
  //     var mks = mvs.map(function (item, index) {
  //       if (item) {
  //         if (len - 1 == index) {
  //           return item
  //         } else {
  //           return item + "/"
  //         }
  //       }
  //     });
  //     return <span key={option.value}>{mks.join("")} </span>;
  //   }
  //
  //   if (i === labels.length - 1) {
  //     return (
  //       <span key={option.value}>
  //           {label}
  //         </span>
  //     )
  //   }
  //   return <span key={option.value}>{label} / </span>;
  // })

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
          <PageTitle>{title}客户</PageTitle>
          <Card>
            <Form>
              <div className='itemTitle'>1.客户信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="客户姓名"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('customer_name', {
                      initialValue: this.props.editForm.customer_name ? this.props.editForm.customer_name : '',
                      rules: [{required: true, message: '请填写客户公司全称（合同名称）！'}],
                    })(
                      <Input placeholder="请填写客户公司全称（合同名称）"/>,
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
                      <Select placeholder="请选择客户类型">
                        <Option value="1">终端用户</Option>
                        <Option value="2">贸易商</Option>
                      </Select>,
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
                      rules: [{required: true, message: '请输入客户联系人姓名！', pattern: REGS.name, max: 10}],
                    })(
                      <Input placeholder="请填写客户联系人姓名"/>,
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
                        pattern: REGS.phone,
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话"/>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>2.站点信息</div>
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
                      <Input placeholder="请填写站点简称（公司缩写+地区+加气站）"/>,
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
                      rules: [{required: true, message: '请填写站点全称（合同名称）！'}],
                    })(
                      <Input placeholder="请填写站点全称（合同名称）"/>,
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
                      <Select placeholder="请选择站点类型" onChange={this.selectChange}>
                        <Option value="1">加气站</Option>
                        <Option value="2">气化站</Option>
                      </Select>,
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
                      <Select placeholder="请选择用户类型">
                        {this.state.selectOption === '1' ?
                          typeList1 : typeList2
                        }
                      </Select>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>3.收货信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="收货联系人1"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('delivery_contact1', {
                      initialValue: this.props.editForm.delivery_contact1 ? this.props.editForm.delivery_contact1 : '',
                      rules: [{required: true, message: '请填写收货联系人姓名！', pattern: REGS.name, max: 10}],
                    })(
                      <Input placeholder="请填写收货联系人姓名"/>,
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
                        pattern: REGS.phone,
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话"/>,
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
                      rules: [{message: '请填写收货联系人！', pattern: REGS.name, max: 10}],
                    })(
                      <Input placeholder="请填写收货联系人姓名"/>,
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
                        pattern: REGS.phone,
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话"/>,
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
                        initialValue: this.props.editForm ? [this.props.editForm.delivery_province.name, this.props.editForm.delivery_city.name, this.props.editForm.delivery_area.name] : undefined,
                        rules: [{required: true, message: '请选择收货地址！'}],
                      })(
                        <Cascader options={this.props.CascaderOptions}
                                  loadData={this.loadData}
                                  placeholder="请选择收货地址"
                          // displayRender={(labels, selectedOptions) => this.displayRender(labels, selectedOptions, [this.props.editForm.delivery_province.name, this.props.editForm.delivery_city.name, this.props.editForm.delivery_area.name])}
                        />,
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
                        <Input placeholder="请填写详细收货地址"/>,
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
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(withRouter(operateUser)))
