import React from 'react'
import {Modal, Row, Col, Button, Input, Card, Upload, Icon, message} from 'antd'
import ImageModal from '../../../components/ImageModal/ImageModal'
import PromptModal from '../../../components/PromptModal/PromptModal'
import {connect} from 'dva'
import {IP} from "../../../constants"

class PoundModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      file: null,
      uploading: false
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({
      load_num: this.props.load_num,
      unload_num: this.props.unload_num
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
    });
  }

  // handleChange = ({fileList}) => this.setState({fileList})

  saveFile = (file) => {
    this.setState({
      file: file
    })
    file.onProgress({percent: 100})
    file.onSuccess()
  }

  customRequest = (id, type) => {
    this.setState({
      uploading: true,
    })
    let num = ''
    if (this.state.file === null) {
      message.error('请上传磅单！')
      return false
    }
    type === 'load' ? num = this.state.load_num : num = this.state.unload_num
    this.props.dispatch({
      type: 'logisticsDetail/uploadPound',
      payload: {
        file: this.state.file,
        id,
        num: num,
        load_type: type
      }
    }).then(() => {
      this.setState({
        uploading: false,
        visible: false
      })
    })
  }

  beforeUpload = (file) => {
    this.setState({
      file: {
        file,
        filename: 'DeliverForm[bill_img]',
        action: `${IP}/home/logistics/load-bill`
      }
    })
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return false
  }


  render() {
    const {hidden, id} = this.props
    const {fileList} = this.state
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
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
                <Col span={8}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{this.state.load_num} 吨</div>
                    :
                    <Input addonAfter={'吨'} defaultValue={this.state.load_num} type='number'
                           onChange={this.loadChange}/>
                  }
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
                <Col span={8}>
                  {this.props.type === 'look' ?
                    <div style={{lineHeight: '28px'}}>{this.state.unload_num} 吨</div>
                    :
                    <Input addonAfter={'吨'} defaultValue={this.state.unload_num} type='number'
                           onChange={this.unloadChange}/>
                  }
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
                  <Col span={8}>
                    {this.props.type === 'look' ?
                      <div style={{lineHeight: '28px'}}>{this.state.load_num} 吨</div>
                      :
                      <Input addonAfter={'吨'} type='number' onChange={this.loadChange} defaultValue='0'/>
                    }
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
                      <Input addonAfter={'吨'} type='number' onChange={this.unloadChange} defaultValue='0'/>
                    }
                  </Col>
                </Row>
                <Card style={{borderColor: '#D2D2D2'}}>
                  <Upload
                    accept='.png'
                    name='DeliverForm[bill_img]'
                    action={`${IP}/home/logistics/load-bill`}
                    listType="picture-card"
                    fileList={fileList}
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
