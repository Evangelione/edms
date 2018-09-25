import React from 'react'
import { connect } from 'dva'
import { Table, Input, Form, Button, Row, Col, Popconfirm } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import { routerRedux } from "dva/router"
import { IP } from "../../constants";

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
        handleSave({...record, ...values});
      });
    }, 200)
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
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
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
    if (this.props.vehicleChecking.data === undefined) {
      this.props.dispatch(routerRedux.push({
        pathname: '/maintain',
      }))
      return
    }
    this.setState({
      dataSource: [...this.props.vehicleChecking.data.err_arr]
    })
  }

  handleSave = (row) => {
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
      type: 'maintain/batchVehicle',
      payload: {
        form: this.state.dataSource
      }
    }).then(() => {
      this.setState({
        dataSource: [...this.props.vehicleChecking.data.err_arr]
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
      type: 'maintain/exportVehicle',
      payload: {
        json: this.state.dataSource
      }
    }).then(() => {
      window.location.href = `${IP}/admin/car/batch-down-car-get`
    })
    // window.location.href = `${IP}/admin/car/batch-down-car?json_list=${JSON.stringify(this.state.dataSource)}`
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
      title: '物流公司',
      dataIndex: 'logistic_company',
      key: 'logistic_company',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'logistic_company',
        title: '物流公司',
        handleSave: this.handleSave,
      }),
    }, {
      title: '物流公司联系人',
      dataIndex: 'logistic_contact',
      key: 'logistic_contact',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'logistic_contact',
        title: '物流公司联系人',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'logistic_mobile',
      key: 'logistic_mobile',
      align: 'center',
      render: (text, record, index) => {
        if (text === '' || !text.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'logistic_mobile',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '车头牌照',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'car_head',
        title: '车头牌照',
        handleSave: this.handleSave,
      }),
    }, {
      title: '车挂牌照',
      dataIndex: 'car_body',
      key: 'car_body',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'car_body',
        title: '车挂牌照',
        handleSave: this.handleSave,
      }),
    }, {
      title: '限定载重(吨)',
      dataIndex: 'rated_load',
      key: 'rated_load',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'rated_load',
        title: '限定载重(吨)',
        handleSave: this.handleSave,
      }),
    }, {
      title: '司机姓名',
      dataIndex: 'driver',
      key: 'driver',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'driver',
        title: '司机姓名',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'driver_mobile',
      key: 'driver_mobile',
      align: 'center',
      render: (text, record, index) => {
        if (text === '' || !text.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'driver_mobile',
        title: '联系电话',
        handleSave: this.handleSave,
      }),
    }, {
      title: '押运员',
      dataIndex: 'supercargo',
      key: 'supercargo',
      align: 'center',
      render: (text, record, index) => {
        if (text === '') {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'supercargo',
        title: '押运员',
        handleSave: this.handleSave,
      }),
    }, {
      title: '联系电话',
      dataIndex: 'supercargo_mobile',
      key: 'supercargo_mobile',
      align: 'center',
      render: (text, record, index) => {
        if (text === '' || !text.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')) {
          return <div style={{border: '1px solid #EE113D', width: '100%', height: 21}}>{text}</div>
        }
        return text
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'supercargo_mobile',
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
              style={{color: '#22DD48'}}>{this.props.vehicleChecking.num ? this.props.vehicleChecking.num.success_num : ''}</span> 条数据； <span
              style={{color: '#EE113D'}}>{this.props.vehicleChecking.num ? this.props.vehicleChecking.num.err_num : ''}</span> 条数据有误，请修改后上传</Col>
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
          />
          <Row type="flex" justify="space-around" align="middle" style={{height: 80}}>
            <Col>
              {this.props.vehicleChecking.num ? this.props.vehicleChecking.num.err_num === 0 ?
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
  const {vehicleChecking, CascaderOptions} = state.maintain
  return {
    vehicleChecking,
    CascaderOptions,
    loading: state.loading.models.maintain
  }
}

export default connect(mapStateToProps)(EditableTable)
