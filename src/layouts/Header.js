import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'
import styles from './index.css'

const {Header} = Layout

function MyHeader({dispatch, location, currentPageName}) {
  // function toggle() {
  //   dispatch({
  //     type: 'collapsed/change',
  //     payload: {collapsed: !collapsed}
  //   })
  // }

  function logout() {
    if (location.pathname.indexOf('/backstage') === 0 || location.pathname.indexOf('/permission') === 0 || location.pathname.indexOf('/maintain') === 0) {
      dispatch({type: 'login/backlogout'})
    } else {
      dispatch({type: 'login/logout'})
    }
  }

  function getCurrentPageName() {
    return currentPageName
  }

  return (
    <Header className={styles.header}>
      {/*<Icon*/}
      {/*className={styles.trigger}*/}
      {/*type={collapsed ? 'menu-unfold' : 'menu-fold'}*/}
      {/*onClick={toggle}*/}
      {/*/>*/}
      <span style={{paddingLeft: 20, fontSize: 18, fontWeight: 600, color: '#545F76'}}>{getCurrentPageName()}</span>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        className={styles.menu}
      >
        <Menu.Item key="alipay">
          <div onClick={logout} style={{color: '#545f76'}}>
            <Icon type="logout"/>退出登录
          </div>
        </Menu.Item>
      </Menu>
      {(location.pathname.indexOf('/backstage') === 0 || location.pathname.indexOf('/permission') === 0 || location.pathname.indexOf('/maintain') === 0) ?
        <div className={styles.user}>
          <div className={styles.avatar}>
            <img
              src={JSON.parse(sessionStorage.getItem('adminData')) ? JSON.parse(sessionStorage.getItem('adminData')).head_img : ''}
              alt=""/>
          </div>
          <div
            style={{display: 'inline-block'}}>{JSON.parse(sessionStorage.getItem('adminData')) ? JSON.parse(sessionStorage.getItem('adminData')).name : ''}</div>
        </div> :
        <div className={styles.user}>
          <div className={styles.avatar}>
            <img
              src={JSON.parse(sessionStorage.getItem('userData')) ? JSON.parse(sessionStorage.getItem('userData')).head_img : ''}
              alt=""/>
          </div>
          <div
            style={{display: 'inline-block'}}>{JSON.parse(sessionStorage.getItem('userData')) ? JSON.parse(sessionStorage.getItem('userData')).name : ''}</div>
        </div>
      }
    </Header>

  )
}


function mapStateToProps(state) {
  const {collapsed, currentPageName} = state.collapsed
  return {
    collapsed,
    currentPageName,
  }
}

export default connect(mapStateToProps)(MyHeader)
