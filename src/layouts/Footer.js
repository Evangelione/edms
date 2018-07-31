import { Layout } from 'antd'
import styles from './index.css'

const {Footer} = Layout

function MyFooter() {
  return (
    <Footer className={styles.footer}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
  )
}

export default MyFooter
