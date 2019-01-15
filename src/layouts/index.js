import { Layout } from 'antd'
import styles from './index.css'
import MySider from './Sider'
import MyHeader from './Header'
import MyContent from './Content'
// import MyFooter from './Footer'
import withRouter from 'umi/withRouter'

function MyLayout({children, location}) {
  if (location.pathname === '/login') {
    return (
      <Layout className={styles.scrollLayout}>
        <MyContent location={location} children={children}/>
      </Layout>
    )
  } else if (location.pathname === '/admin') {
    return (
      <Layout className={styles.scrollLayout}>
        <MyContent location={location} children={children}/>
      </Layout>
    )
  }
  return (
    <Layout className={styles.layout}>
      <MySider/>
      <Layout style={{position: 'relative'}}>
        <MyHeader location={location}/>
        <MyContent location={location} children={children}/>
        {/*<MyFooter></MyFooter>*/}
      </Layout>
    </Layout>
    // <div className={styles.normal}>
    //   <Header location={location}></Header>
    //   <div className={styles.content}>
    //     <div className={styles.main}>
    //       {children}
    //     </div>
    //   </div>
    // </div>
  )
}

export default withRouter(MyLayout)
