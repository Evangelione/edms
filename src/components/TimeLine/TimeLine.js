import {Timeline, Icon} from 'antd'
import styles from './timeline.css'
import ImageModal from '../../components/ImageModal/ImageModal'

export default ({pending, detail}) => {

  // 正则匹配时间
  const year = /[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))/g
  const time = /(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?/g
  return (
    <Timeline className={styles.aim} pending={pending} reverse={true}
              style={{marginLeft: 140, marginTop: 40, color: '#A1A9B3'}}>
      {(detail.deliver_status - 0) >= 1?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.TopText}>{detail.create_time.match(time)}</div>
            <div className={styles.bottomText}>{detail.create_time.match(year)}</div>
          </div>
          <div>
            <div className={styles.topText} style={{position: 'absolute', top: 15}}>待调度</div>
          </div>
        </Timeline.Item> : ''
      }
      {(detail.deliver_status - 0) >= 2 ?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.TopText}>{detail.dispatch_time.match(time)}</div>
            <div className={styles.bottomText}>{detail.dispatch_time.match(year)}</div>
          </div>
          <div>
            <div className={styles.topText}>待接单</div>
            <div className={styles.bottomText}>
              <div>调度员：{detail.dispatch_name}</div>
              <div>联系电话：{detail.dispatch_mobile}</div>
            </div>
          </div>
        </Timeline.Item> : ''
      }
      {(detail.deliver_status - 0) >= 3 ?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.TopText}>{detail.take_time.match(time)}</div>
            <div className={styles.bottomText}>{detail.take_time.match(year)}</div>
          </div>
          <div>
            <div className={styles.topText}>已接单</div>
            <div className={styles.bottomText}>
              <div>司机：{detail.driver_name}</div>
              <div>联系电话：{detail.driver_mobile}</div>
            </div>
          </div>
        </Timeline.Item> : ''
      }
      {(detail.deliver_status - 0) >= 4 ?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.TopText}>{detail.load_time.match(time)}</div>
            <div className={styles.bottomText}>{detail.load_time.match(year)}</div>
          </div>
          <div>
            <div className={styles.topText}>已装车</div>
            <div className={styles.bottomText}>
              <div>装车量：{detail.load_num}</div>
              <div>
                <ImageModal imgUrl={detail.load_url} title='装车磅票'>
                  <Icon type="file-text"/> 查看装车磅票
                </ImageModal>
              </div>
            </div>
          </div>
        </Timeline.Item>
        : ''
      }
      {(detail.deliver_status - 0) >= 4 ?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.TopText}>--</div>
          </div>
          <div style={{paddingTop: 50}}>
            <div className={styles.topText} style={{position: 'absolute', top: '12px'}}>运输中</div>
          </div>
        </Timeline.Item> : ''
      }
      {(detail.deliver_status - 0) >= 5 ?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.TopText}>{detail.unload_time.match(time)}</div>
            <div className={styles.bottomText}>{detail.unload_time.match(year)}</div>
          </div>
          <div>
            <div className={styles.topText}>已卸车</div>
            <div className={styles.bottomText}>
              <div>卸车量：{detail.unload_num}</div>
              <div>
                <ImageModal imgUrl={detail.unload_url} title='卸车磅票'>
                  <Icon type="file-text"/> 查看卸车磅票
                </ImageModal>
              </div>
            </div>
          </div>
        </Timeline.Item> : ''
      }
      {(detail.deliver_status - 0) >= 6 ?
        <Timeline.Item>
          <div className={styles.leftPosition}>
            <div className={styles.topText}>{detail.finish_time.match(time)}</div>
            <div className={styles.bottomText}>{detail.finish_time.match(year)}</div>
          </div>
          <div style={{paddingTop: 5}}>
            <div className={styles.topText}>已完成</div>
            <div className={styles.bottomText}>
              <div>调度员：{detail.dispatch_name}</div>
              <div>联系电话：{detail.dispatch_mobile}</div>
            </div>
          </div>
        </Timeline.Item> : ''
      }
    </Timeline>
  )
}
