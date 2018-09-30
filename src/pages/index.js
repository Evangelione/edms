import React from 'react'
import { connect } from 'dva'
import styles from './index.css'
import { Row, Col, Divider, Progress, Radio, Menu, Dropdown, Button, Icon } from 'antd'
import classNames from 'classnames'
import BMap from 'BMap'
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
import { routerRedux } from 'dva/router'
import * as images from '../utils/images'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '4',
      currentSelect: '近7日',
      topTip: '全部',
      currentCount: '4',
      currentCustomer: '4',
      currentSupplier: '4',
      flag: true,
      map: false
    }
  }

  componentDidMount() {
    if ((this.props.location.pathname.indexOf('/backstage') === 0 || this.props.location.pathname.indexOf('/permission') === 0 || this.props.location.pathname.indexOf('/maintain') === 0)) {
      if (!sessionStorage.getItem('backAuth')) {
        this.props.dispatch(routerRedux.push({
          pathname: '/admin',
        }))
        return false
      }
    } else {
      if (!sessionStorage.getItem('loginAuth')) {
        this.props.dispatch(routerRedux.push({
          pathname: '/login',
        }))
        return false
      }
    }
    this.props.dispatch({
      type: 'home/getHomeMapData'
    }).then(() => {
      this.initBmp()
    })

  }

  topRadioChange = (e) => {
    if (this.props.countLoading) return false
    if (e.target.value === '1') {
      this.setState({
        topTip: '今日'
      })
    } else if (e.target.value === '2') {
      this.setState({
        topTip: '本周'
      })
    } else if (e.target.value === '3') {
      this.setState({
        topTip: '本月'
      })
    } else if (e.target.value === '4') {
      this.setState({
        topTip: '总'
      })
    }
    this.setState({
      status: e.target.value,
      currentCount: e.target.value
    })
    this.props.dispatch({
      type: 'home/count',
      payload: {
        flag: e.target.value
      }
    })
  }

  customerRadioChange = (e) => {
    if (this.props.customerLoading) return false
    this.setState({
      currentCustomer: e.target.value
    })
    this.props.dispatch({
      type: 'home/customerPer',
      payload: {
        flag: e.target.value
      }
    })
  }

  supplierRadioChange = (e) => {
    if (this.props.supplierLoading) return false
    this.setState({
      currentSupplier: e.target.value
    })
    this.props.dispatch({
      type: 'home/supplierPer',
      payload: {
        flag: e.target.value
      }
    })
  }

  chartBtnChange = (e) => {
    this.setState({
      currentSelect: e.item.props.children
    })
    this.props.dispatch({
      type: 'home/trend',
      payload: {
        flag: e.key
      }
    })
  }

  initChart = (chartOption) => {
    if (!Object.keys(this.props.trend).length || !Object.keys(this.refs).length) return false
    if (this.state.flag) {
      this.setState({
        flag: false
      })
      let myChart = echarts.init(this.refs.echart) //初始化echarts
      //设置options
      myChart.setOption(chartOption)
      window.onresize = function () {
        myChart.resize()
      }
      myChart.resize()
    }
  }

  initBmp = () => {
    // !Object.keys(this.props.logistics).length ||
    if (this.state.map) return false
    let map = new BMap.Map('indexMap')
    this.setState({
      map
    })
    map.enableScrollWheelZoom(true)
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5)
    let data = this.props.homeMapData
    let IconCar = new BMap.Icon(require('../assets/image/car_32.png'), new BMap.Size(32, 32))
    for (let i = 0; i < data.length; i++) {
      let point = new BMap.Point(data[i].lng, data[i].lat)
      let mk = new BMap.Marker(point, {icon: IconCar})
      map.addOverlay(mk)
      console.log(mk.openInfoWindow)
      let label = new BMap.Label(data[i].car_head, {offset: new BMap.Size(-18, -20)});
      label.setStyle({
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '1px 3px'
      })
      mk.setLabel(label);
    }
  }

  render() {
    const {count, customerPer, supplierPer, logistics, trend} = this.props
    const {width = "100%", height = "540px"} = this.props
    const customerDivs = customerPer.map((val, index) => {
      return <div key={index + '1'} style={{margin: '10px 0'}}>
        <div key={index + '2'} style={{color: '#ACB4BF', fontSize: 14}}>{val.customer_name}</div>
        <div key={index + '3'} style={{width: '75%', display: 'inline-block'}}>
          <Progress key={index + '4'} percent={val.percent - 0} showInfo={false} id='leftColor' strokeWidth={6}/>
        </div>
        <div key={index + '5'} style={{width: '25%', display: 'inline-block', textAlign: 'center'}}>
          <div style={{display: 'flex', marginLeft: 15}}>
            <div key={index + '6'}
                 style={{flex: 1, color: '#A1A9B3', fontSize: 14}}>{val.sale_num} 吨
            </div>
            <div key={index + '7'} style={{flex: 1, color: '#545F76', fontSize: 14}}>{val.percent}%</div>
          </div>
        </div>
      </div>
    })
    const supplierDivs = supplierPer.map((val, index) => {
      return <div key={index + '1'} style={{margin: '10px 0'}}>
        <div key={index + '2'} style={{color: '#ACB4BF', fontSize: 14}}>{val.supp_name}</div>
        <div key={index + '3'} style={{width: '75%', display: 'inline-block'}}>
          <Progress key={index + '4'} percent={val.percent - 0} showInfo={false} id='rightColor' strokeWidth={6}/>
        </div>
        <div key={index + '5'} style={{width: '25%', display: 'inline-block', textAlign: 'center'}}>
          <div style={{display: 'flex', marginLeft: 15}}>
            <div key={index + '6'}
                 style={{flex: 1, color: '#A1A9B3', fontSize: 14}}>{val.load_num} 吨
            </div>
            <div key={index + '7'} style={{flex: 1, color: '#545F76', fontSize: 14}}>{val.percent}%</div>
          </div>
        </div>
      </div>
    })
    const menu = (
      <Menu onClick={this.chartBtnChange}>
        <Menu.Item key="1">近7日</Menu.Item>
        <Menu.Item key="2">近30天</Menu.Item>
        <Menu.Item key="3">近3个月</Menu.Item>
        <Menu.Item key="4">近6个月</Menu.Item>
        <Menu.Item key="5">近12个月</Menu.Item>
      </Menu>
    )
    if (Object.keys(trend).length) {
      this.initChart({
        title: {
          text: '价格趋势图',
          textStyle: {
            color: '#545F76',
            fontFamily: 'PingFangHK-Regular'
          },
        },
        color: ['#4A90E2', '#FF9A74'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['采购', '销售'],
          top: 5,
          right: 200
        },
        grid: {
          top: '15%',
          left: '1%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          },
          right: 18
        },
        xAxis: {
          type: 'category',
          data: trend.date,
          axisLine: {
            lineStyle: {
              color: '#DEDEDE'
            }
          },
          axisLabel: {
            color: '#7C8B99',
            margin: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '单位（元/吨）',
          nameTextStyle: {
            color: '#7C8B99',
            fontSize: '14px',
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#7C8B99'
          }
        },
        series: [
          {
            name: '采购',
            type: 'line',
            smooth: true,
            data: trend.purchase_price
          },
          {
            name: '销售',
            type: 'line',
            smooth: true,
            data: trend.saler_price
          }
        ]
      })
    }
    // this.initBmp()
    return (
      <div>
        <Row>
          <Col className={'pageName'}>首页</Col>
          <div style={{position: 'absolute', top: 0, right: 0}}>
            <RadioGroup onChange={this.topRadioChange} value={this.state.currentCount}>
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
              <div className={styles.dashTitle}>{this.state.topTip}出单数 (单)</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={count.order_num} duration={3}/>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div
                    className={styles.percentage}>{count.order_num_f === 1 ? `${(count.order_num_h - 0).toFixed(2)}%` : `-${(count.order_num_h - 0).toFixed(2)}%`}</div>
                  <div
                    className={styles.toBottom}>{count.order_num_f === 1 ? '↑' : count.order_num_f === 2 ? '↓' : '-'}</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-xiaoshouliang"]}></div>
              <div className={styles.dashTitle}>{this.state.topTip}销售量 (吨)</div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={count.sale_num} decimals={3} duration={3}/>
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div
                    className={styles.percentage}>{count.sale_num_f === 1 ? `${(count.sale_num_h - 0).toFixed(2)}%` : `-${(count.sale_num_h - 0).toFixed(2)}%`}</div>
                  <div
                    className={styles.toBottom}>{count.sale_num_f === 1 ? '↑' : count.sale_num_f === 2 ? '↓' : '-'}</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-xiaoshoue"]}></div>
              <div className={styles.dashTitle}>{this.state.topTip}销售额 ({count.saler_money > 1000000 ? '万元' : '元'})
              </div>
              <div className={styles.dashCount}>
                <CountUp start={0} end={count.saler_money > 1000000 ? count.saler_money / 1000000 : count.saler_money}
                         decimals={2} duration={3}/>
                {/*<div className={styles.wan}>万</div>*/}
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div
                    className={styles.percentage}>{count.saler_money_f === 1 ? `${(count.saler_money_h - 0).toFixed(2)}%` : `-${(count.saler_money_h - 0).toFixed(2)}%`}</div>
                  <div
                    className={styles.toBottom}>{count.saler_money_f === 1 ? '↑' : count.saler_money_f === 2 ? '↓' : '-'}</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-caigoue"]}></div>
              <div className={styles.dashTitle}>{this.state.topTip}采购额 ({count.purchase_money > 1000000 ? '万元' : '元'})
              </div>
              <div className={styles.dashCount}>
                <CountUp start={0}
                         end={count.purchase_money > 1000000 ? count.purchase_money / 1000000 : count.purchase_money}
                         decimals={2} duration={3}/>
                {/*<div className={styles.wan}>万</div>*/}
              </div>
              {this.state.status === '1' ?
                <div className={classNames(styles.boxBottomTip, styles.down)}>
                  <div
                    className={styles.percentage}>{count.purchase_money_f === 1 ? `${(count.purchase_money_h - 0).toFixed(2)}%` : `-${(count.purchase_money_h - 0).toFixed(2)}%`}</div>
                  <div
                    className={styles.toBottom}>{count.purchase_money_f === 1 ? '↑' : count.purchase_money_f === 2 ? '↓' : '-'}</div>
                  <div className={styles.ring}>环比昨日</div>
                </div> : ''
              }
            </div>
          </Col>
          <Col className={styles.topBox}>
            <div>
              <div className={styles["dashImg-yingkui"]}>
                <img src={images.default.yingkui} alt="" width='62' height='62'/>
              </div>
              <div className={styles.dashTitle}>{this.state.topTip}盈亏 ({count.profit_and_loss > 1000000 ? '万元' : '元'})
              </div>
              <div className={styles.dashCount}>
                <CountUp start={0}
                         end={count.profit_and_loss > 1000000 ? count.profit_and_loss / 1000000 : count.profit_and_loss}
                         decimals={2} duration={3}/>
                {/*<div className={styles.wan}>万</div>*/}
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.contentBox}>
          <div style={{width: '54%', display: 'inline-block', position: 'relative'}}>
            <div ref='echart' style={{width, height}}>
              {/*<ReactEcharts*/}
              {/*option={options}*/}
              {/*style={{height: 501}}/>*/}
              {/*<ReactEchartsCore echarts={echarts} option={options} notMerge={true}*/}
              {/*lazyUpdate={true}*/}
              {/*></ReactEchartsCore>*/}
            </div>
            <Dropdown overlay={menu} className={styles.changeChart}>
              <Button style={{marginLeft: 8}}>
                {this.state.currentSelect} <Icon type="down"/>
              </Button>
            </Dropdown>
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
              <div ref='echartMap' id='indexMap' style={{width, height: 482}}></div>
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
              <RadioGroup onChange={this.customerRadioChange} value={this.state.currentCustomer}>
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
              <RadioGroup onChange={this.supplierRadioChange} value={this.state.currentSupplier}>
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
  const {count, customerPer, supplierPer, logistics, trend, countLoading, customerLoading, supplierLoading, homeMapData} = state.home
  return {
    count,
    customerPer,
    supplierPer,
    logistics,
    trend,
    countLoading,
    customerLoading,
    supplierLoading,
    homeMapData,
    loading: state.loading.models.home
  }
}

IndexPage.propTypes = {}

export default connect(mapStateToProps)(IndexPage)
