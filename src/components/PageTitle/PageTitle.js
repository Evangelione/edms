import styles from './index.css'

export default ({children}) => {
  return (
    <div className={styles.title}>{children}</div>
  )
}
