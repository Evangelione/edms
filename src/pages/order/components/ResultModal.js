import {Component} from 'react'
import {connect} from 'dva'
import withRouter from 'umi/withRouter'
import {Modal, Steps, Card, Row, Col, Button, Icon, Input, Form} from 'antd'

const Step = Steps.Step
const FormItem = Form.Item

class ResultModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: ['确认采购价格', '确认销售价格', '确认客户运费', '确认物流公司运费', '确认结算'],
      visible: false,
      title: '确认采购价格',
      step: 0,
      resultForm: {},
      resultNum: '',
      distance: this.props.detailForm.distance,
      form: {
        f1: {
          caigou: 4500,
          dunwei: 20
        },
        f2: {
          xiaoshou: 4500,
          dunwei: 20
        },
        f3: {
          jiesuan: 4500,
          danjia: 20,
          yunju: 550,
          feiyong: 2030,
          heji: 420.00
        },
        f4: {
          jiesuan: 4500,
          danjia: 20,
          yunju: 550,
          feiyong: 2030,
          heji: '420.00'
        },
        f5: {
          caigou: '300,000,00',
          xiaoshou: '200,000,00',
          wuliu: '550.00',
          yingli: '420213.00'
        }
      }
    }
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

  next = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          resultForm: {...this.state.resultForm, ...values},
        }, () => {
          console.log('Received values of form: ', this.state.resultForm)
        })
        this.setState({
          step: this.state.step + 1,
          title: this.state.titleText[this.state.step + 1]
        }, () => {
          if (this.state.step === 4) {
            let caigou = (this.state.resultForm.purchase_price - 0) * (this.props.detailForm.load_num - 0)
            let xiaoshou = ((this.state.resultForm.saler_price - 0) * (this.state.resultForm.final_num - 0)) + ((this.state.resultNum - 0) * (this.state.resultForm.deliver_price - 0) * (this.state.resultForm.distance) + (this.state.resultForm.extra_fee - 0))
            let wuliu = ((this.state.resultNum - 0) * (this.state.resultForm.wl_deliver_price - 0) * (this.state.distance - 0)) + (this.state.resultForm.wl_extra_fee - 0)
            this.props.form.setFieldsValue({
              caigou: caigou,
              xiaoshou: xiaoshou,
              wuliu: wuliu,
              yingli: xiaoshou - caigou - wuliu
            })
          }
        })
      }
    })
  }

  last = () => {
    this.setState({
      step: this.state.step - 1,
      title: this.state.titleText[this.state.step - 1]
    });
  }

  goResult = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 提交表单在这做
        let form = this.state.resultForm
        delete form.caigou
        delete form.xiaoshou
        delete form.wuliu
        delete form.yingli
        delete form.customerTotal
        delete form.supplierTotal
        form.id = this.props.location.query.id
        this.props.dispatch({
          type: 'orderDetail/doResult',
          payload: form
        })
      }
    })
  }

  customerCalculation = () => {
    setTimeout(() => {
      const deliver_price = this.props.form.getFieldValue('deliver_price')
      const distance = this.props.form.getFieldValue('distance')
      const extra_fee = this.props.form.getFieldValue('extra_fee')
      this.setState({
        customerTotal: ((deliver_price - 0) * (distance - 0) * (this.state.resultNum - 0)) + (extra_fee - 0)
      }, () => {
        this.props.form.setFieldsValue({
          customerTotal: this.state.customerTotal
        })
      })
    }, 100)
  }

  supplierCalculation = () => {
    setTimeout(() => {
      const deliver_price = this.props.form.getFieldValue('wl_deliver_price')
      const distance = this.state.distance
      const extra_fee = this.props.form.getFieldValue('wl_extra_fee')
      if (!deliver_price || !distance || !extra_fee) {
        return false
      }
      this.setState({
        supplierTotal: ((deliver_price - 0) * (distance - 0) * (this.state.resultNum - 0)) + (extra_fee - 0)
      }, () => {
        this.props.form.setFieldsValue({
          supplierTotal: this.state.supplierTotal
        })
      })
    }, 100)
  }

  resultNumChange = (e) => {
    this.setState({
      resultNum: e.target.value
    })
  }

  distanceChange = (e) => {
    this.setState({
      distance: e.target.value
    })
    setTimeout(() => {
      const deliver_price = this.props.form.getFieldValue('deliver_price')
      const distance = this.props.form.getFieldValue('distance')
      const extra_fee = this.props.form.getFieldValue('extra_fee')
      this.setState({
        customerTotal: (deliver_price - 0) * (distance - 0) * (this.state.resultNum - 0) + (extra_fee - 0),
      })
    }, 100)
  }

  render() {
    const {children} = this.props
    const {getFieldDecorator} = this.props.form;
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
          <Steps current={this.state.step} progressDot style={{paddingTop: 45, marginBottom: 40}}>
            <Step title="确认采购价格"/>
            <Step title="确认销售价格"/>
            <Step title="确认客户运费"/>
            <Step title="确认物流公司运费"/>
            <Step title="确认结算"/>
          </Steps>
          <Card style={{border: '1px solid #EEEEEE', background: '#F9FAFC', minHeight: 340}}>
            {this.state.step === 0 ?
              <Form layout="vertical">
                <Row gutter={80}>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="采购价">
                      {getFieldDecorator('purchase_price', {
                        initialValue: this.props.detailForm.purchase_price,
                        rules: [{required: true, message: '请输入采购价！'}],
                      })(
                        <Input addonAfter={'元 / 吨'}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="装车吨位">
                      <Input addonAfter={'吨'} defaultValue={this.props.detailForm.load_num} disabled/>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              :
              ''}
            {this.state.step === 1 ?
              <Form layout="vertical">
                <Row gutter={80}>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="销售价">
                      {getFieldDecorator('saler_price', {
                        initialValue: this.props.detailForm.saler_price,
                        rules: [{required: true, message: '请输入销售价！'}],
                      })(
                        <Input addonAfter={'元 / 吨'}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="结算吨位">
                      {getFieldDecorator('final_num', {
                        // initialValue: this.props.detailForm.final_num,
                        rules: [{required: true, message: '请输入结算吨位！'}],
                      })(
                        <Input addonAfter={'吨'} onChange={this.resultNumChange}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={80}>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="装车吨位">
                      <Input addonAfter={'吨'} defaultValue={this.props.detailForm.load_num} disabled/>
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="卸车吨位">
                      <Input addonAfter={'吨'} defaultValue={this.props.detailForm.unload_num} disabled/>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              :
              ''}
            {this.state.step === 2 ?
              <Form layout="vertical">
                <Row gutter={80}>
                  <Col span={24} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="结算吨位" style={{marginBottom: 0}}>
                      <Input addonAfter={'吨'} defaultValue={this.state.resultNum} disabled/>
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="运费单价" style={{marginBottom: 0}}>
                      {getFieldDecorator('deliver_price', {
                        initialValue: this.props.detailForm.deliver_price,
                        rules: [{required: true, message: '请输入运费单价！'}],
                      })(
                        <Input addonAfter={'元 / 吨 / 公里'} onChange={this.customerCalculation}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="运距" style={{marginBottom: 0}}>
                      {getFieldDecorator('distance', {
                        initialValue: this.props.detailForm.distance,
                        rules: [{required: true, message: '请输入运距！'}],
                      })(
                        <Input addonAfter={'公里'} onChange={this.distanceChange}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="额外费用" style={{marginBottom: 0}}>
                      {getFieldDecorator('extra_fee', {
                        rules: [{required: true, message: '请输入额外费用！'}],
                      })(
                        <Input addonAfter={'元'} onChange={this.customerCalculation}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="客户运费合计" style={{marginBottom: 0}}>
                      {getFieldDecorator('customerTotal')(
                        <Input addonAfter={'元'} disabled/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              :
              ''}
            {this.state.step === 3 ?
              <Form layout="vertical">
                <Row gutter={80}>
                  <Col span={24} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="结算吨位" style={{marginBottom: 0}}>
                      <Input addonAfter={'吨'} defaultValue={this.state.resultNum} disabled/>
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="运费单价" style={{marginBottom: 0}}>
                      {getFieldDecorator('wl_deliver_price', {
                        rules: [{required: true, message: '请输入运费单价！'}],
                      })(
                        <Input addonAfter={'元 / 吨 / 公里'} onChange={this.supplierCalculation}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="运距" style={{marginBottom: 0}}>
                      <Input addonAfter={'公里'} disabled defaultValue={this.state.distance}/>
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="额外费用" style={{marginBottom: 0}}>
                      {getFieldDecorator('wl_extra_fee', {
                        rules: [{required: true, message: '请输入额外费用！'}],
                      })(
                        <Input addonAfter={'元'} onChange={this.supplierCalculation}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="物流运费合计" style={{marginBottom: 0}}>
                      {getFieldDecorator('supplierTotal')(
                        <Input addonAfter={'元'} disabled/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              :
              ''}
            {this.state.step === 4 ?
              <Form layout="vertical">
                <Row gutter={80}>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="采购费用" style={{marginBottom: 0}}>
                      {getFieldDecorator('caigou')(
                        <Input addonAfter={'元'} disabled/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="销售费用" style={{marginBottom: 0}}>
                      {getFieldDecorator('xiaoshou')(
                        <Input addonAfter={'元'} disabled/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="物流费用" style={{marginBottom: 0}}>
                      {getFieldDecorator('wuliu')(
                        <Input addonAfter={'元'} disabled/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12} style={{marginBottom: 10, height: 85}}>
                    <FormItem label="盈利情况" style={{marginBottom: 0}}>
                      {getFieldDecorator('yingli')(
                        <Input addonAfter={'元'} disabled/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              :
              ''}
          </Card>
          <Row type='flex' justify={'space-between'} style={{marginTop: 20}}>
            <Col>
              {this.state.step === 0 ?
                <Button className={'grayButton'} onClick={this.hideModelHandler}>取消</Button>
                :
                <Button type='primary' onClick={this.last} className={'grayButton'}><Icon type="left"/>上一步</Button>
              }
            </Col>
            <Col>
              {this.state.step === 4 ?
                <Button type='primary' onClick={this.goResult} style={{width: 120}}><Icon type="check"/>确认结算</Button>
                :
                <Button type='primary' onClick={this.next} style={{width: 120}}>下一步<Icon type="right"/></Button>
              }
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
