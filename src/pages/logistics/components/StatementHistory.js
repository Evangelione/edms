import React, { Component } from 'react'
import { Button, Table, Form, Pagination, Modal, Input, DatePicker, AutoComplete, Dropdown, Select, Menu } from 'antd'
import { PAGE_SIZE } from '../../../constants'
import { REGS } from '../../../common/constants'
import { connect } from 'dva'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const FormItem = Form.Item
const {RangePicker} = DatePicker
const Option = Select.Option

class StatementHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modaltype: '',
    }
  }

  render() {
    const {historylist, historypage, historytotal, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const {visible, modaltype} = this.state
    const columns = [{
      title: '对账时间',
      dataIndex: 'logistics_company',
      key: 'logistics_company',
      align: 'center',
    }, {
      title: '客户',
      dataIndex: 'logistics_contact',
      key: 'logistics_contact',
      align: 'center',
    }, {
      title: '气源',
      dataIndex: 'logistics_mobile',
      key: 'logistics_mobile1',
      align: 'center',
    }, {
      title: '站点',
      dataIndex: 'logistics_mobile',
      key: 'logistics_mobile2',
      align: 'center',
    }, {
      title: '对账周期',
      dataIndex: 'logistics_mobile',
      key: 'logistics_mobile21',
      align: 'center',
    }, {
      title: '订单数量',
      dataIndex: 'logistics_mobile',
      key: 'logistics_mobile22',
      align: 'center',
    }, {
      title: '对账总额(元)',
      dataIndex: 'logistics_mobile',
      key: 'logistics_mobile3',
      align: 'center',
    }, {
      title: '对账状态',
      dataIndex: 'logistics_mobile',
      key: 'logistics_mobile6',
      align: 'center',
    }, {
      title: '操作',
      align: 'center',
      key: 'createdAt',
      render: (text, record, index) => {
        return (
          <div>
            <Button className='blueBorder' onClick={this.editModal.bind(null, record)}
                    size='small'>编辑</Button>
            {/*<PromptModal state='deleteOne' delType='user' delID={record.id}>*/}
            {/*<Button type='primary' size='small'*/}
            {/*style={{*/}
            {/*background: '#EA7878',*/}
            {/*borderColor: '#EA7878',*/}
            {/*marginLeft: 10,*/}
            {/*height: 28,*/}
            {/*padding: '0 15px',*/}
            {/*}}>删除</Button>*/}
            {/*</PromptModal>*/}
          </div>
        )
      },
    }]
    const menu = (
      <Menu>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <div style={{position: 'absolute', top: 10, right: 32, fontSize: '1rem'}}>
          <RangePicker locale={locale} style={{width: 200, marginRight: 10}}/>
          <span>选择客户</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}} placeholder='请输入对账客户名称'/>
          <Dropdown overlay={menu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择气源</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}} placeholder='请输入对账气源名称'/>
          <Dropdown overlay={menu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择站点</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}} placeholder='请输入对账站点名称'/>
          <Dropdown overlay={menu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择订单</span>
          <Select defaultValue="1" style={{fontSize: '1rem', marginLeft: 10}}>
            <Option value="1" style={{color: '#4A4A4A'}}>全部</Option>
            <Option value="2" style={{color: '#8897BD'}}>待对账</Option>
            <Option value="3" style={{color: '#3477ED'}}>对账中</Option>
            <Option value="4" style={{color: '#60C899'}}>已对账</Option>
            <Option value="5" style={{color: '#F7772A'}}>已开票</Option>
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
        <Modal title={`${modaltype}物流`}
               cancelText='取消'
               okText='提交'
               visible={visible}
               onOk={this.submit}
               onCancel={this.toggleModal}
               confirmLoading={loading}
               maskClosable={false}>
          <Form>
            <FormItem
              label="物流公司"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('logistics_company', {
                rules: [{required: true, message: '请输入物流公司', pattern: REGS.name}],
              })(
                <Input placeholder='请输入物流公司'/>,
              )}
            </FormItem>
            <FormItem
              label="联系人"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('logistics_contact', {
                rules: [{required: true, message: '请输入联系人', pattern: REGS.name}],
              })(
                <Input placeholder='请输入联系人'/>,
              )}
            </FormItem>
            <FormItem
              label="联系方式"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('logistics_mobile', {
                rules: [{required: true, message: '请输入联系方式', pattern: REGS.phone}],
              })(
                <Input placeholder='请输入联系方式'/>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {historylist, historypage, historytotal} = state.logistics
  return {
    historylist,
    historypage,
    historytotal,
    loading: state.loading.models.logistics,
  }
}

export default Form.create()(connect(mapStateToProps)(StatementHistory))
