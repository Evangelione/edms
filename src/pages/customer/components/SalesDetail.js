import React from 'react'
import {Table, Button, Pagination} from 'antd'
import {connect} from 'dva'
import ExportModal from '../../../components/ExportModal/ExportModal'
import {PAGE_SIZE} from "../../../constants";
import * as dateUtils from "../../../utils/getTime";

class SalesDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'customer/salesDetailFetch',
      payload: {page: 1}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'customer/salesDetailFetch',
      payload: {
        page,
        find_str: this.props.find_str,
        stime: this.props.stime,
        etime: this.props.etime
      }
    })
  }

  render() {
    const {detailList, detailPage, detailTotal, loading} = this.props
    const columns = [{
      title: '订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      align: 'center'
    }, {
      title: '气源名称',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center'
    }, {
      title: '气源产地',
      dataIndex: 'origin_gas_source',
      key: 'origin_gas_source',
      align: 'center'
    }, {
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center'
    }, {
      title: '卸车时间',
      dataIndex: 'unload_time',
      key: 'unload_time',
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
      title: '站点简称',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center'
    }, {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center'
    }, {
      title: '装车吨位',
      dataIndex: 'load_num',
      key: 'load_num',
      align: 'center'
    }, {
      title: '卸车吨位',
      dataIndex: 'unload_num',
      key: 'unload_num',
      align: 'center'
    }, {
      title: '结算吨位',
      dataIndex: 'final_num',
      key: 'final_num',
      align: 'center'
    }, {
      title: '销售单价（元）',
      dataIndex: 'saler_price',
      key: 'saler_price',
      align: 'center'
    }, {
      title: '销售额（元）',
      dataIndex: 'sale_money',
      key: 'sale_money',
      align: 'center',
      render: (text, record, index) => {
        return (text - 0).toFixed(2)
      }
    }]
    return (
      <div>
        <div className={'toolBar'}>
          <ExportModal title='批量导出' type='customerSalesDetail' str={this.props.find_str}>
            <Button className={'blueBorder'} icon='export'>批量导出</Button>
          </ExportModal>
        </div>
        <Table
          columns={columns}
          dataSource={detailList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className="ant-table-pagination"
          current={detailPage}
          total={detailTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {detailList, detailPage, detailTotal, stime, etime, find_str} = state.customer
  return {
    detailList,
    detailPage,
    detailTotal,
    stime,
    etime,
    find_str,
    loading: state.loading.models.customer
  }
}

export default connect(mapStateToProps)(SalesDetail)
