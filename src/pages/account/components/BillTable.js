import React from 'react'
import {connect} from 'dva'
import {Table, Button, Pagination} from 'antd'
import ExportModal from '../../../components/ExportModal/ExportModal'
import withRouter from 'umi/withRouter'
import {PAGE_SIZE} from "../../../constants"
import * as dateUtils from "../../../utils/getTime";

class BillTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'balance/clientReceiptFetch',
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
      type: 'balance/clientReceiptFetch',
      payload: {
        page,
        stime: this.props.stime,
        etime: this.props.etime,
        id: this.props.location.query.id
      }
    })
  }


  render() {
    const {clientReceiptList, clientReceiptPage, clientReceiptTotal, loading} = this.props
    const columns = [{
      title: '流水号',
      dataIndex: 'record_code',
      key: 'record_code',
      align: 'center'
    }, {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
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
      align: 'center',
      width: 120,
      render: (text, record, index) => {
        let time = dateUtils.getTime(text)
        let date = dateUtils.getYear(text)
        return (
          <div>
            <div>{date}</div>
            <div style={{fontSize: 14, color: '#ccc'}}>{time}</div>
          </div>
        )
      }
    }, {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    }, {
      title: '账户余额',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center'
    }]
    return (
      <div>
        <div className='toolBar'>
          <ExportModal title='批量导出' type='accountBill' id={this.props.location.query.id}>
            <Button className={'blueBorder'} icon='export'>批量导出</Button>
          </ExportModal>
        </div>
        <Table
          columns={columns}
          dataSource={clientReceiptList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className="ant-table-pagination"
          current={clientReceiptPage}
          total={clientReceiptTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {clientReceiptList, clientReceiptPage, clientReceiptTotal, stime, etime} = state.balance
  return {
    clientReceiptList,
    clientReceiptPage,
    clientReceiptTotal,
    stime,
    etime,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(withRouter((BillTable)))
