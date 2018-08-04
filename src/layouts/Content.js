import React from 'react'
import {Layout} from 'antd'
import styles from './index.css'

const {Content} = Layout

class MyContent extends React.Component {

  UNSAFE_componentWillReceiveProps(nextProps){
    //当路由切换时
    if(this.props.location !== nextProps.location){
      document.getElementById('scrollTop').scrollIntoView(true);//为ture返回顶部，false为底部
    }
  }

  render() {
    const {location, children} = this.props
    return (
      <div style={{height: '100%'}} id='scrollTop'>
        <Content id='layout'
                 className={location.pathname === '/login' ? styles.login : location.pathname === '/admin' ? styles.backstagelogin : styles.content}>
          {children}
        </Content>
        {/*<BackTop visibilityHeight={100} target={() => document.querySelector('#layout')}/>*/}
      </div>
    )
  }
}

export default MyContent
