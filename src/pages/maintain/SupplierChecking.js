import React from 'react'
import { connect } from 'dva'
import { Table, Input, Form, Button, Select, Cascader, Row, Col, Popconfirm } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import { routerRedux } from 'dva/router'
import { IP } from '../../constants'
import { REGS } from '../../common/constants'

const Option = Select.Option
const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)


class EditableCell extends React.PureComponent {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true)
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true)
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({editing}, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  handleClickOutside = (e) => {
    const {editing} = this.state
    if (e.target.className === 'ant-cascader-menu-item ant-cascader-menu-item-expand') return false
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save()
    }
  }

  save = () => {
    const {record, handleSave} = this.props
    setTimeout(() => {
      this.form.validateFields((error, values) => {
        if (error) {
          return
        }
        this.toggleEdit()
        handleSave({...record, ...values})
      })
    }, 200)
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        name: targetOption.value,
        targetOption,
      },
    })
  }

  render() {
    const {editing} = this.state
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      dispatch,
      CascaderOptions,
      ...restProps
    } = this.props

    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form
              return (
                editing ? (
                  dataIndex === 'supp_type' ?
                    <FormItem style={{margin: 0}}>
                      {form.getFieldDecorator(dataIndex, {
                        initialValue: record[dataIndex],
                      })(
                        <Select ref={node => (this.input = node)} onClick={this.save} placeholder="请选择供应商类型"
                                style={{width: '100%'}}>
                          <Option value="1">贸易商</Option>
                          <Option value="2">运贸商</Option>
                          <Option value="3">液厂</Option>
                          <Option value="4">接收站</Option>
                        </Select>,
                      )}
                    </FormItem>
                    :
                    dataIndex === 'address' ?
                      <FormItem style={{margin: 0}}>
                        {form.getFieldDecorator(dataIndex)(
                          <Cascader ref={node => (this.input = node)}
                                    options={CascaderOptions}
                                    loadData={this.loadData}
                                    placeholder="请选择收货地址"
                                    onChange={this.onChange}
                            // displayRender={(labels, selectedOptions) => this.displayRender(labels, selectedOptions, [this.props.editForm.delivery_province.name, this.props.editForm.delivery_city.name, this.props.editForm.delivery_area.name])}
                          />,
                        )}
                      </FormItem>
                      :
                      <FormItem style={{margin: 0}}>
                        {form.getFieldDecorator(dataIndex, {
                          initialValue: record[dataIndex],
                        })(
                          <Input
                            ref={node => (this.input = node)}
                            onPressEnter={this.save}
                          />,
                        )}
                      </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              )
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    )
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.supplierChecking.data === undefined) {
      this.props.dispatch(routerRedux.push({
        pathname: '/maintain',
      }))
      return
    }
    this.setState({
      dataSource: [...this.props.supplierChecking.data.err_arr, ...this.props.supplierChecking.data.repeat_arr],
    })
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        name: '',
      },
    })
  }

  handleSave = (row) => {
    if (row.address) {
      row.cargo_province = row.address[0] ? row.address[0] : ''
      row.cargo_city = row.address[1] ? row.address[1] : ''
      row.cargo_area = row.address[2] ? row.address[2] : ''
      delete row.address
    }
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    console.log(newData)
    console.log(index)
    console.log(item)
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({dataSource: newData})
  }

  recommit = () => {
    this.props.dispatch({
      type: 'maintain/batchSupplier',
      payload: {
        form: this.state.dataSource,
      },
    }).then(() => {
      this.setState({
        dataSource: [...this.props.supplierChecking.data.err_arr, ...this.props.supplierChecking.data.repeat_arr],
      })
    })
  }

  goback = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/maintain',
    }))
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource]
    this.setState({dataSource: dataSource.filter(item => item.key !== key)})
  }

  export = () => {
    this.props.dispatch({
      type: 'maintain/exportSupp',
      payload: {
        json: this.state.dataSource,
      },
    }).then(() => {
      window.location.href = `${IP}/admin/supplier/batch-down-supplier-get`
    })
    // window.location.href = `${IP}/admin/supplier/batch-down-supplier?json_list=${JSON.stringify(this.state.dataSource)}`
  }

  render() {
    const {dataSource} = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    const columns = [{
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center',
      width: 200,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'supp_name',
        title: '供应商名称',
        handleSave: this.handleSave,
      }),
    }, {
      title: '供应商类型',
      dataIndex: 'supp_type',
      key: 'supp_type',
      align: 'center',
      width: 140,
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
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}></div>
        }
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'supp_type',
        title: '供应商类型',
        handleSave: this.handleSave,
      }),
    }, {
      title: '供应商联系人',
      dataIndex: 'supp_contact',
      key: 'supp_contact',
      align: 'center',
      width: 140,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'supp_contact',
        title: '供应商联系人',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'supp_mobile',
      key: 'supp_mobile',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        if (text === '' || text === undefined || !text.match(REGS.phone)) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'supp_mobile',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '气源名称',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center',
      width: 140,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'name_gas_source',
        title: '气源名称',
        handleSave: this.handleSave,
      }),
    }, {
      title: '气源产地',
      dataIndex: 'origin_gas_source',
      key: 'origin_gas_source',
      align: 'center',
      width: 140,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'origin_gas_source',
        title: '气源产地',
        handleSave: this.handleSave,
      }),
    }, {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 300,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        const adress = record.cargo_province + (record.cargo_city !== 'undefined' ? record.cargo_city : '') + (record.cargo_area !== 'undefined' ? record.cargo_area : '')
        return (
          <div className='txt-overflow' title={adress}>{adress}</div>
        )
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'address',
        title: '收货地址',
        handleSave: this.handleSave,
        CascaderOptions: this.props.CascaderOptions,
        dispatch: this.props.dispatch,
      }),
    }, {
      title: '详细地址',
      dataIndex: 'detailed_address',
      key: 'detailed_address',
      align: 'center',
      width: 200,
      render: (text, record, index) => {
        const adress = record.detailed_address
        if (adress === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return (
          <div className='txt-overflow' title={adress}>{adress}</div>
        )
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'detailed_address',
        title: '详细地址',
        handleSave: this.handleSave,
      }),
    }, {
      title: '装货联系人',
      dataIndex: 'cargo_contact',
      key: 'cargo_contact',
      align: 'center',
      width: 140,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'cargo_contact',
        title: '装货联系人',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'cargo_mobile',
      key: 'cargo_mobile',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        if (text === '' || text === undefined || !text.match(REGS.phone)) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'cargo_mobile',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record) => {
        return (
          this.state.dataSource.length >= 1
            ? (
              <div className='operating'>
                <Popconfirm title="确定删除？" cancelText='取消' okText='确定' onConfirm={() => this.handleDelete(record.key)}>
                  <Button type='primary' size='small'
                          style={{
                            background: '#EA7878',
                            borderColor: '#EA7878',
                            marginLeft: 10,
                            height: 28,
                            padding: '0 15px',
                          }}>删除</Button>
                </Popconfirm>
              </div>
            ) : null
        )
      },
    }]

    return (
      <div>
        <PageTitle>问题数据处理</PageTitle>
        <div style={{backgroundColor: '#fff'}}>
          <Row type='flex' align='middle' style={{height: 60, padding: 20}}>
            <Col span={12}>本次导入结果： 共导入
              <span
                style={{color: '#22DD48'}}>{this.props.supplierChecking.num ? this.props.supplierChecking.num.success_num : ''}</span> 条数据;&nbsp;&nbsp;
              <span
                style={{color: '#777'}}>{this.props.supplierChecking.num ? this.props.supplierChecking.num.repeat_num : ''}</span> 条数据重复,&nbsp;&nbsp;
              <span
                style={{color: '#EE113D'}}>{this.props.supplierChecking.num ? this.props.supplierChecking.num.err_num : ''}</span> 条数据有误,请修改后上传</Col>
            <Col span={12}>
              <div style={{float: 'right'}}>
                <Button type='primary' style={{width: 120}} onClick={this.export}>导出问题数据</Button>
              </div>
            </Col>
          </Row>
          <Table
            components={components}
            rowClassName={(record) => {
              if (record.repeat) {
                return 'gary-row'
              } else {
                return 'editable-row'
              }
            }}
            rowKey={record => {
              return record.key + ''
            }}
            bordered
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
          <Row type="flex" justify="space-around" align="middle" style={{height: 80}}>
            <Col>
              {this.props.supplierChecking.num ? this.props.supplierChecking.num.err_num === 0 && this.props.supplierChecking.num.repeat_num === 0 ?
                <Button type='primary' onClick={this.goback}>返回数据维护列表</Button> :
                <Button type='primary' onClick={this.recommit}>重新导入</Button> : ''
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {supplierChecking, CascaderOptions} = state.maintain
  return {
    supplierChecking,
    CascaderOptions,
    loading: state.loading.models.maintain,
  }
}

export default connect(mapStateToProps)(EditableTable)
