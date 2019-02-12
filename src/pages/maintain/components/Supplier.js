import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal, Form, Input, Upload, Icon, message, Select } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { IP, PAGE_SIZE } from '../../../constants'
import { supp_type, REGS } from '../../../common/constants'

const FormItem = Form.Item
const Option = Select.Option

class Supplier extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modaltype: '',
      previewVisible: false,
      previewImage: '',
      rotate: 0,
      fileList: [],
      current: {},
    }
  }


  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {},
    })
  }

  insertModal = () => {
    this.setState({
      visible: !this.state.visible,
      modaltype: '新增',
      fileList: [],
    })
    this.props.form.resetFields()
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  editModal = (record) => {
    this.setState({
      visible: !this.state.visible,
      modaltype: '编辑',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: record.supp_head,
      }],
      current: record,
    })
    this.props.form.setFieldsValue({
      supp_type: record.supp_type,
      supp_name: record.supp_name,
      supp_contact: record.supp_contact,
      supp_mobile: record.supp_mobile,
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'maintain/fetchSupplier',
      payload: {page},
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let url = ''
        values.supp_head = this.state.fileList.length ? this.state.fileList[0].url : ''
        console.log('Received values of form: ', values)
        if (this.state.modaltype === '新增') {
          url = 'insertSupplier'
        } else {
          url = 'modifySupplier'
          values.id = this.state.current.id
        }
        this.props.dispatch({
          type: 'maintain/' + url,
          payload: {
            form: values,
          },
        }).then(() => {
          this.toggleModal()
        })
      }
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

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  rotateImage = () => {
    let rotate = this.state.rotate + 90
    this.setState({
      rotate: rotate,
    })
  }

  closePreView = (e) => {
    e.stopPropagation()
    this.setState({
      previewVisible: false,
      rotate: 0,
    })
  }

  customRequest = (file) => {
    this.props.dispatch({
      type: 'maintain/postSupplierHead',
      payload: file,
    }).then(() => {
      this.setState({
        fileList: [{
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: this.props.supplierHead,
        }],
      })
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
  }

  handleChange = ({fileList}) => this.setState({fileList})

  render() {
    const {supplierlist, supplierpage, supplertotal, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype, fileList} = this.state
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const columns = [{
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center',
      render: (text) => {
        if (text) {
          return <div>{text}</div>
        } else {
          return <div>--</div>
        }
      },
    }, {
      title: '供应商类型',
      dataIndex: 'supp_type',
      key: 'supp_type',
      align: 'center',
      render: (text) => {
        return <div>{supp_type[text]}</div>
      },
    }, {
      title: '联系人',
      dataIndex: 'supp_contact',
      key: 'supp_contact',
      align: 'center',
    }, {
      title: '联系方式',
      dataIndex: 'supp_mobile',
      key: 'supp_mobile',
      align: 'center',
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record, index) => {
        return (
          <div>
            <Button className='blueBorder' onClick={this.editModal.bind(null, record)}
                    size='small'>编辑</Button>
            {/*<PromptModal state='deleteOne' delType='user' delID={record.id}>*/}
            {/*<Button type='primary' size='small'*/}
            {/*style={{*/}
            {/*background: '#EA7878',*/}
            {/*borderColor: '#EA7878',*/}
            {/*marginLeft: 10,*/}
            {/*height: 28,*/}
            {/*padding: '0 15px',*/}
            {/*}}>删除</Button>*/}
            {/*</PromptModal>*/}
          </div>
        )
      },
    }]

    return (
      <div>
        <div className='toolBar'>
          <Button type='primary' icon="plus" onClick={this.insertModal}>新增供应商</Button>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={supplierlist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={supplierpage}
          total={supplertotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
        <Modal title={`${modaltype}供应商`}
               cancelText='取消'
               style={{top: 50}}
               okText='提交'
               visible={visible}
               onOk={this.submit}
               onCancel={this.toggleModal}
               confirmLoading={loading}
               destroyOnClose={false}
               maskClosable={false}>
          <Form>
            <FormItem
              label="供应商头像"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('supp_head')(
                <Upload
                  action={`${IP}/admin/supplier/upload-img`}
                  listType="picture-card"
                  name='SuppForm[img]'
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  customRequest={this.customRequest}
                  beforeUpload={this.beforeUpload}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>,
              )}
            </FormItem>
            <FormItem
              label="供应商名称"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('supp_name', {
                rules: [{required: true, message: '请输入供应商名称', pattern: REGS.name}],
              })(
                <Input placeholder='请输入供应商名称'/>,
              )}
            </FormItem>
            <FormItem
              label="供应商类型"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('supp_type', {
                rules: [{required: true, message: '请选择供应商类型'}],
              })(
                <Select placeholder="请选择供应商类型">
                  {supp_type.map((value, index) => {
                    return <Option value={index + 1 + ''}>{value}</Option>
                  })}
                </Select>,
              )}
            </FormItem>
            <FormItem
              label="联系人"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('supp_contact', {
                rules: [{required: true, message: '请输入联系人', pattern: REGS.name}],
              })(
                <Input placeholder='请输入联系人'/>,
              )}
            </FormItem>
            <FormItem
              label="联系方式"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('supp_mobile', {
                rules: [{required: true, message: '请输入联系方式', pattern: REGS.phone}],
              })(
                <Input placeholder='请输入联系方式'/>,
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          visible={this.state.previewVisible}
          style={{top: 50}}
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
  const {supplierlist, supplierpage, supplertotal, supplierHead} = state.maintain
  return {
    supplierlist,
    supplierpage,
    supplertotal,
    supplierHead,
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(Supplier))
