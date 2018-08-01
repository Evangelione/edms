import {Table, Button, Pagination} from 'antd'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {PAGE_SIZE} from "../../../constants"

function OrderTable({dispatch, list, total, page, loading}) {

  function orderDetail(record) {
    dispatch(routerRedux.push({
      pathname: '/order/orderDetail',
      query: {
        id: record.id
      }
    }))
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/order',
      query: {page}
    }))
    // 2种跳转方式
    // router.push({
    //   pathname: '/users',
    //   query: {page}
    // })
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      align: 'center'
    },
    {
      title: '气源名称',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center'
    },
    {
      title: '销售价（元/吨）',
      dataIndex: 'deliver_type',
      key: 'deliver_type',
      align: 'center',
    },
    {
      title: '数量（吨）',
      dataIndex: 'saler_num',
      key: 'saler_num',
      align: 'center',
    },
    {
      title: '订单金额（元）',
      dataIndex: 'saler_price',
      key: 'saler_price',
      align: 'center'
    },
    {
      title: '配送方式',
      dataIndex: 'deliver_type_name',
      key: 'deliver_type_name',
      align: 'center'
    },
    {
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center'
    },
    {
      title: '站点简称',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center',
    },
    {
      title: '交货时间',
      dataIndex: 'recv_time',
      key: 'recv_time',
      align: 'center',
    },
    {
      title: '下单时间',
      dataIndex: 'order_date',
      key: 'order_date',
      align: 'center',
    },
    {
      title: '订单状态',
      dataIndex: 'status_name',
      key: 'status_name',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      key: 'operation',
      render: (text, record, index) => {
        return (
          <div className={'operating'}>
            <Button className={'blueBorder'} size={'small'} onClick={orderDetail.bind(null, record)}>查看详情</Button>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={record => record.id}
        pagination={false}
        loading={loading}/>
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={page}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  )
}

function mapStateToProps(state) {
  const {list, total, page} = state.order
  return {
    list,
    page,
    total,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(OrderTable)
