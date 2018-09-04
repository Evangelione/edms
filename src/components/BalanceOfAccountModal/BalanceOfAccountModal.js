import React from 'react'
import { Modal, Button, Row, Col, notification } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import images from '../../utils/images'

class BalanceOfAccountModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modalState: {
        confirm: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '确认对账操作后对账单将变成【已对账】状态，且无法删除，是否继续操作？',
          okHandler: this.doConfirm,
          cancelHandler: this.doCancel
        },
        delete: {
          icon: 'cancel',
          okText: '确定',
          cancelText: '取消',
          text: '确定删除当前对账单吗？',
          okHandler: this.doConfirm,
          cancelHandler: this.doCancel
        }
      }
    }
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: true
    })
  }

  hideModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: false
    })
  }

  doConfirm = () => {
    this.props.dispatch({
      type: this.props.url,
      payload: {
        id: this.props.id
      }
    }).then(() => {
      this.props.dispatch({
        type: 'logistics/balanceHistoryFetch',
        payload: {
          page: 1,
          find_str: this.props.find_str,
          stime: this.props.stime,
          etime: this.props.etime
        }
      })
      this.setState({
        visible: false
      })
    })
  }

  doCancel = () => {
    this.setState({
      visible: false
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
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.logisticsDetail
  }
}

export default connect(mapStateToProps)(BalanceOfAccountModal)
