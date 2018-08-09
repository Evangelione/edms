import React from 'react'
import {Modal, Button, Row, Col, notification} from 'antd'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
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
          cancelHandler: this.goOrder
        },
        error: {
          icon: 'error',
          okText: '去充值',
          cancelText: '取消',
          text: '支付失败，当前账户余额不足！',
          okHandler: this.errorHandler
        },
        cancelOrder: {
          icon: 'cancel',
          okText: '确定取消',
          cancelText: '再想想',
          text: '取消后订单将被删除，确认取消订单吗？',
          okHandler: this.orderCancelHandler
        },
        cancelEdit: {
          icon: 'cancel',
          okText: '离开',
          cancelText: '取消',
          text: '您还有信息未保存，确定离开当前页面吗？',
          okHandler: this.editCancelHandler
        },
        cancelLogistics: {
          icon: 'cancel',
          okText: '确定取消',
          cancelText: '再想想',
          text: '取消后运单将被重新调度，确认取消吗？',
          okHandler: this.cancelLogisticsHandler
        },
        confirmLogistics: {
          icon: 'cancel',
          okText: '确定磅单',
          cancelText: '再想想',
          text: '确定磅单后不可再次更改哦 :）',
          okHandler: this.confirmLogisticsHandler
        },
        disableAccount: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: `确定${this.props.type}当前账号吗？`,
          okHandler: this.disableAccount
        },
      }
    }
  }

  successHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order/doOrder',
    }))
    this.props.dispatch({
      type: 'orderDetail/changeOpenState',
      payload: {
        openState: false
      }
    })
  }

  errorHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    }))
  }

  orderCancelHandler = () => {
    this.props.dispatch({
      type: 'orderDetail/cancelOrder',
      payload: {
        id: this.props.cancelId
      }
    })
  }

  editCancelHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/order',
    }))
    this.props.dispatch({
      type: 'orderDetail/changeState',
      payload: {
        editable: false
      }
    })
  }

  cancelLogisticsHandler = () => {
    this.props.dispatch({
      type: 'logistics/cancelDispatch',
      payload: {
        id: this.props.cancelID
      }
    }).then(() => {
      this.setState({
        visible: false
      })
    })
  }

  confirmLogisticsHandler = () => {
    this.props.dispatch({
      type: 'logisticsDetail/confirmBill',
      payload: {
        id: this.props.billID,
        load_num: this.props.load_num,
        unload_num: this.props.unload_num
      }
    }).then(() => {
      this.props.doClose()
      this.setState({
        visible: false
      })
      notification.success({
        message: '温馨提示',
        description: '调度已完成，请前往 我的订单 确认结算',
        duration: 6,
      })
    })
  }

  disableAccount = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: false
    })
    if (this.props.foruser) {
      this.props.dispatch({
        type: 'permission/forbiddenControl',
        payload: {
          id: this.props.id
        }
      })
    } else {
      this.props.dispatch({
        type: 'backstage/forbiddenControl',
        payload: {
          id: this.props.id
        }
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
        openState: false
      }
    })
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    })
  };

  hideModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.openState ?
      this.props.dispatch({
        type: 'orderDetail/save',
        payload: {
          openState: false
        }
      })
      :
      this.setState({
        visible: false
      })
  };

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
    );
  }
}

function mapStateToProps(state) {
  // const {openState} = state.orderDetail
  // const {billLoading} = state.logisticsDetail
  return {
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(PromptModal)
