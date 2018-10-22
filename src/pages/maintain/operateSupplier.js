import React from 'react'
import { connect } from 'dva'
import { Card, Button, Input, Form, Row, Col, Divider, Upload, Icon, Cascader, Select, message } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import withRouter from 'umi/withRouter'
import { IP } from '../../constants'
import { routerRedux } from 'dva/router'

const FormItem = Form.Item
const Option = Select.Option

class operateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      editable: false,
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
      }
    }
  }

  saveForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.temperament_report = this.props.imgUrl
        let cargo_province = values.delivery[0]
        let cargo_city = values.delivery[1]
        let cargo_area = values.delivery[2]
        values.cargo_province = cargo_province
        values.cargo_city = cargo_city
        values.cargo_area = cargo_area
        delete values.delivery
        if (this.props.location.query.type === 'insert') {
          this.props.dispatch({
            type: 'maintain/insertSupplier',
            payload: values,
          })
        } else {
          values.id = this.props.editForm.id
          this.props.dispatch({
            type: 'maintain/modifySupplier',
            payload: values,
          })
        }
      }
    })
  }

  editForm = () => {
    this.setState({
      editable: true,
    })
  }

  cacelForm = () => {
    this.props.form.resetFields()
    this.props.dispatch(routerRedux.push({
      pathname: '/maintain',
    }))
  }

  customRequest = (file) => {
    this.props.dispatch({
      type: 'maintain/postReport',
      payload: file,
    })
  }

  viewReport = () => {
    window.open(this.props.editForm.temperament_report)
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

  beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf'
    if (!isPDF) {
      message.error('You can only upload JPG file!')
    }
    const isLt20M = file.size / 1024 / 1024 < 20
    if (!isLt20M) {
      message.error('Image must smaller than 2MB!')
    }
    return isPDF && isLt20M
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 5},
    }
    const title = this.props.location.query.type === 'edit' ? '编辑' : '新增'
    return (
      <div>
        <div>
          <PageTitle>{title}供应商</PageTitle>
          <Card>
            <Form>
              <div className='itemTitle'>1.供应商信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="供应商名称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('supp_name', {
                      initialValue: this.props.editForm.supp_name ? this.props.editForm.supp_name : '',
                      rules: [{required: true, message: '填写正确供应商名称!'}],
                    })(
                      <Input placeholder="请填写供应商全称（合同名称）"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="供应商类型"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('supp_type', {
                      initialValue: this.props.editForm.supp_type ? this.props.editForm.supp_type : undefined,
                      rules: [{required: true, message: '此项为必选项！'}],
                    })(
                      <Select placeholder="请选择供应商类型">
                        <Option value="1">贸易商</Option>
                        <Option value="2">运贸商</Option>
                        <Option value="3">液厂</Option>
                        <Option value="4">接收站</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="供应商联系人"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('supp_contact', {
                      initialValue: this.props.editForm.supp_contact ? this.props.editForm.supp_contact : '',
                      rules: [{required: true, message: '填写正确供应商联系人！', pattern: '^[\\u4e00-\\u9fa5]+$', max: 10}],
                    })(
                      <Input placeholder="请填写供应商联系人姓名"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('supp_mobile', {
                      initialValue: this.props.editForm.supp_mobile ? this.props.editForm.supp_mobile : '',
                      rules: [{
                        required: true,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7,9]))\\d{8}$',
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写联系电话"/>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>2.气源信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="气源名称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name_gas_source', {
                      initialValue: this.props.editForm.name_gas_source ? this.props.editForm.name_gas_source : '',
                      rules: [{required: true, message: '填写正确气源名称！'}],
                    })(
                      <Input placeholder="请填写气源名称"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="气源产地"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('origin_gas_source', {
                      initialValue: this.props.editForm.origin_gas_source ? this.props.editForm.origin_gas_source : '',
                      rules: [{required: true, message: '填写正确气源产地！'}],
                    })(
                      <Input placeholder="请填写气源产地"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="气质报告"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('temperament_report')(
                      <div>
                        {this.props.editForm.temperament_report ?
                          <Button className='blueBorder' style={{marginRight: 10}}
                                  onClick={this.viewReport}>查看气质报告</Button>
                          : ''
                        }
                        <Upload
                          accept='.pdf'
                          name='SuppForm[pdf]'
                          action={`${IP}/admin/supplier/add-report`}
                          customRequest={this.customRequest}
                          beforeUpload={this.beforeUpload}
                        >
                          {this.props.editForm.temperament_report ?
                            <Button>
                              <Icon type="plus"/>重新上传气质报告
                            </Button> :
                            <Button>
                              <Icon type="plus"/>上传气质报告
                            </Button>
                          }
                        </Upload>,

                      </div>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>3.装货信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="装货联系人"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('cargo_contact', {
                      initialValue: this.props.editForm.cargo_contact ? this.props.editForm.cargo_contact : '',
                      rules: [{required: true, message: '填写正确装货联系人姓名！', pattern: '^[\\u4e00-\\u9fa5]+$', max: 10}],
                    })(
                      <Input placeholder="请填写装货联系人姓名"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('cargo_mobile', {
                      initialValue: this.props.editForm.cargo_mobile ? this.props.editForm.cargo_mobile : '',
                      rules: [{
                        required: true,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7,9]))\\d{8}$',
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
                      label="装货地址"
                      labelCol={{span: 6}}
                      wrapperCol={{span: 18}}
                    >
                      {getFieldDecorator('delivery', {
                        initialValue: this.props.editForm ? [[this.props.editForm.cargo_province.name, this.props.editForm.cargo_city.name, this.props.editForm.cargo_area.name]] : undefined,
                        rules: [{required: true, message: '请填写正确装货地址！'}],
                      })(
                        <Cascader options={this.props.CascaderOptions}
                                  loadData={this.loadData}
                                  placeholder="请选择装货地址"
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
                        rules: [{required: true, message: '请填写正确详细装货地址！'}],
                      })(
                        <Input placeholder="请填写详细装货地址"/>,
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
  const {imgUrl, editForm, CascaderOptions} = state.maintain
  return {
    imgUrl,
    editForm,
    CascaderOptions,
  }
}

export default connect(mapStateToProps)(withRouter(Form.create()(operateUser)))
