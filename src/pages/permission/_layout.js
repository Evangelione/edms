import React from 'react'
import { Card, Tabs, Button, Input, Table, Pagination } from 'antd'
import { connect } from 'dva'
import PageTitle from '../../components/PageTitle/PageTitle'
import PromptModal from '../../components/PromptModal/PromptModal'
import OperateUser from './operateUser'
import { routerRedux } from 'dva/router'
import { PAGE_SIZE } from "../../constants";

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {list, total, page, currentTab, find_auth, find_str} = state.permission
  return {
    list,
    page,
    total,
    currentTab,
    find_auth,
    find_str,
    loading: state.loading.models.permission
  }
}

export default connect(mapStateToProps)(({dispatch, location, list, page, total, loading, currentTab, find_auth, find_str}) => {

  function changeClass(type, auth) {
    if (loading) return false
    dispatch({
      type: 'permission/save',
      payload: {currentTab: type}
    })
    dispatch({
      type: 'permission/fetch',
      payload: {
        find_auth: auth,
        find_str
      }
    })
  }

  function editUser(type, record) {
    dispatch({
      type: 'permission/save',
      payload: {editForm: record}
    })
    dispatch(routerRedux.push({
      pathname: '/permission/operateUser',
      query: {type: type}
    }))
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/permission',
      query: {page}
    }))
  }

  function iptSearch(value) {
    dispatch({
      type: 'permission/fetch',
      payload: {
        find_str: value,
        find_auth
      }
    })
  }


  const columns = [{
    title: '头像',
    dataIndex: 'head_img',
    key: 'head_img',
    align: 'center',
    render: (text, record, index) => {
      return (
        <div className='avatar'>
          <img src={text} alt=''/>
        </div>
      )
    }
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
  }, {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
    align: 'center',
  }, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    align: 'center'
  }, {
    title: '权限',
    dataIndex: 'forbidden',
    key: 'forbidden',
    align: 'center'
  }, {
    title: '创建时间',
    dataIndex: 'creation_time',
    key: 'creation_time',
    align: 'center'
  }, {
    title: '操作',
    align: 'center',
    key: 'createdAt',
    render: (text, record, index) => {
      return (
        <div className={'operating'}>
          <Button className={'blueBorder'} onClick={editUser.bind(null, 'edit', record)}
                  size={'small'}>编辑</Button>
        </div>
      )
    }
  }, {
    title: '状态',
    align: 'center',
    key: 'status1',
    render: (text, record, index) => {
      return (
        <div className={'operating'}>
          {record.forbidden === '1' ?
            <PromptModal state='disableAccount' id={record.id} type='禁用' foruser={true}>
              <Button className={'blueBorder'} size={'small'}>禁用</Button>
            </PromptModal>
            :
            <PromptModal state='disableAccount' id={record.id} type='启用' foruser={true}>
              <Button className={'blueBorder'} size={'small'}>启用</Button>
            </PromptModal>
          }
        </div>
      )
    }
  }]
  return (
    <div>
      {location.pathname === '/permission' ?
        <div>
          <PageTitle>用户权限设置</PageTitle>
          <div className={'searchBox'}>
            <Search style={{width: 200, marginLeft: 10}} placeholder="输入关键字进行查询"
                    onSearch={iptSearch}
            />
          </div>
          <Card>
            <Tabs>
              <TabPane tab="用户权限设置" key='1'>
                <div className={'toolBar'}>
                  <Button className={'blueBorder'} icon="plus" onClick={editUser.bind(null, 'insert')}>新增用户</Button>
                </div>
                <div className={'changeList'}>
                  <div onClick={changeClass.bind(null, 'quanbu', '')}
                       className={currentTab === 'quanbu' ? 'blueBG ' : 'grayBG'}>
                    <span className={currentTab === 'quanbu' ? 'quanbuBlue ' : 'quanbuGray'}></span>
                    <span>全部</span>
                  </div>
                  <div onClick={changeClass.bind(null, 'wodedingdan', '1')}
                       className={currentTab === 'wodedingdan' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'wodedingdan' ? 'daizhifuBlue ' : 'daizhifuGray'}></span>
                    <span>我的订单</span>
                  </div>
                  <div onClick={changeClass.bind(null, 'wodewuliu', '2')}
                       className={currentTab === 'wodewuliu' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'wodewuliu' ? 'daifahuoBlue ' : 'daifahuoGray'}></span>
                    <span>我的物流</span>
                  </div>
                  <div onClick={changeClass.bind(null, 'wodezhangwu', '4')}
                       className={currentTab === 'wodezhangwu' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'wodezhangwu' ? 'daishouhuoBlue ' : 'daishouhuoGray'}></span>
                    <span>我的账务</span>
                  </div>
                  <div onClick={changeClass.bind(null, 'wodekehu', '8')}
                       className={currentTab === 'wodekehu' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'wodekehu' ? 'daijiesuanBlue ' : 'daijiesuanGray'}></span>
                    <span>我的客户</span>
                  </div>
                  <div onClick={changeClass.bind(null, 'wodegongyingshang', '16')}
                       className={currentTab === 'wodegongyingshang' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'wodegongyingshang' ? 'yijiesuanBlue ' : 'yijiesuanGray'}></span>
                    <span>我的供应商</span>
                  </div>
                  <div onClick={changeClass.bind(null, 'wodegongsi', '32')}
                       className={currentTab === 'wodegongsi' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'wodegongsi' ? 'yijiesuanBlue ' : 'yijiesuanGray'}></span>
                    <span>我的公司</span>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
          <Card style={{marginTop: 5}}>
            <Table
              columns={columns}
              dataSource={list}
              rowKey={record => record.id}
              pagination={false}
              loading={loading}
            ></Table>
            <Pagination
              className="ant-table-pagination"
              total={total}
              current={page}
              pageSize={PAGE_SIZE}
              onChange={pageChangeHandler}
            />
          </Card>
        </div>
        :
        location.pathname === '/permission/operateUser' ?
          <OperateUser></OperateUser>
          : ''
      }
    </div>
  )
})
