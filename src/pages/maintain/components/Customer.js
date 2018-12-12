import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal, Form, Input, Select, Upload, Icon, message } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { IP, PAGE_SIZE } from '../../../constants'
import { REGS } from '../../../common/constants'

const FormItem = Form.Item
const Option = Select.Option

class Customer extends PureComponent {
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
        url: record.cust_head,
      }],
      current: record,
    })
    this.props.form.setFieldsValue({
      // company_type: record.company_type,
      customer_type: record.customer_type,
      // customer_full_name: record.customer_full_name,
      customer_name: record.customer_name,
      customer_contact: record.customer_contact,
      customer_mobile: record.customer_mobile,
      // area: [record.customer_province.name, record.customer_city.name, record.customer_area.name],
      // customer_detailed_address: record.customer_detailed_address,
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'maintain/fetchCustomer',
      payload: {page},
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // let province = values.area[0]
        // let city = values.area[1]
        // let area = values.area[2] || ''
        let url = ''
        // values.customer_province = province
        // values.customer_city = city
        // values.customer_area = area
        values.cust_head = this.state.fileList.length ? this.state.fileList[0].url : ''
        // delete values.area
        console.log('Received values of form: ', values)
        if (this.state.modaltype === '新增') {
          url = 'insertCustomer'
        } else {
          url = 'modifyCustomer'
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
      type: 'maintain/postCustomerHead',
      payload: file,
    }).then(() => {
      this.setState({
        fileList: [{
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: this.props.customerHead,
        }],
      })
    })
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
  }

  handleChange = ({fileList}) => this.setState({fileList})

  render() {
    const {customerlist, customerpage, customertotal, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype, fileList} = this.state
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const columns = [{
      title: '客户简称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
    }, {
      title: '客户类型',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'center',
      render: (text) => {
        if (text === '1') {
          return <div>终端用户</div>
        } else if (text === '2') {
          return <div>贸易商</div>
        }
      },
    }, {
      title: '联系人',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
      align: 'center',
    }, {
      title: '联系方式',
      dataIndex: 'customer_mobile',
      key: 'customer_mobile',
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
          <Button type='primary' icon="plus" onClick={this.insertModal}>新增客户</Button>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={customerlist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={customerpage}
          total={customertotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
        <Modal title={`${modaltype}客户`}
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
              label="客户头像"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('cust_head')(
                <Upload
                  action={`${IP}/admin/customer/upload-img`}
                  listType="picture-card"
                  name='CustomerForm[img]'
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
            {/*<FormItem*/}
            {/*label="企业类型"*/}
            {/*labelCol={{span: 5}}*/}
            {/*wrapperCol={{span: 12}}*/}
            {/*>*/}
            {/*{getFieldDecorator('company_type', {*/}
            {/*rules: [{required: true, message: '请选择企业类型'}],*/}
            {/*})(*/}
            {/*<Select placeholder="请选择企业类型">*/}
            {/*{company_type.map((value, index) => {*/}
            {/*if (index === 0) {*/}
            {/*return null*/}
            {/*} else {*/}
            {/*return <Option key={index} value={index + ''}>{value}</Option>*/}
            {/*}*/}
            {/*})}*/}
            {/*</Select>,*/}
            {/*)}*/}
            {/*</FormItem>*/}
            {/*<FormItem*/}
            {/*label="客户全称"*/}
            {/*labelCol={{span: 5}}*/}
            {/*wrapperCol={{span: 12}}*/}
            {/*>*/}
            {/*{getFieldDecorator('customer_full_name', {*/}
            {/*rules: [{required: true, message: '请输入客户全称', pattern: REGS.name}],*/}
            {/*})(*/}
            {/*<Input placeholder='请输入客户全称'/>,*/}
            {/*)}*/}
            {/*</FormItem>*/}
            <FormItem
              label="客户简称"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('customer_name', {
                rules: [{required: true, message: '请输入客户简称', pattern: REGS.name}],
              })(
                <Input placeholder='请输入客户简称'/>,
              )}
            </FormItem>
            <FormItem
              label="客户类型"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('customer_type', {
                rules: [{required: true, message: '请选择客户类型'}],
              })(
                <Select placeholder="请选择客户类型">
                  <Option value='1'>终端用户</Option>
                  <Option value='2'>贸易商</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              label="联系人"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('customer_contact', {
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
              {getFieldDecorator('customer_mobile', {
                rules: [{required: true, message: '请输入联系方式'}],
              })(
                <Input placeholder='请输入联系方式'/>,
              )}
            </FormItem>
            {/*<FormItem*/}
            {/*label="所处地区"*/}
            {/*labelCol={{span: 5}}*/}
            {/*wrapperCol={{span: 12}}*/}
            {/*>*/}
            {/*{getFieldDecorator('area', {*/}
            {/*rules: [{required: true, message: '请选择所处地区'}],*/}
            {/*})(*/}
            {/*<Cascader placeholder='请选择所处地区' options={CascaderOptions} loadData={this.loadData}/>,*/}
            {/*)}*/}
            {/*</FormItem>*/}
            {/*<FormItem*/}
            {/*label="详细地址"*/}
            {/*labelCol={{span: 5}}*/}
            {/*wrapperCol={{span: 12}}*/}
            {/*>*/}
            {/*{getFieldDecorator('customer_detailed_address', {*/}
            {/*rules: [{required: true, message: '请输入详细地址'}],*/}
            {/*})(*/}
            {/*<Input placeholder='请输入详细地址'/>,*/}
            {/*)}*/}
            {/*</FormItem>*/}
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
  const {customerlist, customerpage, customertotal, customerHead} = state.maintain
  return {
    customerlist,
    customerpage,
    customertotal,
    customerHead,
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(Customer))
