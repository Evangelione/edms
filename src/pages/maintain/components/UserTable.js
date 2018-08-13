import {connect} from 'dva'
import {Table, Button, Pagination, Upload} from 'antd'
import {routerRedux} from 'dva/router'
import {IP, PAGE_SIZE} from '../../../constants'
import PromptModal from '../../../components/PromptModal/PromptModal'

function mapStateToProps(state) {
  const {customerlist, customerpage, customertotal} = state.maintain
  return {
    customerlist,
    customerpage,
    customertotal,
    loading: state.loading.models.maintain
  }
}

export default connect(mapStateToProps)(({dispatch, loading, customerlist, customerpage, customertotal}) => {
  function editUser(type, record) {
    dispatch({
      type: 'maintain/save',
      payload: {
        editForm: record,
        currentTab: '1'
      }
    })
    dispatch(routerRedux.push({
      pathname: '/maintain/operateUser',
      query: {type: type}
    }))
  }

  function pageChangeHandler(page) {
    dispatch({
      type: 'maintain/fetchCustomer',
      payload: {page}
    })
  }

  function customRequest(file) {
    dispatch({
      type: 'maintain/userImport',
      payload: file
    })
  }

  const columns = [{
    title: '客户名称',
    dataIndex: 'customer_name',
    key: 'customer_name',
    align: 'center',
    fixed: 'left',
    width: 240
  }, {
    title: '客户类型',
    dataIndex: 'customer_type',
    key: 'customer_type',
    align: 'center',
    width: 100,
    render: (text, record, index) => {
      if (text === '1') {
        return '终端用户'
      } else if (text === '2') {
        return '贸易商'
      } else if (text === '0') {
        return '--'
      }
    }
  }, {
    title: '客户联系人',
    dataIndex: 'customer_contact',
    key: 'customer_contact',
    align: 'center',
    width: 130,
  }, {
    title: '联系电话',
    dataIndex: 'customer_mobile',
    key: 'customer_mobile',
    align: 'center',
    width: 145
  }, {
    title: '站点简称',
    dataIndex: 'site_name',
    key: 'site_name',
    align: 'center',
    width: 300
  }, {
    title: '站点全称',
    dataIndex: 'full_site_name',
    key: 'full_site_name',
    align: 'center',
    width: 400
  }, {
    title: '收货联系人1',
    dataIndex: 'delivery_contact1',
    key: 'delivery_contact1',
    align: 'center',
    width: 130
  }, {
    title: '联系电话',
    dataIndex: 'delivery_mobile1',
    key: 'delivery_mobile1',
    align: 'center',
    width: 155
  }, {
    title: '收货联系人2',
    dataIndex: 'delivery_contact2',
    key: 'delivery_contact2',
    align: 'center',
    width: 130,
    render: (text, record, index) => {
      if (text === '') {
        return '--'
      }
    }
  }, {
    title: '联系电话',
    dataIndex: 'delivery_mobile2',
    key: 'delivery_mobile2',
    align: 'center',
    width: 155,
    render: (text, record, index) => {
      if (text === '') {
        return '--'
      }
    }
  }, {
    title: '收货地址',
    dataIndex: 'detailed_address',
    key: 'detailed_address',
    align: 'center',
    width: 300,
    render: (text, record, index) => {
      const adress = record.delivery_province.name + (record.delivery_city.name !== 'undefined' ? record.delivery_city.name : '') + (record.delivery_area.name !== 'undefined' ? record.delivery_area.name : '') + record.detailed_address
      return (
        <div className='txt-overflow' title={adress}>{adress}</div>
      )
    }
  }, {
    title: '站点类型',
    dataIndex: 'site_type',
    key: 'site_type',
    align: 'center',
    width: 110,
    render: (text, record, index) => {
      if (text === '1') {
        return '加气站'
      } else if (text === '2') {
        return '气化站'
      } else if (text === '0') {
        return '--'
      }
    }
  }, {
    title: '用户类型',
    dataIndex: 'user_type',
    key: 'user_type',
    align: 'center',
    width: 200,
    render: (text, record, index) => {
      if (record.site_type === '1') {
        if (text === '1') {
          return 'LNG加气站'
        } else if (text === '2') {
          return 'L-CNG加气站'
        } else if (text === '3') {
          return 'LNG L-CNG合建站'
        } else if (text === '4') {
          return 'LNG CNG合建站'
        } else if (text === '5') {
          return 'LNG 汽柴油合建站'
        } else if (text === '6') {
          return 'LNG泵船'
        } else if (text === '7') {
          return '其他'
        } else if (text === '0') {
          return '--'
        }
      } else if (record.site_type === '2') {
        if (text === '1') {
          return '电厂'
        } else if (text === '2') {
          return '城市居民'
        } else if (text === '3') {
          return '城市商服'
        } else if (text === '4') {
          return '城市供暖'
        } else if (text === '5') {
          return '工业燃料'
        } else if (text === '6') {
          return '工业原料'
        } else if (text === '7') {
          return '其他'
        } else if (text === '8') {
          return '分布式项目'
        } else if (text === '0') {
          return '--'
        }
      } else {
        return '--'
      }
    }
  }, {
    title: '操作',
    align: 'center',
    key: 'createdAt',
    fixed: 'right',
    render: (text, record, index) => {
      return (
        <div className='operating'>
          <Button className='blueBorder' onClick={editUser.bind(null, 'edit', record)}
                  size='small'>编辑</Button>
          <PromptModal state='deleteOne' delType='user' delID={record.id}>
            <Button type='primary' size='small'
                    style={{
                      background: '#EA7878',
                      borderColor: '#EA7878',
                      marginLeft: 10,
                      height: 28,
                      padding: '0 15px'
                    }}>删除</Button>
          </PromptModal>

        </div>
      )
    }
  }]
  return (
    <div>
      <div className='toolBar'>
        <Button type='primary' icon="plus"
                onClick={editUser.bind(null, 'insert', '')}>新增用户</Button>
        <Upload
          name='CustomerForm[excel]'
          showUploadList={false}
          action={`${IP}/admin/customer/add-by-excel`}
          customRequest={customRequest}
          style={{marginLeft: 10}}
        >
          <Button className='blueBorder' icon="plus">批量导入</Button>
        </Upload>
      </div>
      <Table
        columns={columns}
        dataSource={customerlist}
        rowKey={record => record.id}
        pagination={false}
        loading={loading}
        scroll={{x: 3150}}
      ></Table>
      <Pagination
        className='ant-table-pagination'
        current={customerpage}
        total={customertotal}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  )
})
