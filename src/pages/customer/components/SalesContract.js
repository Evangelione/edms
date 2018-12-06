import React from 'react'
import {connect} from 'dva'
import {Table, Button, Pagination} from 'antd'
import ContractModal from '../components/ContractModal'
import {PAGE_SIZE} from '../../../constants'
import * as dateUtils from '../../../utils/getTime'

class SalesContract extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'customer/salesContractFetch',
      payload: {page: 1}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'customer/salesContractFetch',
      payload: {
        page,
        find_str: this.props.find_str,
      }
    })
  }

  render() {
    const {contractList, contractPage, contractTotal, loading} = this.props
    const columns = [{
      title: '合同编号',
      dataIndex: 'code',
      key: 'code',
      align: 'center'
    }, {
      title: '买方名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center'
    }, {
      title: '买方类型',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'center',
      render: (text, record, index) => {
        if (record.customer_type === '1') {
          return '终端用户'
        } else if (record.customer_type === '2') {
          return '贸易商'
        }
      }
    }, {
      title: '联系人',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
      align: 'center'
    }, {
      title: '联系电话',
      dataIndex: 'customer_mobile',
      key: 'customer_mobile',
      align: 'center'
    }, {
      title: '卖方名称',
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center'
    }, {
      title: '卖方类型',
      dataIndex: 'company_type',
      key: 'company_type',
      align: 'center',
      render: (text, record, index) => {
        // 0:没有类型 1贸易商 2 运贸商 3 液厂 4 接收站 5其他
        if (record.company_type === '0') {
          return '没有类型'
        } else if (record.company_type === '1') {
          return '贸易商'
        } else if (record.company_type === '2') {
          return '运贸商'
        } else if (record.company_type === '3') {
          return '液厂'
        } else if (record.company_type === '4') {
          return '接收站'
        } else if (record.company_type === '5') {
          return '其他'
        }
      }
    }, {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      align: 'center'
    }, {
      title: '联系电话',
      dataIndex: 'contact_mobile',
      key: 'contact_mobile',
      align: 'center'
    }, {
      title: '到期时间',
      dataIndex: 'end_date',
      key: 'end_date',
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
    }]
    return (
      <div>
        <div className='toolBar'>
          <ContractModal title='新增销售合同'>
            <Button className={'blueBorder'} icon='plus'>新增合同</Button>
          </ContractModal>
        </div>
        <Table
          columns={columns}
          dataSource={contractList}
          rowKey={record => record.code}
          pagination={false}
          // rowClassName={this.setClassName}
          loading={loading}
        ></Table>
        <Pagination
          className='ant-table-pagination'
          current={contractPage}
          total={contractTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {contractList, contractPage, contractTotal} = state.customer
  return {
    contractList,
    contractPage,
    contractTotal,
    loading: state.loading.models.customer
  }
}

export default connect(mapStateToProps)(SalesContract)
