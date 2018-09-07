import {connect} from 'dva'
import {Table, Button, Pagination, Upload} from 'antd'
import {routerRedux} from 'dva/router'
import {IP, PAGE_SIZE} from '../../../constants'
import PromptModal from '../../../components/PromptModal/PromptModal'

function mapStateToProps(state) {
  const {carlist, carpage, cartotal} = state.maintain
  return {
    carlist,
    carpage,
    cartotal,
    loading: state.loading.models.maintain
  }
}

export default connect(mapStateToProps)(({dispatch, loading, carlist, carpage, cartotal}) => {
  function editUser(type, record) {
    dispatch({
      type: 'maintain/save',
      payload: {
        editForm: record,
        currentTab: '3'
      }
    })
    dispatch(routerRedux.push({
      pathname: '/maintain/operateVehicle',
      query: {type: type}
    }))
  }

  function pageChangeHandler(page) {
    dispatch({
      type: 'maintain/fetchCar',
      payload: {page}
    })
  }

  function customRequest(file) {
    dispatch({
      type: 'maintain/vehicleImport',
      payload: file
    })
  }

  const columns = [
    {
      title: '物流公司',
      dataIndex: 'logistic_company',
      key: 'logistic_company',
      align: 'center',
    },
    {
      title: '物流公司联系人',
      dataIndex: 'logistic_contact',
      key: 'logistic_contact',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'logistic_mobile',
      key: 'logistic_mobile',
      align: 'center',
    },
    {
      title: '车头牌照',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center',
    },
    {
      title: '车挂牌照',
      dataIndex: 'car_body',
      key: 'car_body',
      align: 'center',
    },
    {
      title: '限定载重（吨）',
      dataIndex: 'rated_load',
      key: 'rated_load',
      align: 'center',
    },
    {
      title: '司机姓名',
      dataIndex: 'driver',
      key: 'driver',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'driver_mobile',
      key: 'driver_mobile',
      align: 'center',
    },
    {
      title: '押运员',
      dataIndex: 'supercargo',
      key: 'supercargo',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'supercargo_mobile',
      key: 'supercargo_mobile',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record, index) => {
        return (
          <div className='operating'>
            <Button className='blueBorder' onClick={editUser.bind(null, 'edit', record)}
                    size='small'>编辑</Button>
            <PromptModal state='deleteOne' delType='vehicle' delID={record.id}>
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
    }
  ]
  return (
    <div>
      <div className='toolBar'>
        <Button type='primary' icon="plus"
                onClick={editUser.bind(null, 'insert')}>新增物流</Button>
        <Upload
          name='CarForm[excel]'
          showUploadList={false}
          action={`${IP}/admin/car/add-by-excel`}
          customRequest={customRequest}
          style={{marginLeft: 10}}
        >
          <Button className='blueBorder' icon="plus">批量导入</Button>
        </Upload>
      </div>
      <Table
        columns={columns}
        dataSource={carlist}
        rowKey={record => record.id}
        pagination={false}
        loading={loading}
      ></Table>
      <Pagination
        className='ant-table-pagination'
        current={carpage}
        total={cartotal}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  )
})
