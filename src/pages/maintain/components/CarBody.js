import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal, Form, Input, InputNumber } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { PAGE_SIZE } from '../../../constants'

const FormItem = Form.Item

class CarBody extends PureComponent {
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
      car_code: record.car_code,
      imei: record.imei,
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'maintain/fetchCar',
      payload: {page, car_type: '2'},
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let url = ''
        console.log('Received values of form: ', values)
        if (this.state.modaltype === '新增') {
          url = 'insertCar'
        } else {
          url = 'modifyCar'
          values.id = this.state.current.id
        }
        this.props.dispatch({
          type: 'maintain/' + url,
          payload: {
            form: values,
            car_type: '2',
          },
        }).then(() => {
          this.toggleModal()
        })
      }
    })
  }

  render() {
    const {carbodylist, carbodypage, carbodytotal, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype} = this.state
    const columns = [{
      title: '车牌',
      dataIndex: 'car_code',
      key: 'car_code',
      align: 'center',
    }, {
      title: '载重',
      dataIndex: 'car_load',
      key: 'car_load',
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
          <Button type='primary' icon="plus" onClick={this.insertModal}>新增车挂</Button>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={carbodylist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={carbodypage}
          total={carbodytotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
        <Modal title={`${modaltype}车挂`}
               cancelText='取消'
               okText='提交'
               visible={visible}
               onOk={this.submit}
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
          <Form>
            <FormItem
              label="车牌"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('car_code', {
                rules: [{required: true, message: '请输入车牌'}],
              })(
                <Input placeholder='请输入车牌'/>,
              )}
            </FormItem>
            <FormItem
              label="载重"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('car_load', {
                rules: [{required: true, message: '请输入载重'}],
              })(
                <InputNumber placeholder='请输入载重' step={0.001} style={{width: '100%'}}/>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {carbodylist, carbodypage, carbodytotal} = state.maintain
  return {
    carbodylist,
    carbodypage,
    carbodytotal,
    loading: state.loading.models.maintain,
  }
}

export default Form.create()(connect(mapStateToProps)(CarBody))
