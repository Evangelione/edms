import {Table, Button, Pagination} from 'antd'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {PAGE_SIZE} from "../../../constants"
import * as dateUtils from '../../../utils/getTime'

function OrderTable({dispatch, list, total, page, loading, order_status}) {

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
      query: {
        page,
        order_status
      }
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
      dataIndex: 'saler_price',
      key: 'saler_price',
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
      dataIndex: 'final_money',
      key: 'final_money',
      align: 'center'
    },
    {
      title: '配送方式',
      dataIndex: 'deliver_type_name',
      key: 'deliver_type_name',
      align: 'center',
      render: (text, record, index) => {
        if (text === '卖家配送') {
          return (
            <div style={{color: '#EA7878'}}>{text}</div>
          )
        }
      }
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
      width: 120,
      render: (text, record, index) => {
        if (text) {
          let time = dateUtils.getTime(text)
          let date = dateUtils.getYear(text)
          return (
            <div>
              <div>{date}</div>
              <div style={{fontSize: 14, color: '#ccc'}}>{time}</div>
            </div>
          )
        }  else {
          return (
            <div>--</div>
          )
        }
      }
    },
    {
      title: '下单时间',
      dataIndex: 'order_date',
      key: 'order_date',
      align: 'center',
      width: 120,
      render: (text, record, index) => {
        if (text) {
          let time = dateUtils.getTime(text)
          let date = dateUtils.getYear(text)
          return (
            <div>
              <div>{date}</div>
              <div style={{fontSize: 14, color: '#ccc'}}>{time}</div>
            </div>
          )
        }  else {
          return (
            <div>--</div>
          )
        }
      }
    },
    {
      title: '订单状态',
      dataIndex: 'status_name',
      key: 'status_name',
      align: 'center',
      width: 110,
      render: (text, record, index) => {
        if (text === '待支付') {
          return (
            <div style={{
              background: 'rgba(255, 66, 65, .1)',
              borderRadius: 4,
              position: 'relative',
              padding: '0 0 0 10px',
            }}>
              <div style={{
                background: '#FF4241',
                width: 6,
                height: 6,
                position: 'absolute',
                top: '8px',
                left: '12px',
                borderRadius: 6
              }}></div>
              {text}
            </div>
          )
        } else if (text === '待发货') {
          return (
            <div style={{
              background: 'rgba(254, 191, 43, .1)',
              borderRadius: 4,
              position: 'relative',
              padding: '0 0 0 10px',
            }}>
              <div style={{
                background: '#FEBF2B',
                width: 6,
                height: 6,
                position: 'absolute',
                top: '8px',
                left: '12px',
                borderRadius: 6
              }}></div>
              {text}
            </div>
          )
        } else if (text === '待收货') {
          return (
            <div style={{
              background: 'rgba(255, 154, 116, .1)',
              borderRadius: 4,
              position: 'relative',
              padding: '0 0 0 10px',
            }}>
              <div style={{
                background: '#FF9A74',
                width: 6,
                height: 6,
                position: 'absolute',
                top: '8px',
                left: '12px',
                borderRadius: 6
              }}></div>
              {text}
            </div>
          )
        } else if (text === '待结算') {
          return (
            <div style={{
              background: 'rgba(84, 168, 253, .1)',
              borderRadius: 4,
              position: 'relative',
              padding: '0 0 0 10px',
            }}>
              <div style={{
                background: '#54A8FD',
                width: 6,
                height: 6,
                position: 'absolute',
                top: '8px',
                left: '12px',
                borderRadius: 6
              }}></div>
              {text}
            </div>
          )
        } else if (text === '已结算') {
          return (
            <div style={{
              background: 'rgba(0, 183, 99, .1)',
              borderRadius: 4,
              position: 'relative',
              padding: '0 0 0 10px',
            }}>
              <div style={{
                background: '#00B763',
                width: 6,
                height: 6,
                position: 'absolute',
                top: '8px',
                left: '12px',
                borderRadius: 6
              }}></div>
              {text}
            </div>
          )
        }
      }
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
  const {list, total, page, order_status} = state.order
  return {
    list,
    page,
    total,
    order_status,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(OrderTable)
