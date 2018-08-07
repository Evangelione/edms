import React from 'react'
import {connect} from 'dva'
import {Modal, Button, Row, Col, Form, Input, Select, Upload, Icon, message} from 'antd'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

const FormItem = Form.Item
const Option = Select.Option

class RegisterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      etime: moment()
    }
  }

  handleApply = (event, picker) => this.setState({etime: picker.endDate})

  showModal = () => this.setState({visible: true})

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false
    })
  }

  handleImgCancel = () => this.setState({previewVisible: false})

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('仅支持JPG、PNG格式，文件小于2MB!')
      return false
    }
    if (!isJPG && !isPNG) {
      message.error('仅支持JPG、PNG格式，文件小于2MB!')
      return false
    }
    this.setState({
      file: {
        file,
        filename: 'AccountForm[cert]'
      }
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
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
          uploading: true
        })
        this.props.dispatch({
          type: this.props.type === 'client' ? 'balance/clientRegistration' : 'balance/supplierRegistration',
          payload: {
            file: this.state.file,
            time: values.send_time,
            sum: values.record_sum,
            id
          }
        }).then(() => {
          this.props.type === 'client' ?
            this.props.dispatch({
              type: 'balance/clientFetch',
              payload: {
                page: 1,
                find_str: this.props.find_str
              }
            })
            :
            this.props.dispatch({
              type: 'balance/supplierFetch',
              payload: {
                page: 1,
                find_str: this.props.find_str
              }
            })
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
    let time = this.state.etime.format('YYYY-MM-DD HH:mm:ss')
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">仅支持JPG、PNG格式，文件小于2MB</div>
      </div>
    )
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
                <Input placeholder='请输入公司名称' disabled/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="付款渠道"
            >
              {getFieldDecorator('qd', {
                initialValue: ['default']
              })(
                <Select placeholder='请选择付款渠道'>
                  <Option value="default">网银转账</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.type === 'client' ? '收款时间' : '付款时间'}
            >
              {getFieldDecorator('send_time', {
                initialValue: time,
                rules: [{required: true, message: '此项为必选项！'}]
              })(
                <DateRangePicker
                  containerStyles={{width: '100%'}}
                  startDate={this.state.etime}
                  singleDatePicker={true}
                  timePicker={true}
                  timePicker24Hour={true}
                  timePickerSeconds={true}
                  maxDate={moment()}
                  locale={locale}
                  onApply={this.handleApply}>
                  <Input type="text" value={time} readOnly/>
                </DateRangePicker>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.type === 'client' ? '收款金额' : '付款金额'}
            >
              {getFieldDecorator('record_sum', {
                rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
              })(
                <Input placeholder={this.props.type === 'client' ? '请输入收款金额' : '请输入付款金额'}/>
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
                      <img src={this.state.imageUrl} alt="avatar"
                           style={{width: '250px', height: '200px'}}/> : uploadButton}
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}
                         style={{width: '250px', height: '200px'}}>
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

function mapStateToProps(state) {
  const {find_str} = state.balance
  return {
    find_str,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(Form.create()(RegisterModal))
