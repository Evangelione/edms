import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal, Input, Form, Select, Cascader } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { PAGE_SIZE } from '../../../constants'
import { REGS } from '../../../common/constants'

const FormItem = Form.Item
const Option = Select.Option

class Site extends PureComponent {
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
      site_type: record.site_type,
      site_name: record.site_name,
      full_site_name: record.full_site_name,
      delivery_contact1: record.delivery_contact1,
      delivery_mobile1: record.delivery_mobile1,
      area: [record.delivery_province, record.delivery_city, record.delivery_area],
      detailed_address: record.detailed_address,
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

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let province = values.area[0]
        let city = values.area[1]
        let area = values.area[2] || ''
        let url = ''
        values.delivery_province = province
        values.delivery_city = city
        values.delivery_area = area
        delete values.area
        console.log('Received values of form: ', values)
        if (this.state.modaltype === '新增') {
          url = 'insertSite'
        } else {
          url = 'modifySite'
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

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'maintain/fetchSite',
      payload: {page},
    })
  }

  render() {
    const {sitelist, sitepage, sitetotal, CascaderOptions, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype} = this.state
    const columns = [{
      title: '站点简称',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center',
    }, {
      title: '站点全称',
      dataIndex: 'full_site_name',
      key: 'full_site_name',
      align: 'center',
    }, {
      title: '站点类型',
      dataIndex: 'site_type',
      key: 'site_type',
      align: 'center',
      render: (text) => {
        if (text === '1') {
          return <div>加气站</div>
        } else if (text === '2') {
          return <div>气化站</div>
        }
      },
    }, {
      title: '联系人',
      dataIndex: 'delivery_contact1',
      key: 'delivery_contact1',
      align: 'center',
    }, {
      title: '联系方式',
      dataIndex: 'delivery_mobile1',
      key: 'delivery_mobile1',
      align: 'center',
    }, {
      title: '所处地区',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
      render: (text, record) => {
        if (!record.delivery_province) {
          return <div>--</div>
        } else {
          let area = record.delivery_province + record.delivery_city || '' + record.delivery_area || ''
          return <div>{area}</div>
        }
      },
    }, {
      title: '详细地址',
      dataIndex: 'detailed_address',
      key: 'detailed_address',
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
          <Button type='primary' icon="plus" onClick={this.insertModal}>新增站点</Button>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={sitelist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={sitepage}
          total={sitetotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
        <Modal title={`${modaltype}站点`}
               cancelText='取消'
               okText='提交'
               visible={visible}
               onOk={this.submit}
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
          <Form>
            <FormItem
              label="站点简称"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('site_name', {
                rules: [{required: true, message: '请输入站点简称', pattern: REGS.name}],
              })(
                <Input placeholder='请输入站点简称'/>,
              )}
            </FormItem>
            <FormItem
              label="站点全称"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('full_site_name', {
                rules: [{required: true, message: '请输入站点全称', pattern: REGS.name}],
              })(
                <Input placeholder='请输入站点全称'/>,
              )}
            </FormItem>
            <FormItem
              label="站点类型"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('site_type', {
                rules: [{required: true, message: '请选择站点类型'}],
              })(
                <Select placeholder="请选择站点类型">
                  <Option value='1'>加气站</Option>
                  <Option value='2'>气化站</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              label="联系人"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('delivery_contact1', {
                rules: [{required: true, message: '请输入联系人', pattern: REGS.name}],
              })(
                <Input placeholder='请输入联系方式'/>,
              )}
            </FormItem>
            <FormItem
              label="联系方式"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('delivery_mobile1', {
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
  const {sitelist, sitepage, sitetotal, CascaderOptions} = state.maintain
  return {
    sitelist,
    sitepage,
    sitetotal,
    CascaderOptions,
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(Site))
