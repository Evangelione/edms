import React from 'react'
import {connect} from 'dva'
import {Modal, Row, Col, Button, Input, Card, Upload, Icon, message} from 'antd'
import ImageModal from '../../../components/ImageModal/ImageModal'
import PromptModal from '../../../components/PromptModal/PromptModal'
import {IP} from '../../../constants'
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
      file: null,
      uploading: false,
      time: moment()
    }
  }

  handleApply = (event, picker) => {
    debugger
    this.setState({
      time: picker.startDate,
    })
  }

  UNSAFE_componentWillMount() {
    this.setState({
      load_num: this.props.load_num,
      unload_num: this.props.unload_num,
      load_time: this.props.load_time,
      unload_time: this.props.unload_time
    })
  }

  showModalHandler = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
      fileList: []
    })
  }

  loadChange = (e) => {
    this.setState({
      load_num: e.target.value
    })
  }

  unloadChange = (e) => {
    this.setState({
      unload_num: e.target.value
    })
  }

  doClose = () => {
    this.setState({
      visible: false
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({fileList}) => this.setState({fileList})

  saveFile = (file) => {
    this.setState({
      file: file
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
        type: 'logisticsDetail/uploadPound',
        payload: {
          file: this.state.file,
          id,
          num: num,
          load_type: type,
          load_time: this.state.time.format('YYYY-MM-DD HH:mm:00')
        }
      }).then(() => {
        this.setState({
          uploading: false,
          visible: false,
          fileList: [],
          file: null
        })
      })
    } else {
      this.props.dispatch({
        type: 'logisticsDetail/uploadUnPound',
        payload: {
          file: this.state.file,
          id,
          num: num,
          load_type: type,
          unload_time: this.state.time.format('YYYY-MM-DD HH:mm:00')
        }
      }).then(() => {
        this.setState({
          uploading: false,
          visible: false,
          fileList: [],
          file: null
        })
      })
    }
  }

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
        filename: 'DeliverForm[bill_img]',
        action: `${IP}/home/logistics/load-bill`
      }
    })
    return false
  }


  render() {
    const {hidden, id} = this.props
    const {fileList} = this.state
    let time = this.state.time.format('YYYY-MM-DD HH:mm:00')
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">仅支持JPG、PNG格式，文件小于2MB</div>
      </div>
    )
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
    return (
      <div onClick={this.showModalHandler}>
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
                                 unload_num={this.state.unload_num} billID={this.props.id} doClose={this.doClose}>
                      <Button key='confirm' type='primary'>确定磅单</Button>
                    </PromptModal>
                    :
                    <Button key='upload' type='primary' loading={this.state.uploading}
                            onClick={this.customRequest.bind(null, id, hidden)}>上传磅单</Button>
                }
              </Col>
            </Row>
          ]}>
          {hidden === 'all' ?
            <div>
              <Row style={{marginBottom: 10}}>
                <Col span={4}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>装车磅单：</div>
                </Col>
                <Col span={7}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{this.state.load_num} 吨</div>
                    :
                    <Input addonAfter='吨' defaultValue={this.state.load_num} type='number'
                           onChange={this.loadChange}/>
                  }
                </Col>
                <Col span={4} offset={1}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>装车时间：</div>
                </Col>
                <Col span={8}>
                  <div style={{lineHeight: '28px'}}>{this.state.load_time}</div>
                </Col>
              </Row>
              <Card style={{borderColor: '#D2D2D2', marginBottom: 10}}>
                <ImageModal imgUrl={this.props.load_url}>
                  <img src={this.props.load_url} alt="" width='100%' height='100%'/>
                </ImageModal>
              </Card>
              <Row style={{marginBottom: 10}}>
                <Col span={4}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>卸车磅单：</div>
                </Col>
                <Col span={7}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{this.state.unload_num}</div>
                    :
                    <Input addonAfter='吨' defaultValue={this.state.unload_num} type='number'
                           onChange={this.unloadChange}/>
                  }
                </Col>
                <Col span={4} offset={1}>
                  <div style={{lineHeight: '28px', fontSize: 14, color: '#545f76', fontWeight: 600}}>卸车时间：</div>
                </Col>
                <Col span={8}>
                  <div style={{lineHeight: '28px'}}>{this.state.unload_time}</div>
                </Col>
              </Row>
              <Card style={{borderColor: '#D2D2D2'}}>
                <ImageModal imgUrl={this.props.unload_url}>
                  <img src={this.props.unload_url} alt="" width='100%' height='100%'/>
                </ImageModal>
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
                      <Input addonAfter='吨' type='number' onChange={this.loadChange} defaultValue='0'/>
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
                    accept='.png'
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
                      <Input addonAfter='吨' type='number' onChange={this.unloadChange} defaultValue='0'/>
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
                    accept='.png'
                    name='DeliverForm[bill_img]'
                    action={`${IP}/home/logistics/load-bill`}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={this.handleChange}
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Card>
              </div>
          }
        </Modal>
      </div>
    )
  }
}

export default connect()(PoundModal)
