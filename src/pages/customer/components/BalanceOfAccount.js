import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination, message, DatePicker, AutoComplete, Select } from 'antd'
import { PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'
// import ExportModal from './ExportModal'
import PromptModal from '../../../components/PromptModal/PromptModal'
import * as dateUtils from '../../../utils/getTime'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const {RangePicker} = DatePicker
const {Option} = Select
const Option2 = AutoComplete.Option

class BalanceOfAccount extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
    }
  }

  fetchList = (filed, value, option) => {
    this.props.dispatch({
      type: 'customer/saveChange',
      payload: {
        [filed]: value,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'customer/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
        },
      })
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
        type: 'customer/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
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
          type: 'customer/balanceFetch',
          payload: {
            page: 1,
            find_str: this.props.find_str,
            stime: this.props.stime,
            etime: this.props.etime,
            customer_id: this.props.customer_id,
            account_status: this.props.account_status,
            site_id: this.props.site_id,
            goods_id: this.props.goods_id,
          },
        })
      }
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
        type: 'customer/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
        },
      })
    })
  }

  dateChange = (val, str) => {
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        find_str: this.props.find_str,
        stime: str[0],
        etime: str[1],
        customer_id: this.props.customer_id,
        account_status: this.props.account_status,
        site_id: this.props.site_id,
        goods_id: this.props.goods_id,
      },
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: this.props.find_str,
        customer_id: this.props.customer_id,
        account_status: this.props.account_status,
        site_id: this.props.site_id,
        goods_id: this.props.goods_id,
      },
    })
  }

  balanceHistory = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/customer/customerHistory',
    }))
  }

  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
    } else {
      selectedRowKeys.push(record.id)
    }
    if (record.account_status !== '1') {
      return false
    }
    this.setState({selectedRowKeys})
  }

  onSelectedRowKeysChange = (selectedRowKeys, datasource) => {
    this.setState({selectedRowKeys})
  }

  export = () => {
    if (this.state.selectedRowKeys.length) {
      let ids = this.state.selectedRowKeys.join(',')
      this.props.dispatch({
        type: 'customer/Reconciliation',
        payload: {
          ids,
        },
      }).then(() => {
        this.props.dispatch({
          type: 'customer/balanceFetch',
          payload: {
            page: 1,
            find_str: this.props.find_str,
            stime: this.props.stime,
            etime: this.props.etime,
            customer_id: this.props.customer_id,
            account_status: this.props.account_status,
            site_id: this.props.site_id,
            goods_id: this.props.goods_id,
          },
        })
      })
      this.setState({
        selectedRowKeys: [],
      })
    } else {
      message.error('请勾选需要导出的对账信息')
    }
  }

  resetSelectKey = () => {
    this.setState({
      selectedRowKeys: [],
    })
  }

  render() {
    const {balanceList, balancePage, balanceTotal, customOption, siteOption, goodsOption, loading} = this.props
    const {selectedRowKeys} = this.state
    const customOptions = customOption.map(option => {
      return <Option2 key={option.id} value={option.id} mobile={option.customer_mobile}
                      contact={option.customer_contact} balance={option.balance} credit={option.credit}
                      credit_used={option.credit_used}>{option.customer_name}</Option2>
    })
    const siteOptions = siteOption.map(option => {
      return <Option2 key={option.id}
                      sitetype={option.site_type}
                      usertype={option.user_type_name}
                      province={option.delivery_province}
                      city={option.delivery_city}
                      area={option.delivery_area}
                      address={option.detailed_address}
                      shouhuo={option.shouhuo}
                      value={option.id}>{option.site_name}</Option2>
    })
    const goodsOptions = goodsOption.map(option => {
      return <Option2 key={option.id} source={option.origin_gas_source}
                      contact={option.cargo_contact}
                      mobile={option.cargo_mobile}
                      province={option.cargo_province}
                      city={option.cargo_city}
                      area={option.cargo_area}
                      address={option.detailed_address}
                      report={option.temperament_report}
                      value={option.id}>{option.name_gas_source}</Option2>
    })
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      getCheckboxProps: record => ({
        disabled: record.account_status !== '1', // Column configuration not to be checked
        // name: record.name,
      }),
    }
    const customermenu = customOption.map(option => {
      return <Option key={option.id} value={option.id} mobile={option.customer_mobile}
                     contact={option.customer_contact} balance={option.balance} credit={option.credit}
                     credit_used={option.credit_used}
                     onClick={this.menuClick.bind(null, 'customer_id')}>{option.customer_name}</Option>
    })
    const sitemenu = siteOption.map(option => {
      return <Option key={option.id}
                     sitetype={option.site_type}
                     usertype={option.user_type_name}
                     province={option.delivery_province}
                     city={option.delivery_city}
                     area={option.delivery_area}
                     address={option.detailed_address}
                     shouhuo={option.shouhuo}
                     value={option.id} onClick={this.menuClick.bind(null, 'site_id')}>{option.site_name}</Option>
    })
    const goodsmenu = goodsOption.map(option => {
      return <Option key={option.id} source={option.origin_gas_source}
                     contact={option.cargo_contact}
                     mobile={option.cargo_mobile}
                     province={option.cargo_province}
                     city={option.cargo_city}
                     area={option.cargo_area}
                     address={option.detailed_address}
                     report={option.temperament_report}
                     value={option.id}
                     onClick={this.menuClick.bind(null, 'goods_id')}>{option.name_gas_source}</Option>
    })
    const columns = [{
      title: '订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      align: 'center',
    }, {
      title: '客户',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
    }, {
      title: '车牌',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center',
    }, {
      title: '装车时间',
      dataIndex: 'load_time',
      key: 'load_time',
      align: 'center',
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
        } else {
          return (
            <div>--</div>
          )
        }
      },
    }, {
      title: '气源',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center',
    }, {
      title: '站点',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center',
    }, {
      title: '装车量(吨)',
      dataIndex: 'load_num',
      key: 'load_num',
      align: 'center',
    }, {
      title: '卸车量(吨)',
      dataIndex: 'unload_num',
      key: 'unload_num',
      align: 'center',
    }, {
      title: '结算量(吨)',
      dataIndex: 'final_num',
      key: 'final_num',
      align: 'center',
    }, {
      title: '销售价(元)',
      dataIndex: 'saler_price',
      key: 'saler_price',
      align: 'center',
    }, {
      title: '销售额(元)',
      dataIndex: 'sale_money',
      key: 'sale_money',
      align: 'center',
    }, {
      title: '客户余额(元)',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
    }, {
      title: '信用余额(元)',
      dataIndex: 'credit_balance',
      key: 'credit_balance',
      align: 'center',
    }, {
      title: '订单状态',
      dataIndex: 'account_status',
      key: 'account_status',
      align: 'center',
      render: (text) => {
        if (text === '1') {
          return <div style={{color: '#8897BD'}}>待对账</div>
        } else if (text === '2') {
          return <div style={{color: '#3477ED'}}>对账中</div>
        } else if (text === '3') {
          return <div style={{color: '#60C899'}}>已对账</div>
        } else {
          return <div style={{color: '#F7772A'}}>已开票</div>
        }
      },
    }]
    return (
      <div>
        <div style={{position: 'absolute', top: 10, left: 32, fontSize: '1rem'}}>
          <RangePicker locale={locale} style={{width: 210, marginRight: 10}} onChange={this.dateChange}/>
          <span>选择客户</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账客户名称'
                        value={this.props.customer_id}
                        onSelect={this.fetchList.bind(null, 'customer_id')}
                        onChange={this.isEmptyValue.bind(this, 'customer_id')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
            {customOptions}
          </AutoComplete>
          <Select style={{marginRight: 10, width: 37, fontSize: '1rem'}} dropdownMatchSelectWidth={false}
                  value={this.props.customer_id} className='customSelect'>
            {customermenu}
          </Select>
          <span>选择气源</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账气源名称'
                        value={this.props.goods_id}
                        onSelect={this.fetchList.bind(null, 'goods_id')}
                        onChange={this.isEmptyValue.bind(null, 'goods_id')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
            {goodsOptions}
          </AutoComplete>
          <Select style={{marginRight: 10, width: 37, fontSize: '1rem'}} dropdownMatchSelectWidth={false}
                  className='customSelect'>
            {goodsmenu}
          </Select>
          <span>选择站点</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账站点名称'
                        value={this.props.site_id}
                        onSelect={this.fetchList.bind(null, 'site_id')}
                        onChange={this.isEmptyValue.bind(null, 'site_id')}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
            {siteOptions}
          </AutoComplete>
          <Select style={{marginRight: 10, width: 37, fontSize: '1rem'}} dropdownMatchSelectWidth={false}
                  className='customSelect'>
            {sitemenu}
          </Select>
          <span>选择订单</span>
          <Select value={this.props.account_status} style={{fontSize: '1rem', marginLeft: 10}}
                  onSelect={this.selectStatus}>
            <Option value="" style={{color: '#4A4A4A'}}>全部</Option>
            <Option value="1" style={{color: '#8897BD'}}>待对账</Option>
            <Option value="2" style={{color: '#3477ED'}}>对账中</Option>
            <Option value="3" style={{color: '#60C899'}}>已对账</Option>
            <Option value="4" style={{color: '#F7772A'}}>已开票</Option>
          </Select>
        </div>
        <div className='toolBar'>
          <Button type='primary' style={{minWidth: 64, height: 28, marginRight: 6}} onClick={this.export}
                  disabled={!this.state.selectedRowKeys.length}>对账</Button>
          <PromptModal state='duiAll' stime={this.props.stime} etime={this.props.etime}
                       account_status={this.props.account_status} customer_id={this.props.customer_id}
                       site_id={this.props.site_id} goods_id={this.props.goods_id} callback={this.resetSelectKey}>
            <Button type='primary' style={{minWidth: 64, height: 28}}
                    disabled={this.props.account_status !== '1'}>全部对账</Button>
          </PromptModal>
          {/*<Button className='blueBorder' style={{width: 110}}*/}
          {/*onClick={this.balanceHistory.bind(null, this.props.find_str)}>对账历史</Button>*/}
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={balanceList}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
          rowClassName={(record) => {
            if (record.account_status !== '1') {
              return 'duizhangIng'
            }
          }}
          highLightColor={'#aaa'}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record)
            },
          })}
        />
        <Pagination
          className='ant-table-pagination'
          current={balancePage}
          total={balanceTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    balanceList, balancePage, balanceTotal, find_str, stime, etime, customer_id, account_status, site_id, goods_id,
  } = state.customer
  const {customOption, siteOption, goodsOption} = state.home
  return {
    balanceList,
    balancePage,
    balanceTotal,
    find_str,
    stime,
    etime,
    customer_id,
    account_status,
    site_id,
    goods_id,
    customOption,
    siteOption,
    goodsOption,
    loading: state.loading.models.customer,
  }
}

export default connect(mapStateToProps)(BalanceOfAccount)
