import { PureComponent } from 'react'
import { Table, Button, Pagination, Modal } from 'antd'
import { connect } from 'dva'
// import PromptModal from '../../../components/PromptModal/PromptModal'
import { PAGE_SIZE } from '../../../constants'


class GasSource extends PureComponent {
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
    const {gaslist, gaspage, gastotal, loading} = this.props
    const {visible, modaltype} = this.state
    const columns = [{
      title: '气源ID',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
    }, {
      title: '企业类型',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'center',
    }, {
      title: '气源名称',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
      align: 'center',
    }, {
      title: '气源简称',
      dataIndex: 'customer_mobile',
      key: 'customer_mobile',
      align: 'center',
    }, {
      title: '联系人',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center',
    }, {
      title: '联系方式',
      dataIndex: 'full_site_name',
      key: 'full_site_name',
      align: 'center',
    }, {
      title: '所处地区',
      dataIndex: 'delivery_contact1',
      key: 'delivery_contact1',
      align: 'center',
    }, {
      title: '详细地址',
      dataIndex: 'delivery_mobile1',
      key: 'delivery_mobile1',
      align: 'center',
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record, index) => {
        return (
          <div>
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
          <Button type='primary' icon="plus" onClick={this.toggleModal.bind(null, '新增')}>新增气源</Button>
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
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {gaslist, gaspage, gastotal} = state.maintain
  return {
    gaslist,
    gaspage,
    gastotal,
    loading: state.loading.models.maintain,
  }
}

export default connect(mapStateToProps)(GasSource)
