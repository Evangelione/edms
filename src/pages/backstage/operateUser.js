import React from 'react'
import { connect } from 'dva'
import { Card, Button, Input, Form, Row, Col, Divider, Upload, Icon, Modal } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import withRouter from 'umi/withRouter'
import { IP } from '../../constants'
import { routerRedux } from 'dva/router'

const FormItem = Form.Item
const {TextArea} = Input

class OperateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '2',
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'avatar.png',
        status: 'done',
        url: this.props.editForm.logo,
      }],
      gly: false,
      yhqx: false,
      sjwh: false,
    }
  }

  componentDidMount() {
    if (this.props.location.query.type === 'edit') {
      if (!Object.keys(this.props.editForm).length) {
        this.props.dispatch(routerRedux.push({
          pathname: '/backstage',
        }))
      } else {
        this.setState({
          value: this.props.editForm.role,
          gly: ((this.props.editForm.auth - 0) & 1 !== 0) ? true : false,
          yhqx: ((this.props.editForm.auth - 0) & 2 !== 0) ? true : false,
          sjwh: ((this.props.editForm.auth - 0) & 4 !== 0) ? true : false,
        })
      }
    } else {
      this.setState({
        fileList: [],
      })
    }
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({fileList}) => this.setState({fileList})

  saveForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let auth = 0
        values.gly === true ? auth += 1 : auth += 0
        values.yhqx === true ? auth += 2 : auth += 0
        values.sjwh === true ? auth += 4 : auth += 0
        if (this.state.fileList.length === 0) {
          values.logo = ''
        } else {
          values.logo = this.props.imgUrl ? this.props.imgUrl : this.state.fileList[0].url
        }
        delete values.gly
        delete values.yhqx
        delete values.sjwh
        values.auth = this.props.editForm.auth === '7' ? '7' : '6'
        values.role = this.state.value
        if (values.pwd === undefined) values.pwd = ''
        if (this.props.location.query.type === 'insert') {
          this.props.dispatch({
            type: 'backstage/insertAdmin',
            payload: values,
          })
        } else {
          values.id = this.props.editForm.id
          this.props.dispatch({
            type: 'backstage/modifyAdmin',
            payload: values,
          })
        }
      }
    })
  }

  cacelForm = () => {
    this.props.form.resetFields()
    this.props.dispatch(routerRedux.push({
      pathname: '/backstage',
    }))
  }

  // radioChange = (e) => {
  //   this.setState({
  //     value: e.target.value,
  //   }, () => {
  //     if (e.target.value === '1') {
  //       this.props.form.setFieldsValue({
  //         gly: true,
  //         yhqx: true,
  //         sjwh: true
  //       })
  //       this.setState({
  //         gly: true,
  //         yhqx: true,
  //         sjwh: true
  //       })
  //     } else if (e.target.value === '2') {
  //       this.props.form.setFieldsValue({
  //         gly: false,
  //         yhqx: false,
  //         sjwh: false
  //       })
  //       this.setState({
  //         gly: false,
  //         yhqx: false,
  //         sjwh: false
  //       })
  //     }
  //   })
  // }

  // checkChange = (item, checked) => {
  //   if (item === 'gly') {
  //     this.setState({
  //       gly: checked
  //     }, () => {
  //       if (this.state.gly && this.state.yhqx && this.state.sjwh) {
  //         this.setState({
  //           value: '1',
  //         });
  //       } else {
  //         this.setState({
  //           value: '2',
  //         });
  //       }
  //     })
  //   } else if (item === 'yhqx') {
  //     this.setState({
  //       yhqx: checked
  //     }, () => {
  //       if (this.state.gly && this.state.yhqx && this.state.sjwh) {
  //         this.setState({
  //           value: '1',
  //         });
  //       } else {
  //         this.setState({
  //           value: '2',
  //         });
  //       }
  //     })
  //   } else if (item === 'sjwh') {
  //     this.setState({
  //       sjwh: checked
  //     }, () => {
  //       if (this.state.gly && this.state.yhqx && this.state.sjwh) {
  //         this.setState({
  //           value: '1',
  //         });
  //       } else {
  //         this.setState({
  //           value: '2',
  //         });
  //       }
  //     })
  //   }
  // }

  customRequest = (file) => {
    this.props.dispatch({
      type: 'backstage/postAvatar',
      payload: file,
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {previewVisible, previewImage, fileList} = this.state
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 5},
    }
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">仅支持JPG、PNG格式，文件小于2MB</div>
      </div>
    )
    const title = this.props.location.query.type === 'edit' ? '编辑' : '新增'
    return (
      <div>
        <div>
          <PageTitle>{title}企业</PageTitle>
          <Card>
            <Form>
              <div className='itemTitle'>1.ED+平台用户信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="LOGO"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('logo')(
                      <div>
                        <Upload
                          action={`${IP}/admin/company/img`}
                          listType="picture-card"
                          name='CompanyForm[img]'
                          fileList={fileList}
                          onPreview={this.handlePreview}
                          onChange={this.handleChange}
                          customRequest={this.customRequest}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                          <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                      </div>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="平台名称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('platform_name', {
                      initialValue: this.props.editForm.platform_name ? this.props.editForm.platform_name : '',
                      rules: [{required: true, message: '请填写平台名称!'}],
                    })(
                      <Input placeholder="请填写平台名称"/>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>2.企业信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="企业名称"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('full_name', {
                      initialValue: this.props.editForm.full_name ? this.props.editForm.full_name : '',
                      rules: [{required: true, message: '请填写企业名称!'}],
                    })(
                      <Input placeholder="请填写企业名称"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="联系人"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('contact', {
                      initialValue: this.props.editForm.contact ? this.props.editForm.contact : '',
                      rules: [{required: true, message: '请填写联系人!'}],
                    })(
                      <Input placeholder="请填写联系人"/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="手机号"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('contact_mobile', {
                      initialValue: this.props.editForm.contact_mobile ? this.props.editForm.contact_mobile : '',
                      rules: [{
                        required: true,
                        message: '请填写正确手机号！',
                        max: 11,
                        pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7,9]))\\d{8}$',
                      }],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="请填写手机号"/>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>3.账号密码</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="账号"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('account', {
                      initialValue: this.props.editForm.account ? this.props.editForm.account : '',
                      rules: [{required: true, message: '请填写正确账号！', max: 30, pattern: '^[A-Za-z0-9]{1,30}$'}],
                      validateTrigger: 'onBlur',
                    })(
                      <Input placeholder="只支持英文/数字"/>,
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
                      <Input placeholder="6-16位字母/数字/下划线" type='password'/>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className='itemTitle'>4.备注信息</div>
              <Divider></Divider>
              <Row style={{marginTop: 35}}>
                <Col span={24}>
                  <FormItem
                    label="备注"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('remark', {
                      initialValue: this.props.editForm.remark ? this.props.editForm.remark : '',
                    })(
                      <TextArea placeholder="请输入备注信息" autosize={{ minRows: 2, maxRows: 6 }} />
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
  const {imgUrl, editForm} = state.backstage
  return {
    imgUrl,
    editForm,
  }
}

export default Form.create()(connect(mapStateToProps)(withRouter(OperateUser)))
