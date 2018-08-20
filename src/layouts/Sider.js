import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'
import Link from 'umi/link'
import styles from './index.css'
import { withRouter } from 'react-router'
import userSetting from '../constants'

const {Sider} = Layout;
const SubMenu = Menu.SubMenu

class MySider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
      currentKey: ['']
    }
  }

  rootSubmenuKeys = ['sub1']

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  onSelect = ({key}) => {
    if (key !== 'balance' && key !== 'analysis') {
      this.setState({
        openKeys: []
      })
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({
      currentKey: this.getCurrentTab()
    })
  }

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
    console.log(userSetting.logo)
    const {collapsed} = this.props
    return (
      <Sider trigger={null}
             collapsible
             collapsed={collapsed}>
        {(this.props.location.pathname.indexOf('/backstage') === 0 || this.props.location.pathname.indexOf('/permission') === 0 || this.props.location.pathname.indexOf('/maintain') === 0) ?
          <div>
            <div className={styles.logo} style={{backgroundImage: `url(${userSetting.logo})`}}/>
            <Menu theme="dark"
                  defaultSelectedKeys={this.state.currentKey}
                  mode="inline"
                  openKeys={this.state.openKeys}
                  onSelect={this.onSelect}
                  onOpenChange={this.onOpenChange}>
              {((sessionStorage.getItem('backAuth') & 1) !== 0) ? <Menu.Item key="administrator">
                <Link to='/backstage'/><i className={'iconfont icon-shouye'}></i><span>管理员设置</span>
              </Menu.Item> : ''}
              {((sessionStorage.getItem('backAuth') & 2) !== 0) ? <Menu.Item key="permission">
                <Link to='/permission'/><Icon type="file-text" style={{marginRight: 20}}/><span>用户列表</span>
              </Menu.Item> : ''}
              {((sessionStorage.getItem('backAuth') & 4) !== 0) ? <Menu.Item key="maintain">
                <Link to='/maintain'/><i className={'iconfont icon-iconfont31quanbushangpin'}></i><span>数据维护</span>
              </Menu.Item> : ''}
            </Menu>
          </div>
          :
          <div>
            <div className={styles.logo} style={{backgroundImage: `url(${userSetting.logo})`}}/>
            <Menu theme="dark"
                  defaultSelectedKeys={this.state.currentKey}
                  mode="inline"
                  openKeys={this.state.openKeys}
                  onSelect={this.onSelect}
                  onOpenChange={this.onOpenChange}>
              <Menu.Item key="home">
                <Link to='/'/><i className={'iconfont icon-shouye'}></i><span>首页</span>
              </Menu.Item>
              {((sessionStorage.getItem('loginAuth') & 1) !== 0) ? <Menu.Item key="order">
                <Link to='/order'/><i className={'iconfont icon-tijindingdan'}></i><span>我的订单</span>
              </Menu.Item> : ''}
              {((sessionStorage.getItem('loginAuth') & 2) !== 0) ? <Menu.Item key="logistics">
                <Link to='/logistics'/><i className={'iconfont icon-wuliu'} style={{
                fontSize: 22,
                marginRight: 17,
                marginLeft: '-3px'
              }}></i><span>我的物流</span>
              </Menu.Item> : ''}
              {((sessionStorage.getItem('loginAuth') & 4) !== 0) ? <SubMenu
                key="sub1"
                title={<span><i className={'iconfont icon-zhangdan'}></i><span>我的账务</span></span>}
                style={{marginBottom: 8}}
              >
                <Menu.Item key="balance">
                  <Link to='/account/balance'/>余额管理
                </Menu.Item>
                <Menu.Item key="analysis">
                  <Link to='/account/analysis'/>数据分析
                </Menu.Item>
              </SubMenu> : ''}
              {((sessionStorage.getItem('loginAuth') & 8) !== 0) ? <Menu.Item key="customer">
                <Link to='/customer'/><i className={'iconfont icon-kehuguanli'}></i><span>我的客户</span>
              </Menu.Item> : ''}
              {((sessionStorage.getItem('loginAuth') & 16) !== 0) ? <Menu.Item key="supplier">
                <Link to='/supplier'/><i className={'iconfont icon-iconfont31quanbushangpin'}></i><span>我的供应商</span>
              </Menu.Item> : ''}
              {((sessionStorage.getItem('loginAuth') & 32) !== 0) ? <Menu.Item key="company">
                <Link to='/company'/><i className={'iconfont icon-gongsi'}></i><span>我的公司</span>
              </Menu.Item> : ''}
            </Menu>
          </div>
        }
      </Sider>
    )
  }
}

function mapStateToProps(state) {
  const {collapsed} = state.collapsed
  return {
    collapsed
  }
}

export default connect(mapStateToProps)(withRouter(MySider))
