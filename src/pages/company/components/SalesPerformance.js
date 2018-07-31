import React from 'react'
import {Table, Pagination} from 'antd'
import {connect} from 'dva'
import {PAGE_SIZE} from "../../../constants"

class SalesPerformance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'company/fetchCompanyList',
      payload: {page: 1}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'company/fetchCompanyList',
      payload: {
        page,
        find_str: this.props.find_str,
      }
    })
  }

  render() {
    const {list, page, total, loading} = this.props
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center'
    }, {
      title: '总成交客户数量',
      dataIndex: 'customer_num',
      key: 'customer_num',
      align: 'center'
    }, {
      title: '总成交订单量',
      dataIndex: 'count(o.id)',
      key: 'count(o.id)',
      align: 'center'
    }, {
      title: '总销售金额',
      dataIndex: 'all_sale_money',
      key: 'all_sale_money',
      align: 'center',
      render: (text, record, index) => {
        return `￥${text}`
      }
    }]
    return (
      <div>
        <Table
          columns={columns}
          dataSource={list}
          rowKey={record => record.salerperson_id}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className="ant-table-pagination"
          current={page}
          total={total}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function

mapStateToProps(state) {
  const {list, page, total, find_str} = state.company
  return {
    list,
    page,
    total,
    find_str,
    loading: state.loading.models.company
  }
}

export default connect(mapStateToProps)(SalesPerformance)
