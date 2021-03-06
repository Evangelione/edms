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
      type: 'logistics/fetchHistory',
      payload: {
        page: 1,
        stime: str[0],
        etime: str[1],
        logistics_company: this.props.logistics_company,
        account_status: this.props.account_status,
      },
    })
  }

  fetchList = (filed, value, option) => {
    this.props.dispatch({
      type: 'logistics/saveChange',
      payload: {
        [filed]: value,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchHistory',
        payload: {
          page: 1,
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
        },
      })
    })
  }

  isEmptyValue = (filed, value) => {
    this.props.dispatch({
      type: 'logistics/saveChange',
      payload: {
        [filed]: value,
      },
    }).then(() => {
      if (value === '') {
        this.props.dispatch({
          type: 'logistics/fetchHistory',
          payload: {
            page: 1,
            find_str: this.props.find_str,
            stime: this.props.stime,
            etime: this.props.etime,
            logistics_company: this.props.logistics_company,
            account_status: this.props.account_status,
          },
        })
      }
    })
  }

  menuClick = (filed, option) => {
    this.props.dispatch({
      type: 'logistics/saveChange',
      payload: {
        [filed]: option.key,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchHistory',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
        },
      })
    })
  }
  selectStatus = (val) => {
    this.props.dispatch({
      type: 'logistics/saveChange',
      payload: {
        account_status: val,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchHistory',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
        },
      })
    })
  }

  balanceHistory = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/logistics/logisticsHistory',
      query: {
        id,
      },
    }))
  }

  reconciliationConfirm = (id) => {
    this.props.dispatch({
      type: 'logistics/reconciliationConfirm',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
        },
      })
    })
  }

  deleteduizhang = (id) => {
    this.props.dispatch({
      type: 'logistics/deleteduizhang',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
        },
      })
    })
  }

  kaipiao = (id) => {
    this.props.dispatch({
      type: 'logistics/kaipiao',
      payload: {
        id,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
        },
      })
    })
  }

  export = (id) => {
    window.location.href = `${IP}/home/logistics/excel?id=${id}`
  }

  render() {
    const {historylist, historypage, historytotal, logisticsOption, loading} = this.props
    const logisticsOptions = logisticsOption.map(option => {
      return <Option2 key={option.id} value={option.id}>{option.supp_name}</Option2>
    })
    const logisticsmenu = (
      <Menu onClick={this.menuClick.bind(null, 'logistics_company')}>
        {logisticsOption.map(option => {
          return <Menu.Item key={option.id} value={option.id}>{option.supp_name}</Menu.Item>
        })}
      </Menu>
    )
    const columns = [{
      title: '对账时间',
      dataIndex: 'log_time',
      key: 'log_time',
      align: 'center',
    }, {
      title: '供应商',
      dataIndex: 'logistics_company',
      key: 'logistics_company',
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
      dataIndex: 'deliver_count',
      key: 'deliver_count',
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
          <span>选择供应商</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账供应商名称'
                        // value={this.props.logistics_company}
                        onSelect={this.fetchList.bind(null, 'logistics_company')}
                        onChange={this.isEmptyValue.bind(this, 'logistics_company')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
            {logisticsOptions}
          </AutoComplete>
          <Dropdown overlay={logisticsmenu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择订单</span>
          <Select defaultValue="1" style={{fontSize: '1rem', marginLeft: 10}} onSelect={this.selectStatus}>
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
  const {historylist, historypage, historytotal, stime, etime, logistics_company, logisticsOption, account_status} = state.logistics
  return {
    historylist,
    historypage,
    historytotal,
    stime,
    etime,
    logisticsOption,
    logistics_company,
    account_status,
    loading: state.loading.models.logistics,
  }
}

export default Form.create()(connect(mapStateToProps)(StatementHistory))
