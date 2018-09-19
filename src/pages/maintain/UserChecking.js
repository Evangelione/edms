import React from 'react'
import { connect } from 'dva'
import { Table, Input, Form, Button, Select, Cascader, Row, Col, Popconfirm } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import { routerRedux } from "dva/router"
import { IP } from "../../constants";

const Option = Select.Option
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.PureComponent {
  state = {
    editing: false,
    userType1: ['LNG加气站', 'L-CNG加气站', 'LNG L-CNG合建站', 'LNG CNG合建站', 'LNG 汽柴油合建站', 'LNG泵船', '其他'],
    userType2: ['电厂', '城市居民', '城市商服', '城市供暖', '工业燃料', '工业原料', '其他', '分布式项目'],
    selectOption: '1'
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({editing}, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const {editing} = this.state;
    if (e.target.className === 'ant-cascader-menu-item ant-cascader-menu-item-expand') return false
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const {record, handleSave} = this.props;
    setTimeout(() => {
      this.form.validateFields((error, values) => {
        if (error) {
          return;
        }
        this.toggleEdit();
        if (values.site_type) {
          handleSave({...record, ...values, user_type: '1'});
        } else {
          handleSave({...record, ...values});
        }

      });
    }, 200)
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        name: targetOption.value,
        targetOption
      }
    })
  }

  selectChange = (value) => {
    const {record, handleSave} = this.props;
    handleSave({...record, site_type: value, user_type: '1'});
  }

  render() {
    const {editing} = this.state;
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
    } = this.props;
    const typeList1 = this.state.userType1.map((type, index) => <Option key={type}
                                                                        value={index + 1 + ''}>{type}</Option>)
    const typeList2 = this.state.userType2.map((type, index) => <Option key={type}
                                                                        value={index + 1 + ''}>{type}</Option>)
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  dataIndex === 'customer_type' ?
                    <FormItem style={{margin: 0}}>
                      {form.getFieldDecorator(dataIndex, {
                        initialValue: record[dataIndex],
                      })(
                        <Select ref={node => (this.input = node)} onClick={this.save} placeholder="请选择客户类型"
                                style={{width: '100%'}}>
                          <Option value="1">终端用户</Option>
                          <Option value="2">贸易商</Option>
                        </Select>
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
                          />
                        )}
                      </FormItem>
                      :
                      dataIndex === 'site_type' ?
                        <FormItem style={{margin: 0}}>
                          {form.getFieldDecorator(dataIndex, {
                            initialValue: record[dataIndex],
                          })(
                            <Select placeholder="请选择站点类型" ref={node => (this.input = node)}
                                    onChange={this.selectChange} style={{width: '100%'}}>
                              <Option value="1">加气站</Option>
                              <Option value="2">气化站</Option>
                            </Select>
                          )}
                        </FormItem>
                        :
                        dataIndex === 'user_type' ?
                          <FormItem style={{margin: 0}}>
                            {form.getFieldDecorator(dataIndex, {
                              initialValue: record[dataIndex],
                            })(
                              <Select ref={node => (this.input = node)} placeholder="请选择用户类型" style={{width: '100%'}}>
                                {record.site_type === '1' ?
                                  typeList1 : typeList2
                                }
                              </Select>
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
                              />
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
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.userChecking.data === undefined) {
      this.props.dispatch(routerRedux.push({
        pathname: '/maintain',
      }))
      return
    }
    this.setState({
      dataSource: [...this.props.userChecking.data.err_arr]
    })
    this.props.dispatch({
      type: 'maintain/fetchOptions',
      payload: {
        name: ''
      }
    })
  }

  handleSave = (row) => {
    if (row.address) {
      row.delivery_province = row.address[0] ? row.address[0] : ''
      row.delivery_city = row.address[1] ? row.address[1] : ''
      row.delivery_area = row.address[2] ? row.address[2] : ''
      delete row.address
    }
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({dataSource: newData});
  }

  recommit = () => {
    this.props.dispatch({
      type: 'maintain/batchCustomer',
      payload: {
        form: this.state.dataSource
      }
    }).then(() => {
      this.setState({
        dataSource: [...this.props.userChecking.data.err_arr]
      })
    })
  }

  goback = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/maintain',
    }))
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({dataSource: dataSource.filter(item => item.key !== key)});
  }

  export = () => {
    this.props.dispatch({
      type: 'maintain/exportUser',
      payload: {
        json: this.state.dataSource
      }
    }).then(() => {
      window.location.href = `${IP}/admin/customer/batch-down-customer-get`
    })
    // window.location.href = `${IP}/admin/customer/batch-down-customer?json_list=${JSON.stringify(this.state.dataSource)}`
  }

  render() {
    const {dataSource} = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = [{
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
      fixed: 'left',
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
        dataIndex: 'customer_name',
        title: '客户名称',
        handleSave: this.handleSave,
      }),
    }, {
      title: '客户类型',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'center',
      width: 120,
      render: (text, record, index) => {
        if (text === '1') {
          return '终端用户'
        } else if (text === '2') {
          return '贸易商'
        } else if (text === '0') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}></div>
        }
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'customer_type',
        title: '客户类型',
        handleSave: this.handleSave,
      }),
    }, {
      title: '客户联系人',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'customer_contact',
        title: '客户联系人',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'customer_mobile',
      key: 'customer_mobile',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        if (text === '' || !text.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'customer_mobile',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '站点简称',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center',
      width: 240,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'site_name',
        title: '站点简称',
        handleSave: this.handleSave,
      }),
    }, {
      title: '站点全称',
      dataIndex: 'full_site_name',
      key: 'full_site_name',
      align: 'center',
      width: 250,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'full_site_name',
        title: '站点全称',
        handleSave: this.handleSave,
      }),
    }, {
      title: '收货联系人1',
      dataIndex: 'delivery_contact1',
      key: 'delivery_contact1',
      align: 'center',
      width: 120,
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'delivery_contact1',
        title: '收货联系人1',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'delivery_mobile1',
      key: 'delivery_mobile1',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        if (text === '' || !text.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'delivery_mobile1',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '收货联系人2',
      dataIndex: 'delivery_contact2',
      key: 'delivery_contact2',
      align: 'center',
      width: 120,
      render: (text, record, index) => {
        if (text === '' || text === null) {
          return '--'
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'delivery_contact2',
        title: '收货联系人2',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'delivery_mobile2',
      key: 'delivery_mobile2',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        if (text === '' || text === null) {
          return '--'
        } else if (!text.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'delivery_mobile2',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 200,
      render: (text, record, index) => {
        if (record.delivery_province === '' || record.delivery_city === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        const adress = record.delivery_province + (record.delivery_city !== 'undefined' ? record.delivery_city : '') + (record.delivery_area !== 'undefined' ? record.delivery_area : '')
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
        dispatch: this.props.dispatch
      }),
    }, {
      title: '详细地址',
      dataIndex: 'detailed_address',
      key: 'detailed_address',
      align: 'center',
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
      title: '站点类型',
      dataIndex: 'site_type',
      key: 'site_type',
      align: 'center',
      width: 120,
      render: (text, record, index) => {
        if (text === '1') {
          return '加气站'
        } else if (text === '2') {
          return '气化站'
        } else if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}></div>
        }
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'site_type',
        title: '站点类型',
        handleSave: this.handleSave,
      }),
    }, {
      title: '用户类型',
      dataIndex: 'user_type',
      key: 'user_type',
      align: 'center',
      width: 120,
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
            return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
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
            return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
          }
        } else {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'user_type',
        title: '用户类型',
        handleSave: this.handleSave,
      }),
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      fixed: 'right',
      width: 150,
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
                            padding: '0 15px'
                          }}>删除</Button>
                </Popconfirm>
              </div>
            ) : null
        );
      },
    }]

    return (
      <div>
        <PageTitle>问题数据处理</PageTitle>
        <div style={{backgroundColor: '#fff'}}>
          <Row type='flex' align='middle' style={{height: 60, padding: 20}}>
            <Col span={12}>本次导入结果： 共导入 <span
              style={{color: '#22DD48'}}>{this.props.userChecking.num ? this.props.userChecking.num.success_num : ''}</span> 条数据； <span
              style={{color: '#EE113D'}}>{this.props.userChecking.num ? this.props.userChecking.num.err_num : ''}</span> 条数据有误，请修改后上传</Col>
            <Col span={12}>
              <div style={{float: 'right'}}>
                <Button type='primary' style={{width: 120}} onClick={this.export}>导出错误数据</Button>
              </div>
            </Col>
          </Row>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            rowKey={record => {
              return record.key + ''
            }}
            bordered
            pagination={false}
            dataSource={dataSource}
            columns={columns}
            scroll={{x: 2600}}
          />
          <Row type="flex" justify="space-around" align="middle" style={{height: 80}}>
            <Col>
              {this.props.userChecking.num ? this.props.userChecking.num.err_num === 0 ?
                <Button type='primary' onClick={this.goback}>返回数据维护列表</Button> :
                <Button type='primary' onClick={this.recommit}>重新导入</Button> : ''
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {userChecking, CascaderOptions} = state.maintain
  return {
    userChecking,
    CascaderOptions,
    loading: state.loading.models.maintain
  }
}

export default connect(mapStateToProps)(EditableTable)
