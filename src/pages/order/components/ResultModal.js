import {Component} from 'react'
import {connect} from 'dva'
import withRouter from 'umi/withRouter'
import {Modal, Card, Row, Col, Button, Icon, Form, Divider, InputNumber, notification} from 'antd'
import ImageModal from '../../../components/ImageModal/ImageModal'

const FormItem = Form.Item

class ResultModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: ['确认采购费用', '确认销售金额', '确认客户运费', '确认物流公司运费', '确认结算'],
      visible: false,
      title: '结算',
      step: 0,
      resultForm: {},
      resultNum: '',
      distance: this.props.detailForm.distance,
      caigou: 0,
      xiaoshou: 0
    }
  }

  componentDidMount() {
    this.caigouCalculation()
    this.xiaoshouCalculation()
    this.wuliuCalculation()
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: true,
    })
  }

  hideModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: false,
      step: 0
    })
  }

  goResult = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.props.location.query.id
        this.props.dispatch({
          type: 'orderDetail/doResult',
          payload: values
        }).then(() => {
          notification.success({
            message: '温馨提示',
            description: '请前往 我的客户-销售明细，我的供应商-采购明细，我的账务-数据分析 对账',
            duration: 12,
          })
        })
      }
    })
  }

  caigouCalculation = () => {
    setTimeout(() => {
      const purchase_price = this.props.form.getFieldValue('purchase_price')
      const cg_final_num = this.props.form.getFieldValue('cg_final_num')
      let result = isNaN((purchase_price - 0) * (cg_final_num - 0)) ? 0 : (purchase_price - 0) * (cg_final_num - 0)
      this.setState({
        caigou: result.toFixed(2)
      })
    }, 100)
  }

  xiaoshouCalculation = () => {
    setTimeout(() => {
      const saler_price = this.props.form.getFieldValue('saler_price')
      const xs_final_num = this.props.form.getFieldValue('xs_final_num')
      const deliver_price = this.props.form.getFieldValue('deliver_price')
      const distance = this.props.form.getFieldValue('distance')
      const extra_fee = this.props.form.getFieldValue('extra_fee')
      let result = isNaN((saler_price - 0) * (xs_final_num - 0) + (deliver_price - 0) * (distance - 0) * (xs_final_num - 0) + (extra_fee - 0)) ? 0 : (saler_price - 0) * (xs_final_num - 0) + (deliver_price - 0) * (distance - 0) * (xs_final_num - 0) + (extra_fee - 0)
      this.setState({
        xiaoshou: result.toFixed(2)
      })
    }, 100)
  }

  wuliuCalculation = () => {
    setTimeout(() => {
      const wl_deliver_price = this.props.form.getFieldValue('wl_deliver_price')
      const wl_distance = this.props.form.getFieldValue('wl_distance')
      const wl_final_num = this.props.form.getFieldValue('wl_final_num')
      const wl_extra_fee = this.props.form.getFieldValue('wl_extra_fee')
      let result = isNaN((wl_deliver_price - 0) * (wl_distance - 0) * (wl_final_num - 0) + (wl_extra_fee - 0)) ? 0 : (wl_deliver_price - 0) * (wl_distance - 0) * (wl_final_num - 0) + (wl_extra_fee - 0)
      this.setState({
        wuliu: result.toFixed(2)
      })
    }, 100)
  }

  render() {
    const {children} = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 11},
        sm: {span: 11},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 12},
      },
      style: {margin: '0 0 15px 0'}
    }
    const config = {
      rules: [{required: true, message: '此项为必填项！'}],
    }
    return (
      <div style={{cursor: 'pointer', color: '#3477ED', marginTop: 10}} onClick={this.showModelHandler}>
        {children}
        <Modal
          width={740}
          title={this.state.title}
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModelHandler}
        >
          <Card style={{border: '1px solid #EEEEEE', background: '#F9FAFC', minHeight: 340}}>
            <div className={'itemTitle'}>1.磅单信息</div>
            <Divider dashed={true}></Divider>
            <Row>
              <Col span={12}>
                <div>
                  <div style={{
                    display: 'inline-block',
                    margin: '20px 10px 30px 10px'
                  }}>装车吨位：{this.props.detailForm.load_num}吨
                  </div>
                  <ImageModal style={{display: 'inline-block'}} imgUrl={this.props.detailForm.load_url}>
                    <Icon type="folder"/> 查看装车磅票
                  </ImageModal>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <div style={{
                    display: 'inline-block',
                    margin: '20px 10px 30px 10px'
                  }}>卸车吨位：{this.props.detailForm.unload_num}吨
                  </div>
                  <ImageModal style={{display: 'inline-block'}} imgUrl={this.props.detailForm.unload_url}>
                    <Icon type="folder"/> 查看卸车磅票
                  </ImageModal>
                </div>
              </Col>
              <Col span={12}>
                <div style={{
                  display: 'inline-block',
                  margin: '0px 10px 30px 10px'
                }}>装车时间：{this.props.detailForm.load_time}
                </div>
              </Col>
              <Col span={12}>
                <div style={{
                  display: 'inline-block',
                  margin: '0px 10px 30px 10px'
                }}>卸车时间：{this.props.detailForm.unload_time}
                </div>
              </Col>
            </Row>
            <Form layout='inline'>
              <div className={'itemTitle'}>
                2.确认采购费用（与供应商结算）
                <div style={{float: 'right', fontSize: 16}}>采购费用：<span
                  style={{color: 'red'}}>{this.state.caigou}元</span></div>
              </div>
              <Divider dashed={true}></Divider>
              <Row>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="采购价"
                  >
                    {getFieldDecorator('purchase_price', {
                      ...config,
                      initialValue: this.props.detailForm.purchase_price
                    })(
                      <InputNumber min={0} step={0.01} onChange={this.caigouCalculation}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={13}>
                  <FormItem
                    {...formItemLayout}
                    label="结算吨位"
                  >
                    {getFieldDecorator('cg_final_num', {
                      ...config,
                      initialValue: this.props.detailForm.load_num
                    })(
                      <InputNumber min={0} step={0.001} onChange={this.caigouCalculation}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>
                3.确认销售金额（与客户结算）
                <div style={{float: 'right', fontSize: 16}}>销售金额：<span
                  style={{color: 'red'}}>{this.state.xiaoshou}元</span></div>
              </div>
              <Divider dashed={true}></Divider>
              <Row>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="销售价"
                  >
                    {getFieldDecorator('saler_price', {
                      ...config,
                      initialValue: this.props.detailForm.saler_price
                    })(
                      <InputNumber min={0} step={0.01} onChange={this.xiaoshouCalculation}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={13}>
                  <FormItem
                    {...formItemLayout}
                    label="结算吨位"
                  >
                    {getFieldDecorator('xs_final_num', {
                      ...config,
                      initialValue: this.props.detailForm.load_num
                    })(
                      <InputNumber min={0} step={0.001} onChange={this.xiaoshouCalculation}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="运费单价"
                  >
                    {getFieldDecorator('deliver_price', {
                      ...config,
                      initialValue: this.props.detailForm.deliver_price
                    })(
                      <InputNumber min={0} step={0.01} onChange={this.xiaoshouCalculation}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={13}>
                  <FormItem
                    {...formItemLayout}
                    label="运距"
                  >
                    {getFieldDecorator('distance', {
                      ...config,
                      initialValue: this.props.detailForm.distance
                    })(
                      <InputNumber min={0} step={0.01} onChange={this.xiaoshouCalculation} style={{marginLeft: 8}}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="额外费用"
                  >
                    {getFieldDecorator('extra_fee', {
                      ...config,
                      initialValue: 0
                    })(
                      <InputNumber step={0.01} onChange={this.xiaoshouCalculation}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className={'itemTitle'}>
                4.确认物流费用（与物流公司结算）
                <div style={{float: 'right', fontSize: 16}}>物流费用：<span style={{color: 'red'}}>{this.state.wuliu}元</span>
                </div>
              </div>
              <Divider dashed={true}></Divider>
              <Row>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="运费单价"
                  >
                    {getFieldDecorator('wl_deliver_price', {
                      ...config,
                      initialValue: 0
                    })(
                      <InputNumber min={0} step={0.01} onChange={this.wuliuCalculation}
                                   style={{marginLeft: 8}}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={13}>
                  <FormItem
                    {...formItemLayout}
                    label="运距"
                  >
                    {getFieldDecorator('wl_distance', {
                      ...config,
                      initialValue: this.props.detailForm.distance
                    })(
                      <InputNumber min={0} step={0.01} onChange={this.wuliuCalculation}
                                   style={{marginLeft: 8}}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="结算吨位"
                  >
                    {getFieldDecorator('wl_final_num', {
                      ...config,
                      initialValue: this.props.detailForm.load_num
                    })(
                      <InputNumber style={{marginLeft: 8}} min={0} step={0.001}
                                   onChange={this.wuliuCalculation}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={13}>
                  <FormItem
                    {...formItemLayout}
                    label="额外费用"
                  >
                    {getFieldDecorator('wl_extra_fee', {
                      ...config,
                      initialValue: 0
                    })(
                      <InputNumber step={0.01} onChange={this.wuliuCalculation}/>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <Row type='flex' justify='end' style={{marginTop: 20}}>
            <Col>
              <Button type='primary' onClick={this.goResult} style={{width: 120}}><Icon type="check"/>确认结算</Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {detailForm} = state.orderDetail
  return {
    detailForm,
    loading: state.loading.models.orderDetail
  }
}

export default connect(mapStateToProps)(withRouter((Form.create()(ResultModal))))
