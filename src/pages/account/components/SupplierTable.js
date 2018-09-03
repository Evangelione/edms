import React from 'react'
import {connect} from 'dva'
import {Table, Button, Pagination} from 'antd'
import RegisterModal from '../components/RegisterModal'
import {routerRedux} from 'dva/router'
import {IP, PAGE_SIZE} from '../../../constants'

class SupplierTable extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'balance/supplierFetch',
      payload: {page: 1, find_str: ''}
    })
  }

  goDetail = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/account/balance/supplierDetail',
      query: {
        id
      }
    }))
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'balance/supplierFetch',
      payload: {
        page,
        find_str: this.props.find_str
      }
    })
  }

  exportExcel = (str) => {
    window.location.href = `${IP}/home/account/excel-supp-balance-list?find_str=${str}`
  }

  render() {
    const {supplierList, supplierPage, supplierTotal, loading} = this.props
    const columns = [{
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center'
    }, {
      title: '采购预付款余额',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center'
    }, {
      title: '账单及明细',
      key: 'detail',
      align: 'center',
      render: (text, record, index) => {
        return <Button className='blueBorder' size='small' onClick={this.goDetail.bind(null, record.id)}>查看详情</Button>
      }
    }, {
      title: '付款登记',
      key: 'confirm',
      align: 'center',
      render: (text, record, index) => {
        return (
          <RegisterModal title='采购预付款登记' id={record.id} name={record.supp_name}>
            <Button type='primary' icon='plus' size='small'
                    style={{height: 28, padding: '0px 14px 0 10px'}}>采购预付款登记</Button>
          </RegisterModal>
        )
      }
    }]
    return (
      <div>
        <div className='toolBar'>
          {/*<ExportModal title='批量导出' type='accountSupplier' str={this.props.find_str}>*/}
          <Button type='primary' icon='export' style={{height: 28}}
                  onClick={this.exportExcel.bind(null, this.props.find_str)}>批量导出</Button>
          {/*</ExportModal>*/}
        </div>
        <Table
          columns={columns}
          dataSource={supplierList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className='ant-table-pagination'
          current={supplierPage}
          total={supplierTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {supplierList, supplierPage, supplierTotal, find_str} = state.balance
  return {
    supplierList,
    supplierPage,
    supplierTotal,
    find_str,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(SupplierTable)
