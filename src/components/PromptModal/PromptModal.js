import React from 'react'
import { Modal, Button, Row, Col } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import images from '../../utils/images'

class PromptModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modalState: {
        success: {
          icon: 'success',
          okText: '继续下单',
          cancelText: '离开',
          text: '恭喜您支付成功，订单已提交！',
          okHandler: this.successHandler,
          cancelHandler: this.goOrder,
        },
        error: {
          icon: 'error',
          okText: '去充值',
          cancelText: '取消',
          text: '支付失败，当前账户余额不足！',
          okHandler: this.errorHandler,
        },
        cancelOrder: {
          icon: 'cancel',
          okText: '确定取消',
          cancelText: '再想想',
          text: '取消后订单将被删除，确认取消订单吗？',
          okHandler: this.orderCancelHandler,
        },
        cancelEdit: {
          icon: 'cancel',
          okText: '离开',
          cancelText: '取消',
          text: '您还有信息未保存，确定离开当前页面吗？',
          okHandler: this.editCancelHandler,
        },
        cancelLogistics: {
          icon: 'cancel',
          okText: '确定取消',
          cancelText: '再想想',
          text: '取消后运单将被重新调度，确认取消吗？',
          okHandler: this.cancelLogisticsHandler,
        },
        confirmLogistics: {
          icon: 'cancel',
          okText: '确定磅单',
          cancelText: '再想想',
          text: '确定磅单后不可再次更改哦 :）',
          okHandler: this.confirmLogisticsHandler,
        },
        disableAccount: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: `确定${this.props.type}当前账号吗？`,
          okHandler: this.disableAccount,
        },
        deleteOne: {
          icon: 'error',
          okText: '确定',
          cancelText: '取消',
          text: `如此数据有误，您可以编辑修改，但删除此数据后需要重新录入，确定删除吗？`,
          okHandler: this.deleteOne,
        },
        deleteOrder: {
          icon: 'error',
          okText: '确定',
          cancelText: '取消',
          text: `此操作会彻底删除订单，确定删除吗？`,
          okHandler: this.deleteOrder,
        },
        duiAll: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: `确认后，以下全部页面显示的订单都将加入对账单，是否继续操作？`,
          okHandler: this.duiAll,
        },
        duiAllsupp: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: `确认后，以下全部页面显示的订单都将加入对账单，是否继续操作？`,
          okHandler: this.duiAllsupp,
        },
        duilog: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: `确认后，以下全部页面显示的订单都将加入对账单，是否继续操作？`,
          okHandler: this.duilog,
        },
      },
    }
  }

  deleteOrder = () => {
    this.props.dispatch({
      type: 'order/delOrder',
      payload: {
        id: this.props.delOrderId,
      },
    })
  }
  successHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order/doOrder',
    }))
    this.props.dispatch({
      type: 'orderDetail/changeOpenState',
      payload: {
        openState: false,
      },
    })
  }

  errorHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    })).then(() => {
      this.setState({
        visible: false,
      })
    })
  }

  orderCancelHandler = () => {
    this.props.dispatch({
      type: 'orderDetail/cancelOrder',
      payload: {
        id: this.props.cancelId,
      },
    }).then(() => {
      this.setState({
        visible: false,
      })
    })
  }

  editCancelHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    }))
    this.props.dispatch({
      type: 'orderDetail/changeState',
      payload: {
        editable: false,
      },
    })
  }

  cancelLogisticsHandler = () => {
    this.props.dispatch({
      type: 'logistics/cancelDispatch',
      payload: {
        id: this.props.cancelID,
      },
    }).then(() => {
      this.setState({
        visible: false,
      })
    })
  }

  confirmLogisticsHandler = () => {
    this.props.dispatch({
      type: 'home/confirmBill',
      payload: {
        id: this.props.billID,
        load_num: this.props.load_num,
        unload_num: this.props.unload_num,
        load_time: this.props.load_time,
        unload_time: this.props.unload_time,
        load_bill: this.props.load_bill,
        unload_bill: this.props.unload_bill,
      },
    }).then(() => {
      this.props.doClose()
      this.setState({
        visible: false,
      })
    })
  }

  disableAccount = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: false,
    })
    if (this.props.foruser) {
      this.props.dispatch({
        type: 'permission/forbiddenControl',
        payload: {
          id: this.props.id,
        },
      })
    } else {
      this.props.dispatch({
        type: 'backstage/forbiddenControl',
        payload: {
          id: this.props.id,
        },
      })
    }

  }

  goOrder = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    }))
    this.props.dispatch({
      type: 'orderDetail/save',
      payload: {
        openState: false,
      },
    })
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: true,
    })
  }

  hideModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.props.openState ?
      this.props.dispatch({
        type: 'orderDetail/save',
        payload: {
          openState: false,
        },
      })
      :
      this.setState({
        visible: false,
      })
  }

  deleteOne = (e) => {
    if (e) e.stopPropagation()
    if (this.props.delType === 'user') {
      this.props.dispatch({
        type: 'maintain/deleteCustomer',
        payload: {id: this.props.delID},
      })
    } else if (this.props.delType === 'supplier') {
      this.props.dispatch({
        type: 'maintain/deleteSupplier',
        payload: {id: this.props.delID},
      })
    } else if (this.props.delType === 'vehicle') {
      this.props.dispatch({
        type: 'maintain/deleteCar',
        payload: {id: this.props.delID},
      })
    }
  }

  duiAll = (e) => {
    if (e) e.stopPropagation()
    this.props.dispatch({
      type: 'customer/Reconciliation2',
      payload: {
        stime: this.props.stime,
        etime: this.props.etime,
        account_status: this.props.account_status,
        customer_id: this.props.customer_id,
        site_id: this.props.site_id,
        goods_id: this.props.goods_id,
      },
    }).then(() => {
      this.setState({
        visible: false,
      })
      this.props.dispatch({
        type: 'customer/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
        },
      })
      this.props.callback()
    })
  }
  duiAllsupp = (e) => {
    if (e) e.stopPropagation()
    this.props.dispatch({
      type: 'supplier/Reconciliation2',
      payload: {
        stime: this.props.stime,
        etime: this.props.etime,
        account_status: this.props.account_status,
        supp_id: this.props.supp_id,
        site_id: this.props.site_id,
        goods_id: this.props.goods_id,
      },
    }).then(() => {
      this.setState({
        visible: false,
      })
      this.props.dispatch({
        type: 'supplier/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          supp_id: this.props.supp_id,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
        },
      })
      this.props.callback()
    })
  }

  duilog = (e) => {
    if (e) e.stopPropagation()
    this.props.dispatch({
      type: 'logistics/Reconciliation2',
      payload: {
        stime: this.props.stime,
        etime: this.props.etime,
        account_status: this.props.account_status,
        logistics_company: this.props.logistics_company,
        site_id: this.props.site_id,
        goods_id: this.props.goods_id,
      },
    }).then(() => {
      this.setState({
        visible: false,
      })
      this.props.dispatch({
        type: 'logistics/balanceFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime,
          logistics_company: this.props.logistics_company,
          account_status: this.props.account_status,
          site_id: this.props.site_id,
          goods_id: this.props.goods_id,
        },
      })
      this.props.callback()
    })
  }

  render() {
    const {children, state} = this.props
    const modalState = this.state.modalState[state]
    return (
      <div style={{cursor: 'pointer', color: '#3477ED', display: 'inline-block'}} onClick={this.showModelHandler}>
        {children}
        <Modal
          title='提示'
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModelHandler}
          bodyStyle={{textAlign: 'center', fontSize: 16, fontFamily: 'PingFangHK-Medium'}}
          destroyOnClose={true}
        >
          <div>
            <img src={images[modalState.icon]} alt=""/>
          </div>
          <div style={{marginTop: 30}}>{modalState.text}</div>
          <Row type='flex' justify='space-around' style={{margin: '40px 35px 0 35px'}}>
            <Col>
              <Button onClick={modalState.cancelHandler ? modalState.cancelHandler : this.hideModelHandler}
                      className={'grayButton'}>{modalState.cancelText}</Button>
            </Col>
            <Col>
              <Button onClick={modalState.okHandler} type='primary' style={{width: 120}}>{modalState.okText}</Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // const {openState} = state.orderDetail
  // const {billLoading} = state.logisticsDetail
  return {
    loading: state.loading.models.logisticsDetail,
  }
}

export default connect(mapStateToProps)(PromptModal)
