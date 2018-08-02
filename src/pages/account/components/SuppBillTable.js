import React from 'react'
import {connect} from 'dva'
import {Table, Button, Pagination} from 'antd'
import ExportModal from '../../../components/ExportModal/ExportModal'
import withRouter from 'umi/withRouter'
import {PAGE_SIZE} from "../../../constants"

class BillTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'balance/supplierReceiptFetch',
      payload: {
        page: 1,
        stime: '',
        etime: '',
        id: this.props.location.query.id
      }
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'balance/supplierReceiptFetch',
      payload: {
        page,
        stime: this.props.stime,
        etime: this.props.etime,
        id: this.props.location.query.id
      }
    })
  }


  render() {
    const {supplierReceiptList, supplierReceiptPage, supplierReceiptTotal, loading} = this.props
    const columns = [{
      title: '流水号',
      dataIndex: 'record_code',
      key: 'record_code',
      align: 'center'
    }, {
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center'
    }, {
      title: '交易金额',
      dataIndex: 'record_sum',
      key: 'record_sum',
      align: 'center'
    }, {
      title: '款项类型',
      dataIndex: 'record_type_name',
      key: 'record_type_name',
      align: 'center'
    }, {
      title: '操作时间',
      dataIndex: 'oper_time',
      key: 'oper_time',
      align: 'center'
    }, {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    }, {
      title: '采购预付款余额',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center'
    }]
    return (
      <div>
        <div className='toolBar'>
          <ExportModal title='批量导出' type='supplierBill' id={this.props.location.query.id}>
            <Button className={'blueBorder'} icon='export'>批量导出</Button>
          </ExportModal>
        </div>
        <Table
          columns={columns}
          dataSource={supplierReceiptList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className="ant-table-pagination"
          current={supplierReceiptPage}
          total={supplierReceiptTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {supplierReceiptList, supplierReceiptPage, supplierReceiptTotal, stime, etime} = state.balance
  return {
    supplierReceiptList,
    supplierReceiptPage,
    supplierReceiptTotal,
    stime,
    etime,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(withRouter((BillTable)))
