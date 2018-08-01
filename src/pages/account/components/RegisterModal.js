import React from 'react'
import {Modal, DatePicker, Button, Row, Col, Form, Input, Select, Upload, Icon, message} from 'antd'
import {connect} from 'dva'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const FormItem = Form.Item
const Option = Select.Option

class RegisterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }

  showModal = () => this.setState({visible: true})

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  handleImgCancel = () => this.setState({previewVisible: false})

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/png';
    if (!isJPG) {
      message.error('You can only upload PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    this.setState({
      file: {
        file,
        filename: 'AccountForm[cert]'
      }
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  fileChange = (info) => {
    this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      imageUrl,
    }))
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  customRequest = (id) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          uploading: true,
        })
        this.props.dispatch({
          type: this.props.type === 'client' ? 'balance/clientRegistration' : 'balance/supplierRegistration',
          payload: {
            file: this.state.file,
            time: values.send_time.format('YYYY-MM-DD hh:00:00'),
            sum: values.record_sum,
            id,
          }
        }).then(() => {
          this.setState({
            uploading: false,
            visible: false
          })
        })
      }
    })
  }

  cancelRequest = () => {
    return false
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {children, title, id} = this.props
    const formItemLayout = {
      labelCol: {
        xs: {span: 4, offset: 1},
        sm: {span: 4, offset: 1},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 12},
      },
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (

      <div onClick={this.showModal}>
        {children}
        <Modal
          title={title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={null}
        >
          <Form style={{margin: '10px 0 50px'}}>
            <FormItem
              {...formItemLayout}
              label="公司名称"
            >
              {getFieldDecorator('name', {
                initialValue: this.props.name,
              })(
                <Input placeholder='请输入公司名称...' disabled/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="付款渠道"
            >
              {getFieldDecorator('qd', {
                initialValue: ['jack']
              })(
                <Select placeholder='请选择付款渠道...'>
                  <Option value="jack">网银转账</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.type ==='client' ? '收款登记' : '付款登记'}
            >
              {getFieldDecorator('send_time', {
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <DatePicker locale={locale} format={'YYYY-MM-DD hh:00:00'} style={{width: '100%'}}></DatePicker>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.type ==='client' ? '收款金额' : '付款金额'}
            >
              {getFieldDecorator('record_sum', {
                rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
              })(
                <Input placeholder={this.props.type ==='client' ? '请输入收款金额...' : '请输入付款金额...'}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上传凭证"
            >
              {getFieldDecorator('sc', {
                rules: [{required: true, message: '请选择上传凭证！'}],
              })(
                <div>
                  <Upload
                    accept='.png'
                    name="AccountForm[cert]"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action=""
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                    onChange={this.fileChange}
                    customRequest={this.cancelRequest}
                  >
                    {this.state.imageUrl ?
                      <img src={this.state.imageUrl} alt="avatar"  style={{width: '250px', height: '200px'}}/> : uploadButton}
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} style={{width: '250px', height: '200px'}}>
                    <img alt="example" style={{width: '250px', height: '200px'}} src={this.state.previewImage}/>
                  </Modal>
                </div>
              )}
            </FormItem>
          </Form>
          <Row type='flex' justify='space-between' style={{margin: '20px 10px 10px 10px'}}>
            <Col>
              <Button className='grayButton' onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col>
              <Button type='primary' style={{width: 120}}
                      onClick={this.customRequest.bind(null, id)} loading={this.state.uploading}>提交 </Button>
            </Col>
          </Row>
        </Modal>
      </div>

    )
  }
}

export default connect()(Form.create()(RegisterModal))
