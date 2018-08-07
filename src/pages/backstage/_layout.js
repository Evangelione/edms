import {connect} from 'dva'
import {Card, Tabs, Button, Input, Table, Pagination} from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import PromptModal from '../../components/PromptModal/PromptModal'
import OperateUser from './operateUser'
import {routerRedux} from 'dva/router'
import {PAGE_SIZE} from '../../constants'
import * as dateUtils from '../../utils/getTime'

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {list, total, page, currentTab, find_auth, find_str} = state.backstage
  return {
    list,
    page,
    total,
    currentTab,
    find_auth,
    find_str,
    loading: state.loading.models.backstage
  }
}

export default connect(mapStateToProps)(({dispatch, location, list, page, total, loading, currentTab, find_auth, find_str}) => {
  function editUser(type, record) {
    dispatch({
      type: 'backstage/save',
      payload: {editForm: record}
    })
    dispatch(routerRedux.push({
      pathname: '/backstage/operateUser',
      query: {type: type}
    }))
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/backstage',
      query: {
        page,
        find_str
      }
    }))
  }

  function iptSearch(value) {
    dispatch({
      type: 'backstage/fetch',
      payload: {
        find_str: value,
        find_auth: find_auth
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
    align: 'center',
    render: (text, record, index) => {
      if (text === '1') {
        return '超级管理员'
      } else if (text === '2') {
        return '普通管理员'
      }
    }
  }, {
    title: '创建时间',
    dataIndex: 'creation_time',
    key: 'creation_time',
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
  }, {
    title: '操作',
    align: 'center',
    key: 'createdAt',
    render: (text, record, index) => {
      return (
        <div className='operating'>
          <Button className='blueBorder' onClick={editUser.bind(null, 'edit', record)}
                  size='small'>编辑</Button>
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
            <div>
              {record.role === '1' ?
                <Button type='primary' size='small' disabled>禁用</Button>
                :
                <PromptModal state='disableAccount' id={record.id} type='禁用'>
                  <Button style={{background: '#EA7878', borderColor: '#EA7878'}} type='primary'
                          size='small'>禁用</Button>
                </PromptModal>}
            </div>
            :
            <PromptModal state='disableAccount' id={record.id} type='启用'>
              <Button style={{background: '#59C694', borderColor: '#59C694'}} type='primary' size='small'>启用</Button>
            </PromptModal>
          }
        </div>
      )
    }
  }]
  return (
    <div>
      {location.pathname === '/backstage' ?
        <div>
          <PageTitle>管理员设置</PageTitle>
          <div className='searchBox'>
            <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                    onSearch={iptSearch}
            />
          </div>
          <Card>
            <Tabs>
              <TabPane tab="管理员设置" key='1'>
                <div className='toolBar'>
                  <Button className='blueBorder' icon="plus"
                          onClick={editUser.bind(null, 'insert')}>新增管理员</Button>
                </div>
                <Table
                  columns={columns}
                  dataSource={list}
                  rowKey={record => record.id}
                  pagination={false}
                  loading={loading}
                ></Table>
                <Pagination
                  className='ant-table-pagination'
                  total={total}
                  current={page}
                  pageSize={PAGE_SIZE}
                  onChange={pageChangeHandler}
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>
        :
        location.pathname === '/backstage/operateUser' ?
          <OperateUser></OperateUser>
          : ''
      }
    </div>
  )
})


