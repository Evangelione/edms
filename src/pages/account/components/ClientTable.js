import React from 'react'
import {Table, Button, Pagination} from 'antd'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import ExportModal from '../../../components/ExportModal/ExportModal'
import RegisterModal from '../components/RegisterModal'
import {PAGE_SIZE} from "../../../constants";

class ClientTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'balance/clientFetch',
      payload: {page: 1, find_str: ''}
    })
  }

  goDetail = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/account/balance/clientDetail',
      query: {
        id
      }
    }))
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'balance/clientFetch',
      payload: {
        page,
        find_str: this.props.find_str
      }
    })
  }

  render() {
    const {clientList, clientPage, clientTotal, loading} = this.props
    const columns = [{
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center'
    }, {
      title: '账户余额',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center'
    }, {
      title: '账单及明细',
      key: 'detail',
      align: 'center',
      render: (text, record, index) => {
        return <Button className={'blueBorder'} size='small' onClick={this.goDetail.bind(null, record.id)}>查看详情</Button>
      }
    }, {
      title: '收款登记',
      key: 'confirm',
      align: 'center',
      render: (text, record, index) => {
        return (
          <RegisterModal title='收款登记' id={record.id} name={record.customer_name} type='client'>
            <Button type='primary' icon='plus' size='small'>收款登记</Button>
          </RegisterModal>
        )
      }
    }]
    return (
      <div>
        <div className={'toolBar'}>
          <ExportModal title='批量导出' type='accountClient' str={this.props.find_str}>
            <Button className={'blueBorder'} icon='export'>批量导出</Button>
          </ExportModal>
        </div>
        <Table
          columns={columns}
          dataSource={clientList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className="ant-table-pagination"
          current={clientPage}
          total={clientTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {clientList, clientPage, clientTotal, find_str} = state.balance
  return {
    clientList,
    clientPage,
    clientTotal,
    find_str,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(ClientTable)
