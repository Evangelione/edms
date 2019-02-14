import React from 'react'
import { connect } from 'dva'
import { Modal, Row, Col, Button, Input, Card, Upload, Icon, message, InputNumber } from 'antd'
import ImageModal from '../../../components/ImageModal/ImageModal'
import PromptModal from '../../../components/PromptModal/PromptModal'
import { IP } from '../../../constants'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

class PoundModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileList1: [],
      fileList2: [],
      file: null,
      uploading: false,
      time: moment(),
      rotate: 0,
    }
  }

  handleApply = (event, picker) => {
    this.setState({
      time: picker.startDate,
    })
  }

  handleApplyConfirm = (str, event, picker) => {
    this.setState({
      [str]: picker.startDate.format('YYYY-MM-DD HH:mm:00'),
    })
  }

  UNSAFE_componentWillMount() {
    this.setState({
      load_num: this.props.load_num,
      unload_num: this.props.unload_num,
      load_time: this.props.load_time,
      unload_time: this.props.unload_time,
      load_bill: this.props.load_bill,
      unload_bill: this.props.unload_bill,
      fileList1: [{
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: this.props.load_url,
      }],
      fileList2: [{
        uid: '2',
        name: 'xxx.png',
        status: 'done',
        url: this.props.unload_url,
      }],
    })
  }

  showModalHandler = (e) => {
    e.stopPropagation()
    if (this.state.visible) return
    this.setState({
      visible: true,
    })
    this.setState({
      time: moment(),
    })
    if (this.props.title === '确认磅单') {
      console.log(this.props.load_bill)
      this.setState({
        load_num: this.props.load_num,
        unload_num: this.props.unload_num,
        load_time: this.props.load_time,
        unload_time: this.props.unload_time,
        load_bill: this.props.load_url,
        unload_bill: this.props.unload_url,
        fileList1: [{
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          url: this.props.load_url,
        }],
        fileList2: [{
          uid: '2',
          name: 'xxx.png',
          status: 'done',
          url: this.props.unload_url,
        }],
      })
    }
  }

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
      fileList: [],
    })
  }

  loadChange = (e) => {
    this.setState({
      load_num: e,
    })
  }

  unloadChange = (e) => {
    this.setState({
      unload_num: e,
    })
  }

  doClose = () => {
    this.setState({
      visible: false,
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({fileList}) => this.setState({fileList})
  handleChange1 = ({fileList}) => this.setState({fileList1: fileList})
  handleChange2 = ({fileList}) => this.setState({fileList2: fileList})

  saveFile = (file) => {
    this.setState({
      file: file,
    })
    file.onProgress({percent: 100})
    file.onSuccess()
  }

  customRequest = (id, type) => {
    if (this.state.file === null) {
      message.error('请上传磅单！')
      return false
    }
    this.setState({
      uploading: true,
    })
    let num = ''
    type === 'load' ? num = this.state.load_num : num = this.state.unload_num
    if (type === 'load') {
      this.props.dispatch({
        type: 'home/uploadPound',
        payload: {
          file: this.state.file,
          id,
          num: num,
          load_type: type,
          load_time: this.state.time.format('YYYY-MM-DD HH:mm:00'),
        },
      }).then(() => {
        this.setState({
          uploading: false,
          visible: false,
          fileList: [],
          file: null,
        })
      })
    } else {
      this.props.dispatch({
        type: 'home/uploadUnPound',
        payload: {
          file: this.state.file,
          id,
          num: num,
          load_type: type,
          unload_time: this.state.time.format('YYYY-MM-DD HH:mm:00'),
        },
      }).then(() => {
        this.setState({
          uploading: false,
          visible: false,
          fileList: [],
          file: null,
        })
      })
    }
  }

  customRequest1 = (file) => {
    this.props.dispatch({
      type: 'home/UpLoadBill',
      payload: file,
    }).then(() => {
      this.setState({
        load_bill: this.props.load_bill,
        fileList1: [{
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          url: this.props.load_bill,
        }],
      })
    })
  }

  customRequest2 = (file) => {
    this.props.dispatch({
      type: 'home/UpUnLoadBill',
      payload: file,
    }).then(() => {
      this.setState({
        unload_bill: this.props.unload_bill,
        fileList2: [{
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          url: this.props.unload_bill,
        }],
      })
    })
  }

  rotateImage = () => {
    let rotate = this.state.rotate + 90
    this.setState({
      rotate: rotate,
    })
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    if (!isJPG && !isPNG) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    this.setState({
      file: {
        file,
        filename: 'DeliverForm[bill_img]',
        action: `${IP}/home/logistics/load-bill`,
      },
    })
    return false
  }

  beforeUpload1 = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
    if (!isJPG && !isPNG) {
      message.error('仅支持JPG、PNG格式，文件小于5MB!')
      return false
    }
  }

  closePreView = (e) => {
    e.stopPropagation()
    this.setState({
      previewVisible: false,
      rotate: 0,
    })
  }

  limitDecimals = value => {
    const reg = /^(\-)*(\d+)\.(\d\d\d).*$/
    if (typeof value === 'string') {
      return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
    } else if (typeof value === 'number') {
      return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
    } else {
      return ''
    }
  }

  render() {
    const {hidden, id} = this.props
    const {fileList, fileList1, fileList2} = this.state
    let time = this.state.time.format('YYYY-MM-DD HH:mm:00')
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">仅支持JPG、PNG格式，文件小于5MB</div>
      </div>
    )
    let locale = {
      'format': 'YYYY-MM-DD',
      'separator': ' - ',
      'applyLabel': '确定',
      'cancelLabel': '取消',
      'fromLabel': '起始时间',
      'toLabel': '结束时间\'',
      'customRangeLabel': '自定义',
      'weekLabel': 'W',
      'daysOfWeek': ['日', '一', '二', '三', '四', '五', '六'],
      'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      'firstDay': 1,
    }
    return (
      <div onClick={this.showModalHandler} style={{display: 'inline-block'}}>
        {this.props.children}
        <Modal
          width={600}
          title={this.props.title}
          visible={this.state.visible}
          bodyStyle={{maxHeight: 800, overflow: 'auto'}}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={[
            <Row key='row' type='flex' justify='center' style={{margin: '10px 0'}}>
              <Col key='col'>
                {this.props.type === 'look' ?
                  <Button key='close' type='primary' onClick={this.handleCancel}>关闭</Button>
                  :
                  this.props.hidden === 'all' ?
                    <PromptModal state={'confirmLogistics'} load_num={this.state.load_num}
                                 unload_num={this.state.unload_num} billID={this.props.id}
                                 load_time={this.state.load_time} unload_time={this.state.unload_time}
                                 load_bill={this.state.load_bill} unload_bill={this.state.unload_bill}
                                 doClose={this.doClose}>
                      <Button key='confirm' type='primary'>确定磅单</Button>
                    </PromptModal>
                    :
                    <Button key='upload' type='primary' loading={this.state.uploading}
                            onClick={this.customRequest.bind(null, id, hidden)}>上传磅单</Button>
                }
              </Col>
            </Row>,
          ]}>
          {hidden === 'all' ?
            <div>
              <Row style={{marginBottom: 10}}>
                <Col span={4}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>装车磅单：</div>
                </Col>
                <Col span={7}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{(this.state.load_num - 0).toFixed(3)} 吨</div>
                    :
                    <div>
                      <InputNumber addonAfter='吨' defaultValue={this.state.load_num} precision={3} max={25} step={0.001}
                                   style={{width: 161}}
                                   onChange={this.loadChange} formatter={this.limitDecimals}
                                   parser={this.limitDecimals}/>
                      <div style={{
                        position: 'absolute',
                        border: '1px solid #d9d9d9',
                        backgroundColor: '#fafafa',
                        top: 0,
                        right: '-3px',
                        padding: '0 11px',
                        height: 32,
                        lineHeight: '30px',
                        borderRadius: '0 3px 3px 0',
                      }}>吨
                      </div>
                    </div>
                  }
                </Col>
                <Col span={4} offset={1}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>装车时间：</div>
                </Col>
                <Col span={8}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{this.state.load_time}</div>
                    :
                    <div>
                      <DateRangePicker
                        containerStyles={{width: '100%'}}
                        startDate={this.state.load_time}
                        singleDatePicker={true}
                        timePicker={true}
                        timePicker24Hour={true}
                        locale={locale}
                        onApply={this.handleApplyConfirm.bind(null, 'load_time')}>
                        <Input type="text" value={this.state.load_time} readOnly/>
                      </DateRangePicker>
                    </div>}
                </Col>
              </Row>
              <Card style={{borderColor: '#D2D2D2', marginBottom: 10}}>
                {this.props.type === 'look' ?
                  <ImageModal imgUrl={this.props.load_url}>
                    <img src={this.props.load_url} alt="" width='100%' height='100%'/>
                  </ImageModal>
                  :
                  <div>
                    <Upload
                      accept='.jpg,.png'
                      name='DeliverForm[bill_img]'
                      action={`${IP}/home/logistics/upload-bill`}
                      listType="picture-card"
                      fileList={fileList1}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange1}
                      beforeUpload={this.beforeUpload1}
                      customRequest={this.customRequest1}
                    >
                      {fileList1.length >= 1 ? null : uploadButton}
                    </Upload>
                  </div>}
              </Card>
              <Row style={{marginBottom: 10}}>
                <Col span={4}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>卸车磅单：</div>
                </Col>
                <Col span={7}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{(this.state.unload_num - 0).toFixed(3)} 吨</div>
                    :
                    <div>
                      <InputNumber addonAfter='吨' defaultValue={this.state.unload_num} precision={3} max={25}
                                   step={0.001}
                                   style={{width: 161}} onChange={this.unloadChange} formatter={this.limitDecimals}
                                   parser={this.limitDecimals}/>
                      <div style={{
                        position: 'absolute',
                        border: '1px solid #d9d9d9',
                        backgroundColor: '#fafafa',
                        top: 0,
                        right: '-3px',
                        padding: '0 11px',
                        height: 32,
                        lineHeight: '30px',
                        borderRadius: '0 3px 3px 0',
                      }}>吨
                      </div>
                    </div>
                  }
                </Col>
                <Col span={4} offset={1}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>卸车时间：</div>
                </Col>
                <Col span={8}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{this.state.unload_time}</div>
                    :
                    <div>
                      <DateRangePicker
                        containerStyles={{width: '100%'}}
                        startDate={this.state.unload_time}
                        singleDatePicker={true}
                        timePicker={true}
                        timePicker24Hour={true}
                        locale={locale}
                        onApply={this.handleApplyConfirm.bind(null, 'unload_time')}>
                        <Input type="text" value={this.state.unload_time} readOnly/>
                      </DateRangePicker>
                    </div>}
                </Col>
              </Row>
              <Card style={{borderColor: '#D2D2D2'}}>
                {this.props.type === 'look' ? <ImageModal imgUrl={this.props.unload_url}>
                    <img src={this.props.unload_url} alt="" width='100%' height='100%'/>
                  </ImageModal>
                  :
                  <div>
                    <Upload
                      accept='.jpg,.png'
                      name='DeliverForm[bill_img]'
                      action={`${IP}/home/logistics/upload-bill`}
                      listType="picture-card"
                      fileList={fileList2}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange2}
                      beforeUpload={this.beforeUpload1}
                      customRequest={this.customRequest2}
                    >
                      {fileList2.length >= 1 ? null : uploadButton}
                    </Upload>
                  </div>}
              </Card>
            </div> :
            hidden === 'load' ?
              <div>
                <Row style={{marginBottom: 10}}>
                  <Col span={4}>
                    <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>装车磅单：</div>
                  </Col>
                  <Col span={7}>
                    {this.props.type === 'look' ?
                      <div style={{lineHeight: '28px'}}>{this.state.load_num} 吨</div>
                      :
                      <div>
                        <InputNumber addonAfter='吨' precision={3} style={{width: 161}} max={25} step={0.001}
                                     onChange={this.loadChange}
                                     defaultValue='0' formatter={this.limitDecimals} parser={this.limitDecimals}/>
                        <div style={{
                          position: 'absolute',
                          border: '1px solid #d9d9d9',
                          backgroundColor: '#fafafa',
                          top: 0,
                          right: 0,
                          padding: '0 11px',
                          height: 32,
                          lineHeight: '30px',
                          borderRadius: '0 3px 3px 0',
                        }}>吨
                        </div>
                      </div>

                    }
                  </Col>
                  <Col span={4} offset={1}>
                    <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>装车时间：</div>
                  </Col>
                  <Col span={7}>
                    <DateRangePicker
                      containerStyles={{width: '100%'}}
                      startDate={this.state.time}
                      singleDatePicker={true}
                      timePicker={true}
                      timePicker24Hour={true}
                      locale={locale}
                      onApply={this.handleApply}>
                      <Input type="text" value={time} readOnly/>
                    </DateRangePicker>
                  </Col>
                </Row>
                <Card style={{borderColor: '#D2D2D2', marginBottom: 10}}>
                  <Upload
                    accept='.jpg,.png'
                    name='DeliverForm[bill_img]'
                    action={`${IP}/home/logistics/load-bill`}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Card>
              </div>
              :
              <div>
                <Row style={{marginBottom: 10}}>
                  <Col span={4}>
                    <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>卸车磅单：</div>
                  </Col>
                  <Col span={8}>
                    {this.props.type === 'look' ?
                      <div style={{lineHeight: '28px'}}>{this.state.unload_num} 吨</div>
                      :
                      <div>
                        <InputNumber addonAfter='吨' precision={3} max={25} step={0.001} style={{width: 161}}
                                     onChange={this.unloadChange}
                                     defaultValue='0' formatter={this.limitDecimals} parser={this.limitDecimals}/>
                        <div style={{
                          position: 'absolute',
                          border: '1px solid #d9d9d9',
                          backgroundColor: '#fafafa',
                          top: 0,
                          right: 0,
                          padding: '0 11px',
                          height: 32,
                          lineHeight: '30px',
                          borderRadius: '0 3px 3px 0',
                        }}>吨
                        </div>
                      </div>

                    }
                  </Col>
                  <Col span={4} offset={1}>
                    <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>卸车时间：</div>
                  </Col>
                  <Col span={7}>
                    <DateRangePicker
                      containerStyles={{width: '100%'}}
                      startDate={this.state.time}
                      singleDatePicker={true}
                      timePicker={true}
                      timePicker24Hour={true}
                      locale={locale}
                      onApply={this.handleApply}>
                      <Input type="text" value={time} readOnly/>
                    </DateRangePicker>
                  </Col>
                </Row>
                <Card style={{borderColor: '#D2D2D2'}}>
                  <Upload
                    accept='.jpg,.png'
                    name='DeliverForm[bill_img]'
                    action={`${IP}/home/logistics/load-bill`}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Card>
              </div>
          }
        </Modal>
        <Modal
          visible={this.state.previewVisible}
          style={{top: 200}}
          width={800}
          className='transparents'
          onCancel={this.closePreView}
          bodyStyle={{
            padding: 0,
            transform: `rotate(${this.state.rotate}deg)`,
            transition: 'all 0.5s',
            cursor: 'pointer',
          }}
          footer={null}>
          <img alt='' width='100%' height='100%' onClick={this.rotateImage} src={this.state.previewImage}/>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {load_bill, unload_bill} = state.home
  return {
    load_bill,
    unload_bill,
    loading: state.loading.models.home,
  }
}

export default connect(mapStateToProps)(PoundModal)
