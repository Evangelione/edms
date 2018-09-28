import React, { PureComponent } from 'react'
import { Card, List, Pagination, Divider } from 'antd'
import { connect } from 'dva'
import { PAGE_SIZE } from "../../../constants"

class OrderTableV2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabColor: {
        '待确认': '#666',
        '待支付': '#FF4241',
        '待发货': '#f2b21a',
        '待收货': '#F17C40',
        '待结算': '#54A8FD',
        '已结算': '#00B763',
      },
      tabColorOpacity: {
        '待确认': 'rgb(102,102,102,0.1)',
        '待支付': 'rgb(255,66,65,0.1)',
        '待发货': 'rgb(242,178,26,0.1)',
        '待收货': 'rgb(241,124,64,0.1)',
        '待结算': 'rgb(84,168,253,0.1)',
        '已结算': 'rgb(0,183,99,0.1)',
      }
    }
  }

  clickItme = (item, index) => {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        currentOrder: item,
        currentIndex: index
      }
    })
    this.props.dispatch({
      type: 'home/save',
      payload: {
        currentOrder: item,
      }
    })
  }


  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        page,
        order_status: this.props.order_status,
        order_type: this.props.order_type
      }
    })
  }

  render() {
    const {list, page, total} = this.props
    return (
      <Card bodyStyle={{padding: 0}}>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item onClick={this.clickItme.bind(null, item, index)}
                       style={{cursor: 'pointer', paddingTop: 16, paddingBottom: 16}}
                       className={this.props.currentIndex === index ? 'CurrentBorder' : ''}>
              <List.Item.Meta
                title={
                  <div style={{
                    fontSize: 16,
                    color: '#545F76',
                    padding: '2px 25px',
                    fontWeight: 600,
                    position: 'relative'
                  }}>
                    <span style={{marginRight: 25}}>{index + 1}</span>
                    <span style={{
                      marginLeft: 30,
                      marginBottom: 20,
                      display: 'inline-block'
                    }}>{item.name_gas_source ? item.name_gas_source : '暂无'}</span>
                    <span style={{
                      float: 'right',
                      fontSize: 12,
                      color: this.state.tabColor[item.status_name],
                      background: this.state.tabColorOpacity[item.status_name],
                      padding: '0px 10px',
                      fontWeight: 400
                    }}><span
                      style={{
                        backgroundColor: this.state.tabColor[item.status_name],
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginTop: '-3px',
                        marginRight: 5
                      }}/>{item.status_name}</span>
                    <span style={{
                      position: 'absolute',
                      top: 27,
                      left: 86,
                      fontSize: 14,
                      color: '#0087FE'
                    }}>{item.saler_num} 吨</span>
                    <span style={{
                      position: 'absolute',
                      top: 27,
                      left: 148,
                      fontSize: 14,
                      color: '#cc2020'
                    }}>({item.saler_price} 元/吨)</span>
                    <span style={{
                      position: 'absolute',
                      top: 0,
                      left: 320,
                      fontSize: 12,
                      color: '#6C6C6C',
                      fontWeight: 400
                    }}>客户名称: {item.customer_name}</span>
                    <span style={{
                      position: 'absolute',
                      top: 20,
                      left: 320,
                      fontSize: 12,
                      color: '#6C6C6C',
                      fontWeight: 400
                    }}>站点简称: {item.site_name}</span>
                    <span className={item.order_type === '2' ? 'shexiao' : ''}></span>
                  </div>
                }
                description={
                  <div>
                    <span style={{float: 'left', marginLeft: 85}}>创建时间: {item.create_time}</span>
                    <span style={{float: 'right', marginRight: 25}}>预计交货时间: {item.order_date}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Divider/>
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={page}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const {list, total, page, order_status, currentIndex, order_type} = state.order
  return {
    list,
    page,
    total,
    order_status,
    currentIndex,
    order_type,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(OrderTableV2)
