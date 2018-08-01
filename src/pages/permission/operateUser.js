import React from 'react'
import { Card, Button, Input, Form, Row, Col, Divider, Upload, Icon, Modal, Switch } from 'antd'
import { connect } from 'dva'
import PageTitle from '../../components/PageTitle/PageTitle'
import withRouter from 'umi/withRouter'
import { IP } from '../../constants'
import { routerRedux } from "dva/router";

const FormItem = Form.Item

class OperateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: true,
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'avatar.png',
        status: 'done',
        url: this.props.editForm.head_img,
      }]
    }
  }

  componentDidMount() {
    if (this.props.location.query.type === 'edit') {
      if (!Object.keys(this.props.editForm).length) {
        this.props.dispatch(routerRedux.push({
          pathname: '/permission'
        }))
      }
    } else {
      this.setState({
        fileList: []
      })
    }
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => this.setState({fileList})

  saveForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let auth = 0
        values.wddd === true ? auth += 1 : auth += 0
        values.wdwl === true ? auth += 2 : auth += 0
        values.wdzw === true ? auth += 4 : auth += 0
        values.wdkh === true ? auth += 8 : auth += 0
        values.wdgys === true ? auth += 16 : auth += 0
        values.wdgs === true ? auth += 32 : auth += 0
        if (this.state.fileList.length === 0) {
          values.head_img = ''
        } else {
          values.head_img = this.props.imgUrl ? this.props.imgUrl : this.state.fileList[0].url
        }
        delete values.wddd
        delete values.wdwl
        delete values.wdzw
        delete values.wdkh
        delete values.wdgys
        delete values.wdgs
        values.auth = auth.toString()
        if (this.props.location.query.type === 'insert') {
          this.props.dispatch({
            type: 'permission/insertAdmin',
            payload: values
          })
        } else {
          values.id = this.props.editForm.id
          this.props.dispatch({
            type: 'permission/modifyAdmin',
            payload: values
          })
        }
      }
    })
  }

  cacelForm = () => {
    this.props.form.resetFields()
    this.props.dispatch(routerRedux.push({
      pathname: '/permission'
    }))
  }

  onRemove = () => {
    if (this.state.editable === false) return false
  }

  customRequest = (file) => {
    this.props.dispatch({type: 'permission/postAvatar', payload: file})
  }


  render() {
    const {getFieldDecorator} = this.props.form
    const {previewVisible, previewImage, fileList} = this.state
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 5},
    }
    const formItemLayout2 = {
      labelCol: {span: 12},
      wrapperCol: {span: 12},
    }
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const title = this.props.location.query.type === 'edit' ? '编辑' : '新增'
    return (
      <div>
        <div>
          <PageTitle>{title}用户</PageTitle>
          <Card>
            <Form>
              <div className={'itemTitle'}>1.用户信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="头像"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('head_img')(
                      <div>
                        <Upload
                          action={`${IP}/admin/user/img`}
                          listType="picture-card"
                          name='UserForm[img]'
                          fileList={fileList}
                          onPreview={this.handlePreview}
                          onChange={this.handleChange}
                          onRemove={this.onRemove}
                          customRequest={this.customRequest}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                          <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                      </div>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="姓名"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name', {
                      initialValue: this.props.editForm.name ? this.props.editForm.name : '',
                      rules: [{required: true, message: '请填写姓名!'}],
                    })(
                      <Input placeholder="请填写姓名..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="手机号"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('mobile', {
                      initialValue: this.props.editForm.mobile ? this.props.editForm.mobile : '',
                      rules: [{
                        message: '请填写正确手机号！',
                        max: 11,
                        pattern: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写手机号..."/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>2.账号密码</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="账号"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('account', {
                      initialValue: this.props.editForm.account ? this.props.editForm.account : '',
                      rules: [{required: true, message: '请填写正确账号！', max: 30, pattern: '^[A-Za-z0-9]{1,11}$'}],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="只支持英文/数字..."/>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="密码"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('pwd', {
                      rules: [{required: false, message: '请填写正确密码！', min: 6, max: 16, pattern: '^(\\w){6,16}$'}],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="6-16位字母/数字/下划线..." type='password'/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>3.用户角色</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="角色名称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('role', {
                      initialValue: this.props.editForm.role ? this.props.editForm.role : '',
                      rules: [{required: true, message: '请填角色名称！', max: 6, pattern: '^[\u4e00-\u9fa5]{0,}$'}],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder='请输入角色名称，例：销售'/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>4.角色权限</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={5}>
                  <FormItem
                    label="我的订单"
                    {...formItemLayout2}
                  >
                    {getFieldDecorator('wddd', {
                      valuePropName: 'checked',
                      initialValue: (((this.props.editForm.auth - 0) & 1) !== 0) ? true : false,
                    })(
                      <Switch/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    label="我的物流"
                    {...formItemLayout2}
                  >
                    {getFieldDecorator('wdwl', {
                      valuePropName: 'checked',
                      initialValue: (((this.props.editForm.auth - 0) & 2) !== 0) ? true : false,
                    })(
                      <Switch/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    label="我的账务"
                    {...formItemLayout2}
                  >
                    {getFieldDecorator('wdzw', {
                      valuePropName: 'checked',
                      initialValue: (((this.props.editForm.auth - 0) & 4) !== 0) ? true : false,
                    })(
                      <Switch/>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{marginTop: 35}}>
                <Col span={5}>
                  <FormItem
                    label="我的客户"
                    {...formItemLayout2}
                  >
                    {getFieldDecorator('wdkh', {
                      valuePropName: 'checked',
                      initialValue: (((this.props.editForm.auth - 0) & 8) !== 0) ? true : false,
                    })(
                      <Switch/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    label="我的供应商"
                    {...formItemLayout2}
                  >
                    {getFieldDecorator('wdgys', {
                      valuePropName: 'checked',
                      initialValue: (((this.props.editForm.auth - 0) & 16) !== 0) ? true : false,
                    })(
                      <Switch/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    label="我的公司"
                    {...formItemLayout2}
                  >
                    {getFieldDecorator('wdgs', {
                      valuePropName: 'checked',
                      initialValue: (((this.props.editForm.auth - 0) & 32) !== 0) ? true : false,
                    })(
                      <Switch/>,
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
  const {imgUrl, editForm} = state.permission
  return {
    imgUrl,
    editForm
  }
}

export default Form.create()(connect(mapStateToProps)(withRouter(OperateUser)))
