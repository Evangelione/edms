import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal, Form, Input } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { PAGE_SIZE } from '../../../constants'
import { REGS } from '../../../common/constants'

const FormItem = Form.Item

class Dirver extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modaltype: '',
    }
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
      driver_name: record.driver_name,
      driver_mobile: record.driver_mobile,
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let url = ''
        console.log('Received values of form: ', values)
        if (this.state.modaltype === '新增') {
          url = 'insertDirver'
        } else {
          url = 'modifyDirver'
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
      type: 'maintain/fetchDirverList',
      payload: {page},
    })
  }

  render() {
    const {dirverlist, dirverpage, dirvertotal, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype} = this.state
    const columns = [{
      title: '姓名',
      dataIndex: 'driver',
      key: 'driver',
      align: 'center',
    }, {
      title: '联系方式',
      dataIndex: 'driver_mobile',
      key: 'driver_mobile',
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
          <Button type='primary' icon="plus" onClick={this.insertModal}>新增司机</Button>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={dirverlist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={dirverpage}
          total={dirvertotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
        <Modal title={`${modaltype}司机`}
               cancelText='取消'
               okText='提交'
               visible={visible}
               onOk={this.submit}
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
          <Form>
            <FormItem
              label="司机"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('driver', {
                rules: [{required: true, message: '请输入司机', pattern: REGS.name}],
              })(
                <Input placeholder='请输入司机'/>,
              )}
            </FormItem>
            <FormItem
              label="联系方式"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('driver_mobile', {
                rules: [{required: true, message: '请输入联系方式', pattern: REGS.phone}],
              })(
                <Input placeholder='请输入联系方式'/>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {dirverlist, dirverpage, dirvertotal} = state.maintain
  return {
    dirverlist,
    dirverpage,
    dirvertotal,
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(Dirver))
