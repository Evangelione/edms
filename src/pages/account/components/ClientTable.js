import React from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination } from 'antd'
import RegisterModal from '../components/RegisterModal'
import CreditModal from '../components/CreditModal'
import { IP, PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'

class ClientTable extends React.Component {

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

  exportExcel = (str) => {
    window.location.href = `${IP}/home/account/excel-cust-balance-list?find_str=${str}`
  }

  render() {
    const {clientList, clientPage, clientTotal, loading} = this.props
    const columns = [{
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center'
    }, {
      title: '账户余额(元)',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center'
    }, {
      title: <div style={{color: '#24c97a'}}>信用总额度(元)</div>,
      dataIndex: 'credit',
      key: 'credit',
      align: 'center'
    }, {
      title: <div style={{color: '#1d86f8'}}>可用额度(元)</div>,
      dataIndex: 'diy',
      key: 'diy',
      align: 'center',
      render: (text, record, index) => {
        let num = (record.credit - 0) - (record.credit_used - 0)
        return (
          <div>{num.toFixed(2)}</div>
        )
      }
    }, {
      title: <div style={{color: '#ec9126'}}>已用额度(元)</div>,
      dataIndex: 'credit_used',
      key: 'credit_used',
      align: 'center'
    }, {
      title: '收款登记',
      key: 'confirm',
      align: 'center',
      render: (text, record, index) => {
        return (
          <RegisterModal title='收款登记' id={record.id} name={record.customer_name} type='client'>
            <Button type='primary' icon='plus' size='small'
                    style={{height: 28, padding: '0px 14px 0 10px'}}>收款登记</Button>
          </RegisterModal>
        )
      }
    }, {
      title: '设置信用额度',
      dataIndex: 'balance',
      key: 'szbl',
      align: 'center',
      render: (text, record, index) => {
        return (
          <CreditModal title='设置信用额度' id={record.id} name={record.customer_name} credit={record.credit}
                       credit_notice={record.credit_notice} phones={record.phones} credit_surplus={record.credit_surplus}>
            <Button type='primary' style={{width: 104, height: 28, padding: '0px 14px 0 10px'}}>设置</Button>
          </CreditModal>
        )
      }
    }, {
      title: '账单及明细',
      key: 'detail',
      align: 'center',
      render: (text, record, index) => {
        return <Button className='blueBorder' size='small' onClick={this.goDetail.bind(null, record.id)}>查看详情</Button>
      }
    }]
    return (
      <div>
        <div className='toolBar'>
          <Button type='primary' icon='export' style={{height: 28}}
                  onClick={this.exportExcel.bind(null, this.props.find_str)}>批量导出</Button>
        </div>
        <Table
          columns={columns}
          dataSource={clientList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
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
