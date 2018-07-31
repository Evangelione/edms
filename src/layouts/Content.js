import {Layout} from 'antd'
import styles from './index.css'

const {Content} = Layout

function MyContent({location, children}) {
  return (
    <div style={{height: '100%'}}>
      <Content id='layout'
               className={location.pathname === '/login' ? styles.login : location.pathname === '/backstagelogin' ? styles.backstagelogin : styles.content}>
        {children}
      </Content>
      {/*<BackTop visibilityHeight={100} target={() => document.querySelector('#layout')}/>*/}
    </div>

  )
}

export default MyContent
