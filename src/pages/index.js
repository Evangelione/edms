import React from 'react'
import {connect} from 'dva'
import styles from './index.css'
import {Row, Col, Divider, Progress, Radio} from 'antd'
import classNames from 'classnames'
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

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '1'
    }
  }

  componentDidMount() {
    // this.initChart()
    let that = this
    fetch('mapData').then(function (response) {
      response.json().then(function (data) {
        console.log(data)
        that.initBmp(data)
      })
    }).catch(function (e) {
      console.log("Oops, error")
    })
  }

  topRadioChange = (e) => {
    this.setState({
      status: e.target.value
    })
    this.props.dispatch({
      type: 'home/count',
      payload: {
        flag: e.target.value
      }
    })
  }

  customerRadioChange = (e) => {
    this.props.dispatch({
      type: 'home/customerPer',
      payload: {
        flag: e.target.value
      }
    })
  }

  supplierRadioChange = (e) => {
    this.props.dispatch({
      type: 'home/supplierPer',
      payload: {
        flag: e.target.value
      }
    })
  }

  initChart = () => {
    const option = this.props.options //外部传入的data数据
    let myChart = echarts.init(this.refs.echart) //初始化echarts

    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
    myChart.resize()
  }

  initBmp = ({allData}) => {
    let myChart = echarts.init(this.refs.echartMap)
    let option = {
      backgroundColor: '#404a59',
      legend: {
        show: false,
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['地点', '线路'],
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#404a59'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: [{
        name: '地点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          emphasis: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: 2,
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            color: '#46bee9'
          }
        },
        data: allData.citys
      }, {
        name: '线路',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        large: true,
        effect: {
          show: true,
          constantSpeed: 30,
          symbol: 'pin',
          symbolSize: 3,
          trailLength: 0,
        },
        lineStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0, color: '#58B3CC'
            }, {
              offset: 1, color: '#F58158'
            }], false),
            width: 1,
            opacity: 0.2,
            curveness: 0.1
          }
        },
        data: allData.moveLines
      }]
    };
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
    myChart.resize()
  }

  render() {
    const {count, customerPer, supplierPer, logistics, trend} = this.props
    const {width = "100%", height = "540px"} = this.props
    const customerDivs = customerPer.map((val) => {
      return <div>
        <div style={{color: '#ACB4BF', fontSize: 14}}>{val.customer_name}</div>
        <div style={{width: '75%', display: 'inline-block'}}>
          <Progress percent={val.percent - 0} status="active" showInfo={false} strokecolor='#569EF2' strokeWidth={6}/>
        </div>
        <div style={{width: '25%', display: 'inline-block', textAlign: 'center'}}>
          <div style={{display: 'inline-block', color: '#A1A9B3', fontSize: 14, marginRight: 26}}>{val.sale_num} 吨</div>
          <div style={{display: 'inline-block', color: '#545F76', fontSize: 14}}>76.8%</div>
        </div>
      </div>
    })
    const supplierDivs = supplierPer.map((val) => {
      return <div>
        <div style={{color: '#ACB4BF', fontSize: 14}}>{val.supp_name}</div>
        <div style={{width: '75%', display: 'inline-block'}}>
          <Progress percent={val.percent - 0} status="active" showInfo={false} strokecolor='#569EF2' strokeWidth={6}/>
        </div>
        <div style={{width: '25%', display: 'inline-block', textAlign: 'center'}}>
          <div style={{display: 'inline-block', color: '#A1A9B3', fontSize: 14, marginRight: 26}}>{val.load_num} 吨</div>
          <div style={{display: 'inline-block', color: '#545F76', fontSize: 14}}>76.8%</div>
        </div>
      </div>
    })
    return (
      <div>
        <Row>
          <Col className={'pageName'}>首页</Col>
          <div style={{position: 'absolute', top: 0, right: 0}}>
            <RadioGroup onChange={this.topRadioChange} defaultValue="1">
              <RadioButton value="1" style={{color: '#ACB4BF'}}>今日</RadioButton>
              <RadioButton value="2" style={{color: '#ACB4BF'}}>本周</RadioButton>
              <RadioButton value="3" style={{color: '#ACB4BF'}}>本月</RadioButton>
              <RadioButton value="4" style={{color: '#ACB4BF'}}>全部</RadioButton>
            </RadioGroup>
          </div>
        </Row>
        <Row className={styles.dashBoard} gutter={24}>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-chudan"]}></div>
              <div className={styles.dashTitle}>今日出单数</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={count.order_num} duration={3}/>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div className={styles.percentage}>-4.37%</div>
                  <div className={styles.toBottom}>↓</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-xiaoshouliang"]}></div>
              <div className={styles.dashTitle}>今日销售量 (吨)</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={4444} duration={3}/>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div className={styles.percentage}>-4.37%</div>
                  <div className={styles.toBottom}>↓</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-xiaoshoue"]}></div>
              <div className={styles.dashTitle}>今日销售额 (元)</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={1512} duration={3}/>
                <div className={styles.wan}>万</div>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div className={styles.percentage}>-4.37%</div>
                  <div className={styles.toBottom}>↓</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-caigoue"]}></div>
              <div className={styles.dashTitle}>今日采购额 (元)</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={6423} duration={3}/>
                <div className={styles.wan}>万</div>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div className={styles.percentage}>-4.37%</div>
                  <div className={styles.toBottom}>↓</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-yingkui"]}></div>
              <div className={styles.dashTitle}>今日盈亏</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={6423} duration={3}/>
                <div className={styles.wan}>万</div>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div className={styles.percentage}>-4.37%</div>
                  <div className={styles.toBottom}>↓</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
        </Row>
        <div className={styles.contentBox}>
          <div style={{width: '54%', display: 'inline-block'}}>
            <div style={{margin: '0 20px'}}>销售与采购价格趋势图</div>
            <Divider></Divider>
            <div ref='echart' style={{width, height}}>
              {/*<ReactEcharts*/}
              {/*option={options}*/}
              {/*style={{height: 501}}/>*/}
              {/*<ReactEchartsCore echarts={echarts} option={options} notMerge={true}*/}
              {/*lazyUpdate={true}*/}
              {/*></ReactEchartsCore>*/}
            </div>
          </div>
          <div style={{
            width: '44%',
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '2%',
            position: 'relative'
          }}>
            <div style={{margin: '0 20px'}}>实时物流</div>
            <div style={{
              position: 'absolute',
              right: '36px',
              top: '24px',
              color: '#A1A9B3',
              fontSize: 14
            }}>在线车辆：{logistics.length}
            </div>
            <Divider></Divider>
            <div style={{margin: '15px 10px 0px 10px'}}>
              <div ref='echartMap' style={{width, height}}></div>
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          <div style={{
            width: '49%',
            display: 'inline-block',
            marginRight: '2%',
            position: 'relative',
            verticalAlign: 'top'
          }}>
            <div style={{margin: '0 20px'}}>我的客户 (销量占比)</div>
            <div style={{position: 'absolute', top: 15, right: 20}}>
              <RadioGroup onChange={this.customerRadioChange} defaultValue="1">
                <RadioButton className={styles.btnBefore} value="1"
                             style={{color: '#ACB4BF', border: 'none'}}>今日</RadioButton>
                <RadioButton className={styles.btnBefore} value="2"
                             style={{color: '#ACB4BF', border: 'none'}}>本周</RadioButton>
                <RadioButton className={styles.btnBefore} value="3"
                             style={{color: '#ACB4BF', border: 'none'}}>本月</RadioButton>
                <RadioButton className={styles.btnBefore} value="4"
                             style={{color: '#ACB4BF', border: 'none'}}>全部</RadioButton>
              </RadioGroup>
            </div>
            <Divider></Divider>
            <div className={styles.barBox}>
              {customerDivs}
            </div>
          </div>
          <div style={{width: '49%', display: 'inline-block', position: 'relative', verticalAlign: 'top'}}>
            <div style={{margin: '0 20px'}}>我的供应商 (采购量占比)</div>
            <div style={{position: 'absolute', top: 15, right: 20}}>
              <RadioGroup onChange={this.supplierRadioChange} defaultValue="1">
                <RadioButton className={styles.btnBefore} value="1"
                             style={{color: '#ACB4BF', border: 'none'}}>今日</RadioButton>
                <RadioButton className={styles.btnBefore} value="2"
                             style={{color: '#ACB4BF', border: 'none'}}>本周</RadioButton>
                <RadioButton className={styles.btnBefore} value="3"
                             style={{color: '#ACB4BF', border: 'none'}}>本月</RadioButton>
                <RadioButton className={styles.btnBefore} value="4"
                             style={{color: '#ACB4BF', border: 'none'}}>全部</RadioButton>
              </RadioGroup>
            </div>
            <Divider></Divider>
            <div className={styles.barBox}>
              {supplierDivs}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {options} = state.echart
  const {count, customerPer, supplierPer, logistics, trend} = state.home
  return {
    options,
    count,
    customerPer,
    supplierPer,
    logistics,
    trend,
    loading: state.loading.models.home
  }
}

IndexPage.propTypes = {}

export default connect(mapStateToProps)(IndexPage)
