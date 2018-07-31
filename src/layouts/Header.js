import {connect} from 'dva'
import {Layout, Menu, Icon} from 'antd'
// import Link from 'umi/link'
import styles from './index.css'
import images from '../utils/images'

const {Header} = Layout

function MyHeader({dispatch, location, collapsed}) {
  function toggle() {
    dispatch({
      type: 'collapsed/change',
      payload: {collapsed: !collapsed}
    })
  }

  function logout() {
    if (location.pathname === '/backstage' || location.pathname === '/maintain' || location.pathname === '/permission') {
      dispatch({type: 'login/backlogout'})
    } else {
      dispatch({type: 'login/logout'})
    }
  }

  return (
    <Header className={styles.header}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />
      {location.pathname === '/home' ?
        <img src={images.lchlogo} alt="" width={400} height={50} style={{marginLeft: 20}}/>
        :
        ''
      }
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        className={styles.menu}
      >
        <Menu.Item key="alipay">
          {/*{location.pathname === '/home' ?*/}
          {/*<Link to='/'>*/}
          {/*<Icon type='export'/>管理中心*/}
          {/*</Link>*/}
          {/*:*/}
          {/*<Link to='/home'>*/}
          {/*<Icon type='export'/>返回商城*/}
          {/*</Link>}*/}
          <div onClick={logout}>
            <Icon type="logout"/>退出登录
          </div>
        </Menu.Item>
      </Menu>
    </Header>

  )
}


function mapStateToProps(state) {
  const {collapsed} = state.collapsed
  return {
    collapsed
  }
}

export default connect(mapStateToProps)(MyHeader)
