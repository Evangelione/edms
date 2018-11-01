import React from 'react'
import {Table, Button, Pagination} from 'antd'
import {connect} from 'dva'
import ContractModal from '../components/ContractModal'
import {PAGE_SIZE} from "../../../constants";
import * as dateUtils from "../../../utils/getTime";

class SalesContract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'supplier/purchaseContractFetch',
      payload: {page: 1}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'supplier/purchaseContractFetch',
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
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center'
    }, {
      title: '买方类型',
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
      title: '卖方名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center'
    }, {
      title: '卖方类型',
      dataIndex: 'supp_type',
      key: 'supp_type',
      align: 'center',
      render: (text, record, index) => {
        // 0:没有类型 1贸易商 2 运贸商 3 液厂 4 接收站 5其他
        if (record.supp_type === '0') {
          return '没有类型'
        } else if (record.supp_type === '1') {
          return '贸易商'
        } else if (record.supp_type === '2') {
          return '运贸商'
        } else if (record.supp_type === '3') {
          return '液厂'
        } else if (record.supp_type === '4') {
          return '接收站'
        } else if (record.supp_type === '5') {
          return '其他'
        }
      }
    }, {
      title: '联系人',
      dataIndex: 'supp_contact',
      key: 'supp_contact',
      align: 'center'
    }, {
      title: '联系电话',
      dataIndex: 'supp_mobile',
      key: 'supp_mobile',
      align: 'center'
    }, {
      title: '到期时间',
      dataIndex: 'end_date',
      key: 'end_date',
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
    }]
    return (
      <div>
        <div className={'toolBar'}>
          <ContractModal title='新增采购合同'>
            <Button className={'blueBorder'} icon='plus'>新增合同</Button>
          </ContractModal>
        </div>
        <Table
          columns={columns}
          dataSource={contractList}
          rowKey={record => record.code}
          pagination={false}
          loading={loading}
        ></Table>
        <Pagination
          className="ant-table-pagination"
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
  const {contractList, contractPage, contractTotal, find_str} = state.supplier
  return {
    contractList,
    contractPage,
    contractTotal,
    find_str,
    loading: state.loading.models.supplier
  }
}

export default connect(mapStateToProps)(SalesContract)
