import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'
import Link from 'umi/link'
import styles from './index.css'
import { withRouter } from 'react-router'
import { LOGO } from '../constants'
// import NProgress from 'nprogress'

const {Sider} = Layout
const SubMenu = Menu.SubMenu

class MySider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
      currentKey: [''],
    }
  }

  rootSubmenuKeys = ['sub1']

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.props.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.props.dispatch({
        type: 'collapsed/save',
        payload: {
          openKeys,
        },
      })
    } else {
      this.props.dispatch({
        type: 'collapsed/save',
        payload: {
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        },
      })
    }
  }

  onSelect = ({key}) => {
    // NProgress.start()
    // NProgress.set(0.2)
    if (key !== 'balance' && key !== 'analysis') {
      this.props.dispatch({
        type: 'collapsed/save',
        payload: {
          openKeys: [],
        },
      })
    }
  }

  // UNSAFE_componentWillMount() {
  //   this.setState({
  //     currentKey: this.getCurrentTab()
  //   })
  // }

  getCurrentTab = () => {
    if (this.props.location.pathname === '/') {
      return ['home']
    } else if (this.props.location.pathname.indexOf('/backstage') === 0) {
      return ['administrator']
    } else if (this.props.location.pathname.indexOf('/permission') === 0) {
      return ['permission']
    } else if (this.props.location.pathname.indexOf('/maintain') === 0) {
      return ['maintain']
    } else if (this.props.location.pathname.indexOf('/order') === 0) {
      return ['order']
    } else if (this.props.location.pathname.indexOf('/logistics') === 0) {
      return ['logistics']
    } else if (this.props.location.pathname.indexOf('/account/balance') === 0) {
      return ['balance']
    } else if (this.props.location.pathname.indexOf('/account/analysis') === 0) {
      return ['analysis']
    } else if (this.props.location.pathname.indexOf('/customer') === 0) {
      return ['customer']
    } else if (this.props.location.pathname.indexOf('/supplier') === 0) {
      return ['supplier']
    } else if (this.props.location.pathname.indexOf('/company') === 0) {
      return ['company']
    } else {
      return ['administrator']
    }
  }

  render() {
    const logo = window.location.hostname.match(/[A-Za-z]+/g)[0]
    const {collapsed} = this.props
    return (
      <Sider trigger={null}
             collapsible
             collapsed={collapsed}>
        {(this.props.location.pathname.indexOf('/backstage') === 0 || this.props.location.pathname.indexOf('/permission') === 0 || this.props.location.pathname.indexOf('/maintain') === 0) ?
          <div>
            <div className={styles.logo} style={{background: `url(${LOGO[logo].logo}) center center no-repeat`}}/>
            <Menu theme="dark"
                  defaultSelectedKeys={this.props.currentKey}
                  selectedKeys={this.props.currentKey}
                  mode="inline"
                  openKeys={this.props.openKeys}
                  onSelect={this.onSelect}
                  onOpenChange={this.onOpenChange}>
              {((localStorage.getItem('backAuth') & 1) !== 0) ? <Menu.Item key="administrator">
                <Link to='/backstage'/><i className={'iconfont icon-shouye'}/><span>企业管理</span>
              </Menu.Item> : ''}
              {((localStorage.getItem('backAuth') & 2) !== 0) ? <Menu.Item key="permission">
                <Link to='/permission'/><Icon type="file-text" style={{marginRight: 20}}/><span>用户列表</span>
              </Menu.Item> : ''}
              {((localStorage.getItem('backAuth') & 4) !== 0) ? <Menu.Item key="maintain">
                <Link to='/maintain'/><i className={'iconfont icon-iconfont31quanbushangpin'}/><span>数据维护</span>
              </Menu.Item> : ''}
            </Menu>
          </div>
          :
          <div>
            <div className={styles.logo} style={{background: `url(${LOGO[logo].logo}) center center no-repeat`}}/>
            <Menu theme="dark"
                  defaultSelectedKeys={this.props.currentKey}
                  selectedKeys={this.props.currentKey}
                  mode="inline"
                  openKeys={this.props.openKeys}
                  onSelect={this.onSelect}
                  onOpenChange={this.onOpenChange}>
              <Menu.Item key="home">
                <Link to='/'/><i className={'iconfont icon-shouye'}/><span>首页</span>
              </Menu.Item>
              {((localStorage.getItem('loginAuth') & 1) !== 0) ? <Menu.Item key="order">
                <Link to='/order'/><i className={'iconfont icon-tijindingdan'}/><span>我的订单</span>
              </Menu.Item> : ''}
              {((localStorage.getItem('loginAuth') & 2) !== 0) ? <Menu.Item key="logistics">
                <Link to='/logistics'/><i className={'iconfont icon-wuliu'} style={{
                fontSize: 22,
                marginRight: 17,
                marginLeft: '-3px',
              }}/><span>我的物流</span>
              </Menu.Item> : ''}
              {((localStorage.getItem('loginAuth') & 4) !== 0) ? <SubMenu
                key="sub1"
                title={<span><i className={'iconfont icon-zhangdan'}/><span>我的账务</span></span>}
                style={{marginBottom: 8}}
              >
                <Menu.Item key="balance">
                  <Link to='/account/balance'/>余额管理
                </Menu.Item>
                <Menu.Item key="analysis">
                  <Link to='/account/analysis'/>数据分析
                </Menu.Item>
              </SubMenu> : ''}
              {((localStorage.getItem('loginAuth') & 8) !== 0) ? <Menu.Item key="customer">
                <Link to='/customer'/><i className={'iconfont icon-kehuguanli'}/><span>我的客户</span>
              </Menu.Item> : ''}
              {((localStorage.getItem('loginAuth') & 16) !== 0) ? <Menu.Item key="supplier">
                <Link to='/supplier'/><i className={'iconfont icon-iconfont31quanbushangpin'}/><span>我的供应商</span>
              </Menu.Item> : ''}
              {((localStorage.getItem('loginAuth') & 32) !== 0) ? <Menu.Item key="company">
                <Link to='/company'/><i className={'iconfont icon-gongsi'}/><span>我的公司</span>
              </Menu.Item> : ''}
            </Menu>
          </div>
        }
      </Sider>
    )
  }
}

function mapStateToProps(state) {
  const {currentKey, openKeys} = state.collapsed
  return {
    currentKey,
    openKeys,
  }
}

export default connect(mapStateToProps)(withRouter(MySider))
