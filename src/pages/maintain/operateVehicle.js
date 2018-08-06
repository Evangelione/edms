import React from 'react'
import { Card, Button, Input, Form, Row, Col, Divider } from 'antd'
import { connect } from 'dva'
import PageTitle from '../../components/PageTitle/PageTitle'
import withRouter from 'umi/withRouter'
import { routerRedux } from "dva/router";

const FormItem = Form.Item

class operateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (this.props.location.query.type === 'edit') {
      if (!Object.keys(this.props.editForm).length) {
        this.props.dispatch(routerRedux.push({
          pathname: '/maintain'
        }))
      }
    }
  }

  saveForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.location.query.type === 'insert') {
          this.props.dispatch({
            type: 'maintain/insertCar',
            payload: values
          })
        } else {
          values.id = this.props.editForm.id
          this.props.dispatch({
            type: 'maintain/modifyCar',
            payload: values
          })
        }
      }
    })
  }

  cacelForm = () => {
    this.props.form.resetFields()
    this.props.dispatch(routerRedux.push({
      pathname: '/maintain'
    }))
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
          <PageTitle>{title}物流</PageTitle>
          <Card>
            <Form>
              <div className={'itemTitle'}>1.物流公司信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="物流公司名称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('logistic_company', {
                      initialValue: this.props.editForm.logistic_company ? this.props.editForm.logistic_company : '',
                      rules: [{required: true, message: '请填写物流公司全称！'}],
                    })(
                      <Input placeholder="请填写物流公司全称（合同名称）"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="物流公司联系人"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('logistic_contact', {
                      initialValue: this.props.editForm.logistic_contact ? this.props.editForm.logistic_contact : '',
                      rules: [{required: true, message: '请填写物流公司联系人姓名！'}],
                    })(
                      <Input placeholder="请填写物流公司联系人姓名"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('logistic_mobile', {
                      initialValue: this.props.editForm.logistic_mobile ? this.props.editForm.logistic_mobile : '',
                      rules: [{
                        required: true,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7,9]))\\d{8}$'
                      }],
                    })(
                      <Input placeholder="请填写联系电话"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>2.车辆信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="车头牌照"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('car_head', {
                      initialValue: this.props.editForm.car_head ? this.props.editForm.car_head : '',
                      rules: [{required: true, message: '请填写车头牌照！'}],
                    })(
                      <Input placeholder="请填写车头牌照"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="车挂牌照"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('car_body', {
                      initialValue: this.props.editForm.car_body ? this.props.editForm.car_body : '',
                      rules: [{required: true, message: '请填写车挂牌照！'}],
                    })(
                      <Input placeholder="请填写车挂牌照"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="额定载重"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('rated_load', {
                      initialValue: this.props.editForm.rated_load ? this.props.editForm.rated_load : '',
                      rules: [{required: true, message: '请填写额定载重！'}],
                    })(
                      <Input placeholder="请填写额定载重" addonAfter='吨'/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>3.司机信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="司机"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('driver', {
                      initialValue: this.props.editForm.driver ? this.props.editForm.driver : '',
                      rules: [{required: true, message: '请填写司机姓名！'}],
                    })(
                      <Input placeholder="请填写司机姓名"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('driver_mobile', {
                      initialValue: this.props.editForm.driver_mobile ? this.props.editForm.driver_mobile : '',
                      rules: [{
                        required: true,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7,9]))\\d{8}$'
                      }],
                    })(
                      <Input placeholder="请填写联系电话"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="押运员"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('supercargo', {
                      initialValue: this.props.editForm.supercargo ? this.props.editForm.supercargo : '',
                      rules: [{required: false, message: '请填写押运员！'}],
                    })(
                      <Input placeholder="请填写押运员"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系电话"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('supercargo_mobile', {
                      initialValue: this.props.editForm.supercargo_mobile ? this.props.editForm.supercargo_mobile : '',
                      rules: [{
                        required: false,
                        message: '请填写正确联系电话！',
                        max: 11,
                        pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7,9]))\\d{8}$'
                      }],
                    })(
                      <Input placeholder="请填写联系电话"/>
                    )}
                  </FormItem>
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
  const {editForm} = state.maintain
  return {
    editForm,
    loading: state.loading.models.order
  }
}

export default Form.create()(connect(mapStateToProps)(withRouter(operateUser)))
