import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { PAGE_SIZE } from '../../../constants'


class Dirver extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modaltype: '',
    }
  }

  toggleModal = (type) => {
    this.setState({
      visible: !this.state.visible,
      modaltype: typeof type === 'object' ? '新增' : type,
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'maintain/fetchCustomer',
      payload: {page},
    })
  }

  render() {
    const {dirverlist, dirverpage, dirvertotal, loading} = this.props
    const {visible, modaltype} = this.state
    const columns = [{
      title: '姓名',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
    }, {
      title: '手机',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'center',
    }, {
      title: '相关物流公司',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
      align: 'center',
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record, index) => {
        return (
          <div className='operating'>
            <Button className='blueBorder' onClick={this.toggleModal.bind(null, '编辑')}
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
          <Button type='primary' icon="plus" onClick={this.toggleModal.bind(null, '新增')}>新增司机</Button>
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
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
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

export default connect(mapStateToProps)(Dirver)