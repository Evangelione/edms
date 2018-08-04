import React from 'react'
import {Layout} from 'antd'
import styles from './index.css'

const {Content} = Layout

class MyContent extends React.Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }

  render() {
    const {location, children} = this.props
    return (
      <div style={{height: '100%'}} ref={node => this.node = node}>
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
