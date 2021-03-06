import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal, Upload, message, Form, Input, Cascader } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { IP, PAGE_SIZE } from '../../../constants'
import { REGS } from '../../../common/constants'

const FormItem = Form.Item

class GasSource extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modaltype: '',
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
      current: record,
    })
    this.props.form.setFieldsValue({
      name_gas_source: record.name_gas_source,
      origin_gas_source: record.origin_gas_source,
      cargo_contact: record.cargo_contact,
      cargo_mobile: record.cargo_mobile,
      area: [record.cargo_province, record.cargo_city, record.cargo_area],
      detailed_address: record.detailed_address,
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let province = values.area[0]
        let city = values.area[1]
        let area = values.area[2] || ''
        let url = ''
        values.cargo_province = province
        values.cargo_city = city
        values.cargo_area = area
        delete values.area
        console.log('Received values of form: ', values)
        if (this.state.modaltype === '新增') {
          url = 'insertGas'
        } else {
          url = 'modifyGas'
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

  upLoadReport = (id, file) => {
    this.props.dispatch({
      type: 'maintain/uploadSingle',
      payload: {id, file},
    })
  }

  openPDF = (text) => {
    window.open(text)
  }

  beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf'
    if (!isPDF) {
      message.error('You can only upload PDF file!')
    }
    const isLt20M = file.size / 1024 / 1024 < 20
    if (!isLt20M) {
      message.error('PDF must smaller than 2MB!')
    }
    return isPDF && isLt20M
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'maintain/fetchGas',
      payload: {page},
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

  render() {
    const {gaslist, gaspage, gastotal, loading, CascaderOptions} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype} = this.state
    const columns = [{
      title: '气源名称',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center',
    }, {
      title: '气源产地',
      dataIndex: 'origin_gas_source',
      key: 'origin_gas_source',
      align: 'center',
    }, {
      title: '联系人',
      dataIndex: 'cargo_contact',
      key: 'cargo_contact',
      align: 'center',
    }, {
      title: '联系方式',
      dataIndex: 'cargo_mobile',
      key: 'cargo_mobile',
      align: 'center',
    }, {
      title: '所处地区',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
      render: (text, record) => {
        if (!record.cargo_province) {
          return <div>--</div>
        } else {
          let area = record.cargo_province + record.cargo_city || '' + record.cargo_area || ''
          return <div>{area}</div>
        }
      },
    }, {
      title: '详细地址',
      dataIndex: 'detailed_address',
      key: 'detailed_address',
      align: 'center',
    }, {
      title: '气质报告',
      dataIndex: 'temperament_report',
      key: 'temperament_report',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div>
            {record.temperament_report ?
              <Button className={'blueBorder'} size={'small'} onClick={this.openPDF.bind(null, text)}>查看</Button>
              :
              <Upload
                accept='.pdf'
                name='GoodsForm[pdf]'
                action={`${IP}/admin/goods/modify-report`}
                customRequest={this.upLoadReport.bind(null, record.id)}
                beforeUpload={this.beforeUpload}
                showUploadList={false}
              >
                <Button type='primary'>上传</Button>
              </Upload>
            }
          </div>
        )
      },
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
          <Button type='primary' icon="plus" onClick={this.insertModal}>新增气源</Button>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={gaslist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={gaspage}
          total={gastotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
        <Modal title={`${modaltype}气源`}
               cancelText='取消'
               okText='提交'
               visible={visible}
               onOk={this.submit}
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
          <Form>
            <FormItem
              label="气源名称"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('name_gas_source', {
                rules: [{required: true, message: '请输入气源名称', pattern: REGS.name}],
              })(
                <Input placeholder='请输入气源名称'/>,
              )}
            </FormItem>
            <FormItem
              label="气源产地"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('origin_gas_source', {
                rules: [{required: true, message: '请输入气源产地', pattern: REGS.name}],
              })(
                <Input placeholder='请输入气源产地'/>,
              )}
            </FormItem>
            <FormItem
              label="联系人"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('cargo_contact', {
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
              {getFieldDecorator('cargo_mobile', {
                rules: [{required: true, message: '请输入联系方式', pattern: REGS.phone}],
              })(
                <Input placeholder='请输入联系方式'/>,
              )}
            </FormItem>
            <FormItem
              label="所处地区"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('area', {
                rules: [{required: true, message: '请选择所处地区'}],
              })(
                <Cascader placeholder='请选择所处地区' options={CascaderOptions} loadData={this.loadData}/>,
              )}
            </FormItem>
            <FormItem
              label="详细地址"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('detailed_address', {
                rules: [{required: true, message: '请输入详细地址'}],
              })(
                <Input placeholder='请输入详细地址'/>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {gaslist, gaspage, gastotal, CascaderOptions} = state.maintain
  return {
    gaslist,
    gaspage,
    gastotal,
    CascaderOptions,
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(GasSource))
