import React, { Component } from 'react'
import { Button, Table, Form, Pagination, DatePicker, AutoComplete, Dropdown, Select, Menu, Popconfirm } from 'antd'
import { IP, PAGE_SIZE } from '../../../constants'
import { connect } from 'dva'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { routerRedux } from 'dva/router'


const {RangePicker} = DatePicker
const Option = Select.Option
const Option2 = AutoComplete.Option


class StatementHistory extends Component {
  dateChange = (val, str) => {
    this.props.dispatch({
      type: 'customer/fetchHistory',
      payload: {
        page: 1,
        stime: str[0],
        etime: str[1],
        customer_id: this.props.customer_id,
        account_status: this.props.account_status,
      },
    })
  }

  fetchList = (filed, value, option) => {
    this.props.dispatch({
      type: 'customer/saveChange',
      payload: {
        [filed]: value,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          page: 1,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
        },
      })
    })
  }

  isEmptyValue = (filed, value) => {
    this.props.dispatch({
      type: 'customer/saveChange',
      payload: {
        [filed]: value,
      },
    }).then(() => {
      if (value === '') {
        this.props.dispatch({
          type: 'customer/fetchHistory',
          payload: {
            page: 1,
            find_str: this.props.find_str,
            stime: this.props.stime,
            etime: this.props.etime,
            customer_id: this.props.customer_id,
            account_status: this.props.account_status,
          },
        })
      }
    })
  }

  menuClick = (filed, option) => {
    this.props.dispatch({
      type: 'customer/saveChange',
      payload: {
        [filed]: option.key,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
        },
      })
    })
  }
  selectStatus = (val) => {
    this.props.dispatch({
      type: 'customer/saveChange',
      payload: {
        account_status: val,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
        },
      })
    })
  }

  balanceHistory = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/customer/customerHistory',
      query: {
        id,
      },
    }))
  }

  reconciliationConfirm = (id) => {
    this.props.dispatch({
      type: 'customer/reconciliationConfirm',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
        },
      })
    })
  }

  deleteduizhang = (id) => {
    this.props.dispatch({
      type: 'customer/deleteduizhang',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
        },
      })
    })
  }

  kaipiao = (id) => {
    this.props.dispatch({
      type: 'customer/kaipiao',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
        },
      })
    })
  }

  export = (id) => {
    window.location.href = `${IP}/home/customer/excel?id=${id}`
  }

  render() {
    console.log(this.props.customOption)
    const {historylist, historypage, historytotal, customOption, loading} = this.props
    const customOptions = customOption.map(option => {
      return <Option2 key={option.id} value={option.id} mobile={option.customer_mobile}
                      contact={option.customer_contact} balance={option.balance} credit={option.credit}
                      credit_used={option.credit_used}>{option.customer_name}</Option2>
    })
    const customermenu = (
      <Menu onClick={this.menuClick.bind(null, 'customer_id')}>
        {customOption.map(option => {
          return <Menu.Item key={option.id} value={option.id} mobile={option.customer_mobile}
                            contact={option.customer_contact} balance={option.balance} credit={option.credit}
                            credit_used={option.credit_used}>{option.customer_name}</Menu.Item>
        })}
      </Menu>
    )
    const columns = [{
      title: '对账时间',
      dataIndex: 'log_time',
      key: 'log_time',
      align: 'center',
    }, {
      title: '客户',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
    }, {
      title: '气源',
      dataIndex: 'goods',
      key: 'goods',
      align: 'center',
    }, {
      title: '站点',
      dataIndex: 'site',
      key: 'site',
      align: 'center',
    }, {
      title: '对账周期',
      dataIndex: 'account_cycle_start',
      key: 'account_cycle_start',
      align: 'center',
      render: (text, record) => {
        return <div>{record.account_cycle_start}-{record.account_cycle_end}</div>
      },
    }, {
      title: '订单数量',
      dataIndex: 'order_count',
      key: 'order_count',
      align: 'center',
    }, {
      title: '对账总额(元)',
      dataIndex: 'total_account',
      key: 'total_account',
      align: 'center',
    }, {
      title: '对账状态',
      dataIndex: 'account_status',
      key: 'account_status',
      align: 'center',
      render: (text) => {
        if (text === '1') {
          return <div style={{color: '#3477ED'}}>对账中</div>
        } else if (text === '2') {
          return <div style={{color: '#60C899'}}>已对账</div>
        } else if (text === '3') {
          return <div style={{color: '#F7772A'}}>已开票</div>
        }
      },
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record, index) => {
        return (
          <div>
            <Button className='blueBorder' onClick={this.balanceHistory.bind(null, record.id)}>查看明细</Button>
            <Button type='primary' style={{height: 28, marginLeft: 5}}
                    onClick={this.export.bind(null, record.id)}>导出</Button>

            <Popconfirm title="是否开始此条记录对账?" onConfirm={this.reconciliationConfirm.bind(null, record.id)} okText="对账"
                        cancelText="取消">
              <Button disabled={record.account_status !== '1'} type='primary'
                      style={{height: 28, marginLeft: 5}}>确认对账</Button>
            </Popconfirm>
            <Popconfirm title="确认开票?" onConfirm={this.kaipiao.bind(null, record.id)} okText="确认" cancelText="取消">
              <Button disabled={record.account_status !== '2'} type='primary'
                      style={{height: 28, marginLeft: 5}}>确认开票</Button>
            </Popconfirm>

            <Popconfirm title="是否删除此条对账记录?" onConfirm={this.deleteduizhang.bind(null, record.id)} okText="删除"
                        cancelText="取消">
              <Button disabled={record.account_status !== '1'}
                      className={record.account_status !== '1' ? '' : 'redDisable'}
                      style={{marginLeft: 5, height: 28}}>删除</Button>
            </Popconfirm>
          </div>
        )
      },
    }]
    return (
      <div>
        <div style={{position: 'absolute', top: 10, right: 32, fontSize: '1rem'}}>
          <RangePicker locale={locale} style={{width: 200, marginRight: 10}} onChange={this.dateChange}/>
          <span>选择客户</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账客户名称'
                        // value={this.props.customer_id}
                        onSelect={this.fetchList.bind(null, 'customer_id')}
                        onChange={this.isEmptyValue.bind(this, 'customer_id')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
            {customOptions}
          </AutoComplete>
          <Dropdown overlay={customermenu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择订单</span>
          <Select defaultValue="" style={{fontSize: '1rem', marginLeft: 10}} onSelect={this.selectStatus}>
            <Option value="" style={{color: '#4A4A4A'}}>全部</Option>
            <Option value="1" style={{color: '#3477ED'}}>对账中</Option>
            <Option value="2" style={{color: '#60C899'}}>已对账</Option>
            <Option value="3" style={{color: '#F7772A'}}>已开票</Option>
          </Select>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={historylist}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className='ant-table-pagination'
          current={historypage}
          total={historytotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {historylist, historypage, historytotal, stime, etime, customer_id, customOption, account_status} = state.customer
  return {
    historylist,
    historypage,
    historytotal,
    stime,
    etime,
    customOption,
    customer_id,
    account_status,
    loading: state.loading.models.customer,
  }
}

export default Form.create()(connect(mapStateToProps)(StatementHistory))
