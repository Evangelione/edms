import { connect } from 'dva'
import { Table, Button, Pagination, Upload, message } from 'antd'
import { routerRedux } from 'dva/router'
import { IP, PAGE_SIZE } from '../../../constants'
import PromptModal from '../../../components/PromptModal/PromptModal'

function mapStateToProps(state) {
  const {supplierlist, supplierpage, suppliertotal} = state.maintain
  return {
    supplierlist,
    supplierpage,
    suppliertotal,
    loading: state.loading.models.maintain
  }
}

export default connect(mapStateToProps)(({dispatch, loading, supplierlist, supplierpage, suppliertotal}) => {
  function editUser(type, record) {
    dispatch({
      type: 'maintain/save',
      payload: {
        editForm: record,
        currentTab: '2'
      }
    })
    dispatch(routerRedux.push({
      pathname: '/maintain/operateSupplier',
      query: {type: type}
    }))
  }


  function pageChangeHandler(page) {
    dispatch({
      type: 'maintain/fetchSupplier',
      payload: {page}
    })
  }

  function upLoadReport(id, file) {
    dispatch({
      type: 'maintain/uploadSingle',
      payload: {id, file}
    })
  }

  function customRequest(file) {
    dispatch({
      type: 'maintain/suppImport',
      payload: file
    }).then(() => {
      dispatch(routerRedux.push({
        pathname: '/maintain/SupplierChecking',
      }))
    })
  }

  function downLoad() {
    window.location.href = `${IP}/admin/supplier/download`
  }

  function openPDF(text) {
    window.open(text)
  }

  function beforeUpload(file) {
    const isPDF = file.type === 'application/pdf'
    if (!isPDF) {
      message.error('You can only upload JPG file!')
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('Image must smaller than 2MB!')
    }
    return isPDF && isLt20M;
  }

  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center',
    },
    {
      title: '供应商类型',
      dataIndex: 'supp_type',
      key: 'supp_type',
      align: 'center',
      render: (text, record, index) => {
        if (text === '1') {
          return '贸易商'
        } else if (text === '2') {
          return '运贸商'
        } else if (text === '3') {
          return '液厂'
        } else if (text === '4') {
          return '接收站'
        } else if (text === '0') {
          return '--'
        }
      }
    },
    {
      title: '供应商联系人',
      dataIndex: 'supp_contact',
      key: 'supp_contact',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'supp_mobile',
      key: 'supp_mobile',
      align: 'center',
    },
    {
      title: '气源名称',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center',
    },
    {
      title: '气源产地',
      dataIndex: 'origin_gas_source',
      key: 'origin_gas_source',
      align: 'center',
    },
    {
      title: '装货地址',
      dataIndex: 'delivery_mobile1',
      key: 'delivery_mobile1',
      align: 'center',
      render: (text, record, index) => {
        return (
          <span>{record.cargo_province.name + (record.cargo_city.name !== 'undefined' ? record.cargo_city.name : '') + (record.cargo_area.name !== 'undefined' ? record.cargo_area.name : '') + record.detailed_address}</span>
        )
      }
    },
    {
      title: '装货联系人',
      dataIndex: 'cargo_contact',
      key: 'cargo_contact',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'cargo_mobile',
      key: 'cargo_mobile',
      align: 'center',
    },
    {
      title: '气质报告',
      dataIndex: 'temperament_report',
      key: 'temperament_report',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div>
            {record.temperament_report ?
              <Button className={'blueBorder'} size={'small'} onClick={openPDF.bind(null, text)}>查看</Button>
              :
              <Upload
                accept='.jpg,.png'
                name='SuppForm[pdf]'
                action={`${IP}/admin/supplier/up-report`}
                customRequest={upLoadReport.bind(null, record.id)}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                <Button type='primary'>上传</Button>
              </Upload>
            }
          </div>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      width: 180,
      render: (text, record, index) => {
        return (
          <div className='operating'>
            <Button className={'blueBorder'} onClick={editUser.bind(null, 'edit', record)}
                    size={'small'}>编辑</Button>
            <PromptModal state='deleteOne' delType='supplier' delID={record.id}>
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
                onClick={editUser.bind(null, 'insert', '')}>新增供应商</Button>
        <Upload
          name='SuppForm[excel]'
          showUploadList={false}
          action={`${IP}/admin/supplier/add-by-excel`}
          customRequest={customRequest}
          style={{marginLeft: 10}}
        >
          <Button className='blueBorder' icon="plus">批量导入</Button>
        </Upload>
        <Button className='blueBorder' icon="cloud-download" style={{marginLeft: 10}}
                onClick={downLoad}>下载供应商导入模板</Button>
      </div>
      <Table
        columns={columns}
        dataSource={supplierlist}
        rowKey={record => record.id}
        pagination={false}
        loading={loading}
      ></Table>
      <Pagination
        className='ant-table-pagination'
        current={supplierpage}
        total={suppliertotal}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  )
})
