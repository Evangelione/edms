import React from 'react'
import { connect } from 'dva'
import styles from './index.css'
import images from '../utils/images'
import { Row, Col } from 'antd'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map' //引入地图
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import 'echarts/map/js/china' // 引入中国地图
// import ReactEcharts from 'echarts-for-react'
import CountUp from 'react-countup'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.initMap()
  }

  componentDidUpdate() {
    // this.initMap()
  }

  // initMap = () => {
  //   const option = this.props.options //外部传入的data数据
  //   let myChart = echarts.init(this.refs.echart) //初始化echarts
  //
  //   //设置options
  //   myChart.setOption(option)
  //   window.onresize = function () {
  //     myChart.resize()
  //   }
  //   myChart.resize()
  // }

  render() {
    const {count} = this.props
    const {width = "100%", height = "540px"} = this.props
    return (
      <div>
        <Row>
          <Col className={'pageName'}>首页</Col>
        </Row>
        <Row className={styles.dashBoard} gutter={24}>
          <Col span={6}>
            <div>
              <img className={styles.dashImg} src={images.dajiedan2} alt="" width={36} height={40}/>
              <div className={styles.dashTitle}>累计成交订单</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={123} duration={3}/>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <img className={styles.dashImg} src={images.dajiedan2} alt="" width={36} height={40}/>
              <div className={styles.dashTitle}>累计销售量(吨)</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={4444} duration={3}/>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <img className={styles.dashImg} src={images.dajiedan2} alt="" width={36} height={40}/>
              <div className={styles.dashTitle}>累计销售金额</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={1512} duration={3}/>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <img className={styles.dashImg} src={images.dajiedan2} alt="" width={36} height={40}/>
              <div className={styles.dashTitle}>累计客户数量</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={6423} duration={3}/>
              </div>
            </div>
          </Col>
        </Row>
        <Row className={styles.contentBox} gutter={24}>
          <Col span={18}>
              <div ref='echart' style={{width, height}}>
                {/*<ReactEcharts*/}
                {/*option={options}*/}
                {/*style={{height: 501}}/>*/}
                {/*<ReactEchartsCore echarts={echarts} option={options} notMerge={true}*/}
                {/*lazyUpdate={true}*/}
                {/*></ReactEchartsCore>*/}
              </div>
          </Col>
          <Col span={6} className={styles.detailBox}>
            <Col>
              <img src={images.daichuli} alt="" className={styles.boxImg}/>
              <div className={styles.boxCount}>
                <CountUp start={0} end={6234} duration={3}/>
              </div>
              <div className={styles.boxText}>待确认订单</div>
            </Col>
            <Col>
              <img src={images.daishenhe} alt="" className={styles.boxImg}/>
              <div className={styles.boxCount}>
                <CountUp start={0} end={234} duration={3}/>
              </div>
              <div className={styles.boxText}>待结算订单</div>
            </Col>
            <Col>
              <img src={images.daichulichuche} alt="" className={styles.boxImg}/>
              <div className={styles.boxCount}>
                <CountUp start={0} end={5234} duration={3}/>
              </div>
              <div className={styles.boxText}>待发货运单</div>
            </Col>
            <Col>
              <img src={images.daichuliyundan} alt="" className={styles.boxImg}/>
              <div className={styles.boxCount}>
                <CountUp start={0} end={2234} duration={3}/>
              </div>
              <div className={styles.boxText}>待审核账号</div>
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {options, count} = state.echart
  return {
    options,
    count,
    loading: state.loading.models.users
  }
}

IndexPage.propTypes = {}

export default connect(mapStateToProps)(IndexPage)
