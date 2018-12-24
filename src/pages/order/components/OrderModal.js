import React, { PureComponent } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  Button,
  Icon,
  AutoComplete,
  DatePicker,
  message,
  InputNumber,
  Tooltip,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { REGS } from '../../../common/constants'
import { IconFont } from '../../../common/constants'

const FormItem = Form.Item
const Option = Select.Option
const Option2 = AutoComplete.Option
const formItemLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 14},
}

class OrderModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: '采购信息',
      visible: false,
      step: 1,
      report: null,
      dataSource: [],
      purchaseCost: 0,
      logisticsCost: 0,
      sales: 0,
      diffInSales: 0,
      total: 0,
      required: false,
      balance: 0,
      credit: 0,
      credit_used: 0,
      yuePay: 0,
      xinyongPay: 0,
      payType: '预付款',
      suppbalance: 0,
      custombalance: 0,
      creditbalance: 0,
      saler_price_modal: 0,
      maoli: 0,
      currType: '1',
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'order/fetchSelect',
    })
  }

  showModal = (e) => {
    e.stopPropagation()
    if (this.state.visible === true) return
    this.props.form.resetFields()
    this.setState({
      visible: true,
    })
    if (this.props.currentOrder) {
      const form = this.props.currentOrder
      this.setState({
        report: form.temperament_report,
        dataSource: form.shouhuo.map(this.renderOption),
        currType: form.deliver_type,
      })
      // let text = form.user_type
      // let result_type = ''
      // if (form.site_type === '1') {
      //   if (text === '1') {
      //     result_type = 'LNG加气站'
      //   } else if (text === '2') {
      //     result_type = 'L-CNG加气站'
      //   } else if (text === '3') {
      //     result_type = 'LNG L-CNG合建站'
      //   } else if (text === '4') {
      //     result_type = 'LNG CNG合建站'
      //   } else if (text === '5') {
      //     result_type = 'LNG 汽柴油合建站'
      //   } else if (text === '6') {
      //     result_type = 'LNG泵船'
      //   } else if (text === '7') {
      //     result_type = '其他'
      //   } else if (text === '0') {
      //     result_type = '--'
      //   }
      // } else if (form.site_type === '2') {
      //   if (text === '1') {
      //     result_type = '电厂'
      //   } else if (text === '2') {
      //     result_type = '城市居民'
      //   } else if (text === '3') {
      //     result_type = '城市商服'
      //   } else if (text === '4') {
      //     result_type = '城市供暖'
      //   } else if (text === '5') {
      //     result_type = '工业燃料'
      //   } else if (text === '6') {
      //     result_type = '工业原料'
      //   } else if (text === '7') {
      //     result_type = '其他'
      //   } else if (text === '8') {
      //     result_type = '分布式项目'
      //   } else if (text === '0') {
      //     result_type = '--'
      //   }
      // }
      this.setState({
        suppbalance: form.s_balance,
        custombalance: form.c_balance,
        creditbalance: form.credit - form.credit_used,
      })
      this.props.form.setFieldsValue({
        cust_id: form.cust_id,
        cust_id2: form.customer_contact,
        cust_id3: form.customer_mobile,
        saler_price: form.saler_price,
        saler_num: form.saler_num,
        saler_num2: form.saler_num,
        deliver_type: form.deliver_type === '3' ? '1' : form.deliver_type,
        distance: form.distance,
        deliver_price: form.deliver_price,
        site_id: form.site_id,
        site_id2: form.site_type,
        // site_id3: result_type,
        recv_contact: form.recv_contact,
        recv_phone: form.recv_phone,
        recv_time: moment(form.recv_time),
        delivery: form.delivery_province + '/' + form.delivery_city + '/' + (form.delivery_area ? form.delivery_area + '/' : '') + form.detaileds_address,
        supp_id: form.supp_id ? form.supp_id : undefined,
        supp_id2: form.supp_contact,
        supp_id3: form.supp_mobile,
        purchase_price: form.purchase_price,
        shuliang: form.saler_num,
        goods_id: form.goods_id ? form.goods_id : undefined,
        goods_source: form.origin_gas_source,
        goods_contact: form.cargo_contact,
        goods_mobile: form.cargo_mobile,
        deliver_fee: form.deliver_fee,
        cus_deliver_type: form.deliver_type === '2' ? undefined : form.deliver_type,
        goods_delivery: form.cargo_province ? form.cargo_province + '/' + form.cargo_city + '/' + (form.cargo_area ? form.cargo_area + '/' : '') + form.detailed_address : undefined,
      })
      let purchase_price = this.props.form.getFieldValue('purchase_price')
      let shuliang = this.props.form.getFieldValue('shuliang')
      let distance = this.props.form.getFieldValue('distance') || 0
      let deliver_price = this.props.form.getFieldValue('deliver_price') || 0
      let saler_price = this.props.form.getFieldValue('saler_price')
      let saler_num2 = this.props.form.getFieldValue('saler_num2') || 0
      let purcost = isNaN((purchase_price - 0) * (shuliang - 0)) ? 0 : ((purchase_price - 0) * (shuliang - 0))
      let logcost = null
      if (this.state.currType === '3') {
        logcost = this.props.form.getFieldValue('deliver_fee') - 0 || 0
      } else if (this.state.currType === '2') {
        logcost = 0
      } else {
        logcost = isNaN(((distance - 0) * (deliver_price - 0)) * saler_num2) ? 0 : (((distance - 0) * (deliver_price - 0)) * saler_num2)
      }
      let sales = isNaN((saler_price - 0) * (shuliang - 0)) ? 0 : (saler_price - 0) * (shuliang - 0)
      let diffSales = isNaN((sales - purcost - logcost) / shuliang) ? 0 : ((sales - purcost - logcost) / shuliang)
      let total = isNaN((saler_price - 0) * (shuliang - 0)) ? 0 : (saler_price - 0) * (shuliang - 0)
      this.setState({
        purchaseCost: purcost.toFixed(2),
        logisticsCost: logcost.toFixed(2),
        sales: sales.toFixed(2),
        diffInSales: diffSales.toFixed(2),
        total: (total * 1.075).toFixed(2),
        yuePay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? (total * 1.075).toFixed(2) : (this.state.balance - 0),
        xinyongPay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? 0 : ((total * 1.075).toFixed(2) - (this.state.balance - 0)),
        maoli: sales.toFixed(2) - purcost.toFixed(2) - logcost.toFixed(2),
      }, () => {
        if ((this.state.xinyongPay - 0) > 0) {
          this.setState({
            payType: '赊销',
          })
        } else {
          this.setState({
            payType: '预付款',
          })
        }
      })
      this.props.dispatch({
        type: 'order/getModalPrice',
        payload: {
          purchase_price: this.props.form.getFieldValue('purchase_price') ? this.props.form.getFieldValue('purchase_price') : 0,
          deliver_price: this.props.form.getFieldValue('deliver_price') ? this.props.form.getFieldValue('deliver_price') : 0,
          price: this.props.form.getFieldValue('saler_price') ? this.props.form.getFieldValue('saler_price') : 0,
          distance: this.props.form.getFieldValue('distance') ? this.props.form.getFieldValue('distance') : 0,
          saler_num: this.props.form.getFieldValue('saler_num') ? this.props.form.getFieldValue('saler_num') : 0,
        },
      }).then(() => {
        this.setState({
          saler_price_modal: this.props.modal_price,
        })
      })
      // if (this.props.location.pathname === '/order/doOrder') {
      //   return false
      // }
      // this.props.getNum(yunju, yunfeidanjia, shuliang, xiaoshoujiage)
    } else {
      this.props.dispatch({
        type: 'order/getModalPrice',
        payload: {
          purchase_price: 0,
          deliver_price: 0,
          price: 0,
          distance: 0,
          saler_num: 0,
        },
      }).then(() => {
        this.setState({
          saler_price_modal: this.props.modal_price,
        })
      })
      this.setState({
        report: null,
        suppbalance: 0,
        custombalance: 0,
        logisticsCost: 0,
        creditbalance: 0,
        diffInSales: 0,
        maoli: 0,
      })
    }
  }

  handleOk = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
      step: 1,
      title: '采购信息',
    })
  }

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
      step: 1,
      title: '采购信息',
    })
  }

  nextStep = () => {
    this.props.form.validateFields((err, values) => {
      this.setState({
        step: 2,
        title: '销售信息',
        // required: true
      }, () => {
        this.props.form.setFieldsValue({
          saler_num: isNaN(values.shuliang - 0) ? undefined : values.shuliang - 0,
        })
        // this.props.form.setFieldsValue({
        //   cust_id: undefined
        // })
      })
    })

  }

  backStep = () => {
    this.props.form.validateFields((err, values) => {
      this.setState({
        step: 1,
        title: '采购信息',
      })
    })
  }

  openPDF = () => {
    window.open(this.state.report)
  }

  suppChange = (value, item) => {
    this.setState({
      suppbalance: item.props.balance,
    })
    this.props.form.setFieldsValue({
      supp_id2: item.props.contact,
      supp_id3: item.props.mobile,
      purchase_price: undefined,
      shuliang: this.props.confirm ? this.props.currentOrder.saler_num : undefined,
      // goods_id: undefined,
      // goods_source: undefined,
      // goods_contact: undefined,
      // goods_mobile: undefined,
      // goods_delivery: undefined,
      // saler_num: undefined,
      // saler_num2: undefined,
    })
    this.setState({
      purchaseCost: 0,
      logisticsCost: 0,
    })
  }

  goodsChange = (value, item) => {
    this.props.form.setFieldsValue({
      goods_source: item.props.source,
      goods_contact: item.props.contact,
      goods_mobile: item.props.mobile,
      goods_delivery: item.props.province ? (item.props.province + '/' + item.props.city + '/' + (item.props.area ? item.props.area + '/' : '') + item.props.address) : '',
    })
    this.setState({
      report: item.props.report,
    })
  }

  customerChange = (value, item) => {
    this.setState({
      custombalance: item.props.balance,
      creditbalance: (item.props.credit - item.props.credit_used).toFixed(2),
      maoli: 0,
      diffInSales: 0,
    })
    this.setState({
      balance: item.props.balance,
      credit: item.props.credit,
      credit_used: item.props.credit_used,
    })
    this.props.form.setFieldsValue({
      cust_id2: item.props.contact,
      cust_id3: item.props.mobile,
      // saler_price: undefined,
      // site_id: undefined,
      // site_id2: undefined,
      // site_id3: undefined,
      // delivery: undefined,
      // recv_contact: undefined,
      // recv_phone: undefined,
      // recv_time: undefined,
      // deliver_type: undefined,
    })
  }

  siteChange = (value, item) => {
    this.props.form.setFieldsValue({
      site_id2: item.props.sitetype,
      // site_id3: item.props.usertype,
      delivery: item.props.province ? (item.props.province + '/' + item.props.city + '/' + (item.props.area ? item.props.area + '/' : '') + item.props.address) : '',
      recv_contact: undefined,
      recv_phone: undefined,
      recv_time: undefined,
      deliver_type: undefined,
    })
    this.setState({
      dataSource: item.props.shouhuo ? item.props.shouhuo.map(this.renderOption) : '',
    })
  }

  calculationSaler = (e) => {
    setTimeout(() => {
      let purchase_price = this.props.form.getFieldValue('purchase_price')
      let shuliang = this.props.form.getFieldValue('shuliang')
      let distance = this.props.form.getFieldValue('distance') || 0
      let deliver_price = this.props.form.getFieldValue('deliver_price') || 0
      let saler_price = this.props.form.getFieldValue('saler_price')
      let saler_num2 = this.props.form.getFieldValue('saler_num2') || 0
      // this.setState({
      //   yunfei: ((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0)).toFixed(2),
      //   huofei: ((xiaoshoujiage - 0) * (shuliang - 0)).toFixed(2),
      //   heji: (((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0) + (xiaoshoujiage - 0) * (shuliang - 0)) * 1.075).toFixed(2)
      // })
      let purcost = isNaN((purchase_price - 0) * (shuliang - 0)) ? 0 : ((purchase_price - 0) * (shuliang - 0))

      let logcost = null
      if (this.state.currType === '3') {
        logcost = this.props.form.getFieldValue('deliver_fee') - 0 || 0
      } else if (this.state.currType === '2') {
        logcost = 0
      } else {
        logcost = isNaN(((distance - 0) * (deliver_price - 0)) * saler_num2) ? 0 : (((distance - 0) * (deliver_price - 0)) * saler_num2)
      }
      let sales = isNaN((saler_price - 0) * (shuliang - 0)) ? 0 : (saler_price - 0) * (shuliang - 0)
      let diffSales = isNaN((sales - purcost - logcost) / shuliang) ? 0 : ((sales - purcost - logcost) / shuliang)
      let total = isNaN((saler_price - 0) * (shuliang - 0)) ? 0 : (saler_price - 0) * (shuliang - 0)
      // let a = ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? 0 : ((total * 1.075).toFixed(2) - (this.state.balance - 0))
      this.setState({
        purchaseCost: purcost.toFixed(2),
        logisticsCost: logcost.toFixed(2),
        sales: sales.toFixed(2),
        diffInSales: diffSales.toFixed(2),
        total: (total * 1.075).toFixed(2),
        yuePay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? (total * 1.075).toFixed(2) : (this.state.balance - 0),
        xinyongPay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? 0 : ((total * 1.075).toFixed(2) - (this.state.balance - 0)),
        maoli: sales.toFixed(2) - purcost.toFixed(2) - logcost.toFixed(2),
      }, () => {
        if ((this.state.xinyongPay - 0) > 0) {
          this.setState({
            payType: '赊销',
          })
        } else {
          this.setState({
            payType: '预付款',
          })
        }
      })

      // if (this.props.location.pathname === '/order/doOrder') {
      //   return false
      // }
      // this.props.getNum(yunju, yunfeidanjia, shuliang, xiaoshoujiage)
    }, 100)
    let value = e.target.value
    setTimeout(() => {
      this.props.dispatch({
        type: 'order/getModalPrice',
        payload: {
          purchase_price: this.props.form.getFieldValue('purchase_price') ? this.props.form.getFieldValue('purchase_price') : 0,
          deliver_price: this.props.form.getFieldValue('deliver_price') ? this.props.form.getFieldValue('deliver_price') : 0,
          price: value ? value : 0,
          distance: this.props.form.getFieldValue('distance') ? this.props.form.getFieldValue('distance') : 0,
          saler_num: this.props.form.getFieldValue('saler_num') ? this.props.form.getFieldValue('saler_num') : 0,
        },
      }).then(() => {
        this.setState({
          saler_price_modal: this.props.modal_price,
        })
      })
    }, 10)
  }

  calculation = (e) => {
    setTimeout(() => {
      this.props.form.setFieldsValue({
        saler_num: isNaN(this.props.form.getFieldValue('shuliang') - 0) ? undefined : this.props.form.getFieldValue('shuliang') - 0,
      })
    }, 150)
    setTimeout(() => {
      this.props.form.setFieldsValue({
        saler_num2: this.props.form.getFieldValue('shuliang'),
      })
      let purchase_price = this.props.form.getFieldValue('purchase_price')
      let shuliang = this.props.form.getFieldValue('shuliang')
      let distance = this.props.form.getFieldValue('distance') || 0
      let deliver_price = this.props.form.getFieldValue('deliver_price') || 0
      let saler_price = this.props.form.getFieldValue('saler_price')
      let saler_num2 = this.props.form.getFieldValue('saler_num2') || 0
      // this.setState({
      //   yunfei: ((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0)).toFixed(2),
      //   huofei: ((xiaoshoujiage - 0) * (shuliang - 0)).toFixed(2),
      //   heji: (((yunju - 0) * (yunfeidanjia - 0) * (shuliang - 0) + (xiaoshoujiage - 0) * (shuliang - 0)) * 1.075).toFixed(2)
      // })
      let purcost = isNaN((purchase_price - 0) * (shuliang - 0)) ? 0 : ((purchase_price - 0) * (shuliang - 0))
      let logcost = null
      if (this.state.currType === '3') {
        logcost = this.props.form.getFieldValue('deliver_fee') - 0 || 0
      } else if (this.state.currType === '2') {
        logcost = 0
      } else {
        logcost = isNaN(((distance - 0) * (deliver_price - 0)) * saler_num2) ? 0 : (((distance - 0) * (deliver_price - 0)) * saler_num2)
      }
      let sales = isNaN((saler_price - 0) * (shuliang - 0)) ? 0 : (saler_price - 0) * (shuliang - 0)
      let diffSales = isNaN((sales - purcost - logcost) / shuliang) ? 0 : ((sales - purcost - logcost) / shuliang)
      let total = isNaN((saler_price - 0) * (shuliang - 0)) ? 0 : (saler_price - 0) * (shuliang - 0)
      // let a = ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? 0 : ((total * 1.075).toFixed(2) - (this.state.balance - 0))
      this.setState({
        purchaseCost: purcost.toFixed(2),
        logisticsCost: logcost.toFixed(2),
        sales: sales.toFixed(2),
        diffInSales: diffSales.toFixed(2),
        total: (total * 1.075).toFixed(2),
        yuePay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? (total * 1.075).toFixed(2) : (this.state.balance - 0),
        xinyongPay: ((this.state.balance - 0) - (total * 1.075).toFixed(2)) >= 0 ? 0 : ((total * 1.075).toFixed(2) - (this.state.balance - 0)),
        maoli: sales.toFixed(2) - purcost.toFixed(2) - logcost.toFixed(2),

      }, () => {
        if ((this.state.xinyongPay - 0) > 0) {
          this.setState({
            payType: '赊销',
          })
        } else {
          this.setState({
            payType: '预付款',
          })
        }
      })

      // if (this.props.location.pathname === '/order/doOrder') {
      //   return false
      // }
      // this.props.getNum(yunju, yunfeidanjia, shuliang, xiaoshoujiage)
    }, 150)
  }

  calculationDeliver = () => {

  }

  renderOption = (item) => {
    return (
      <Option2 key={item.delivery_mobile} value={item.delivery_contact}>
        {item.delivery_contact}
      </Option2>
    )
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // delete values.cust_id2
        // delete values.cust_id3
        // delete values.delivery
        // delete values.site_id2
        // delete values.site_id3
        values.recv_time = values.recv_time.format('YYYY-MM-DD HH:00:00')
        values.pay_type = '1'
        if (values.deliver_type === '1') {
          values.deliver_type = values.cus_deliver_type
        }
        if (this.props.modify) {
          values.id = this.props.currentOrder.order_id
          this.props.dispatch({
            type: 'orderDetail/modifySave',
            payload: {
              form: values,
            },
          }).then(() => {
            this.setState({
              step: 1,
              visible: false,
              title: '采购信息',
            })
          })
        } else if (this.props.confirm) {
          values.id = this.props.currentOrder.order_id
          this.props.dispatch({
            type: 'orderDetail/confirmOrder',
            payload: {
              form: values,
            },
          }).then(() => {
            this.setState({
              step: 1,
              visible: false,
              title: '采购信息',
            })
            this.props.dispatch({
              type: 'order/fetch', payload: {
                order_status: '1',
                find_str: '',
                order_type: this.props.order_type,
              },
            })
          })
        } else {
          this.props.dispatch({
            type: 'order/addOrder',
            payload: {
              values,
            },
          }).then(() => {
            this.setState({
              step: 1,
              visible: false,
              title: '采购信息',
            })
            this.props.dispatch({
              type: 'order/save',
              payload: {currentTab: 'icon-icon-test9', currentIndex: 0},
            })
            this.props.dispatch({
              type: 'order/fetch', payload: {
                order_status: '1',
                find_str: '',
              },
            })
          })
        }
        this.props.dispatch({
          type: 'order/save',
          payload: {currentTab: 'daizhifu', currentIndex: 0},
        })
      } else {
        // Object.keys(err).forEach((key, i) => {
        //   message.error(`请检查${key}字段是否填写正确`)
        // })
        message.error(`请检查字段是否全部填写正确`)
        console.log(err)
      }
    })
  }

  autoSelect = (value, option) => {
    this.props.form.setFieldsValue({
      recv_phone: option.key,
    })
  }

  changeWay = (value, item) => {
    if (value === '1') {
      if (this.state.distance && this.state.deliver_price) {
        this.props.form.setFieldsValue({
          distance: this.state.distance,
          deliver_price: this.state.deliver_price,
        })
      }
    } else {
      this.setState({
        distance: this.props.form.getFieldValue('distance'),
        deliver_price: this.props.form.getFieldValue('deliver_price'),
      }, () => {
        this.props.form.setFieldsValue({
          distance: '0',
          deliver_price: '0',
        })
      })
    }
    this.calculation()
  }

  typeChange = (val, item) => {
    this.setState({
      currType: val,
    })
    if (val === 2 || this.props.form.getFieldValue('cus_deliver_type') === '3') {
      this.props.form.setFieldsValue({
        distance: 0,
        deliver_price: 0,
        saler_num2: 0,
      })
    }
    setTimeout(() => {
      this.calculation()
    }, 150)
  }

  render() {
    const {children, customOption, siteOption, supplierOption, goodsOption} = this.props
    const {getFieldDecorator} = this.props.form
    const customOptions = customOption.map(option => {
      return <Option2 key={option.id} value={option.id} mobile={option.customer_mobile}
                      contact={option.customer_contact} balance={option.balance} credit={option.credit}
                      credit_used={option.credit_used}>{option.customer_name}</Option2>
    })
    const siteOptions = siteOption.map(option => {
      return <Option2 key={option.id}
                      sitetype={option.site_type}
                      usertype={option.user_type_name}
                      province={option.delivery_province}
                      city={option.delivery_city}
                      area={option.delivery_area}
                      address={option.detailed_address}
                      shouhuo={option.shouhuo}
                      value={option.id}>{option.site_name}</Option2>
    })
    const supplierOptions = supplierOption.map(option => {
      return <Option2 key={option.id} contact={option.supp_contact} mobile={option.supp_mobile} balance={option.balance}
                      value={option.id}>{option.supp_name}</Option2>
    })
    const goodsOptions = goodsOption.map(option => {
      return <Option2 key={option.id} source={option.origin_gas_source}
                      contact={option.cargo_contact}
                      mobile={option.cargo_mobile}
                      province={option.cargo_province}
                      city={option.cargo_city}
                      area={option.cargo_area}
                      address={option.detailed_address}
                      report={option.temperament_report}
                      value={option.id}>{option.name_gas_source}</Option2>
    })
    return (
      <div onClick={this.showModal} style={{display: 'inline-block'}}>
        {children}
        <Modal
          className='orderModal'
          title={this.state.title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          width={1100}
          style={{top: 20}}
        >
          <Form layout='inline' style={{padding: '0 25px'}}>
            <Row>
              <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>
                供应商信息
                <div style={{
                  position: 'absolute',
                  top: 1,
                  left: 115,
                  backgroundColor: '#FFE595',
                  color: '#545F76',
                  fontSize: 15,
                  padding: '2px 10px',
                  borderRadius: 4,
                }}><Icon type="red-envelope" theme="outlined"/>&nbsp;采购预付款余额： {this.state.suppbalance} 元</div>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="供应商名称" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('supp_id', {
                    rules: [{
                      required: true,
                      message: '此项为必选项！',
                    }],
                  })(
                    <AutoComplete placeholder="请选择供应商名称" style={{width: 185}} onChange={this.suppChange}
                                  dataSource={supplierOptions}
                                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="供应商联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('supp_id2')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="联系电话" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('supp_id3')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="采购价" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('purchase_price', {
                    rules: [{required: true, message: '请填写数字！', pattern: REGS.number, max: 10}],
                  })(
                    <Input placeholder='请填写采购价' addonAfter='元 / 吨' onChange={this.calculation}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem labelCol={{span: 8}} wrapperCol={{span: 7}} label="数量" hasFeedback
                          style={{display: 'block', marginLeft: '-5px'}}>
                  {getFieldDecorator('shuliang', {
                    rules: [{required: true, message: '请填写数字！'}],
                  })(
                    <InputNumber placeholder="请填写数量" addonAfter='吨' onChange={this.calculation}
                                 disabled={!!this.props.confirm} max={22} min={0} step={0.001}
                                 precision={3} style={{width: 150}}/>,
                  )}
                  <div style={{
                    position: 'absolute',
                    border: '1px solid #d9d9d9',
                    backgroundColor: '#fafafa',
                    top: '-7px',
                    right: 0,
                    padding: '0 11px',
                    height: 32,
                    lineHeight: '30px',
                    borderRadius: '0 3px 3px 0',
                  }}>吨
                  </div>
                </FormItem>
              </Col>
              <Col span={6} style={{paddingTop: 7, textAlign: 'right'}}>
                <div style={{fontSize: 16}}>采购金额：<span
                  style={{color: '#FF4241'}}>{this.state.purchaseCost}元</span></div>
              </Col>
            </Row>
            <Divider dashed={true}/>
            <Row>
              <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>气源信息</Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="气源名称" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('goods_id', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <AutoComplete placeholder="请选择气源名称" style={{width: 185}} onChange={this.goodsChange}
                                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                  dataSource={goodsOptions}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="气源产地" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('goods_source')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="气质报告" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('qizhibaogao')(
                    <div>
                      {this.state.report ?
                        <div style={{color: '#3477ED', cursor: 'pointer'}} onClick={this.openPDF}>
                          <Icon type="file-text"/> 查看气质报告
                        </div>
                        :
                        <div>暂无气质报告</div>
                      }
                    </div>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="装货联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('goods_contact')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={16}>
                <FormItem labelCol={{span: 5}} wrapperCol={{span: 7}} label="联系电话" hasFeedback
                          style={{display: 'block', marginLeft: '-5px', marginBottom: 10}}>
                  {getFieldDecorator('goods_mobile')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={16}>
                <FormItem labelCol={{span: 5}} wrapperCol={{span: 12}} label="装货地址" hasFeedback
                          style={{display: 'block', marginLeft: '-5px', marginBottom: 10}}>
                  {getFieldDecorator('goods_delivery')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Divider dashed={true}/>
            <Row>
              <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>
                客户信息
                <div style={{
                  position: 'absolute',
                  top: 1,
                  left: 115,
                  backgroundColor: '#FFE595',
                  color: '#545F76',
                  fontSize: 15,
                  padding: '2px 10px',
                  borderRadius: 4,
                }}><Icon type="red-envelope"
                         theme="outlined"/>&nbsp;客户余额： {this.state.custombalance} 元&nbsp;&nbsp;&nbsp;&nbsp;<Icon
                  type="schedule" theme="outlined"/>&nbsp;剩余信用额度： {this.state.creditbalance} 元</div>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="客户名称" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('cust_id', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <AutoComplete placeholder="请选择客户名称" style={{width: 185}} onChange={this.customerChange}
                                  dataSource={customOptions}
                                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="客户联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('cust_id2')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="联系电话" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('cust_id3')(
                    <Input placeholder="自动生成，非手填" disabled/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="销售价" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('saler_price', {
                    rules: [{
                      required: true,
                      message: '请填写数字！',
                      pattern: REGS.number,
                      max: 10,
                    }],
                  })(
                    <Input placeholder='请填写销售价' addonAfter='元 / 吨' onChange={this.calculationSaler}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={9} style={{color: '#2978EE', fontSize: 16, display: 'none'}}>
                <div style={{paddingLeft: 35, lineHeight: '38px', fontFamily: '微软雅黑'}}>模型价：￥<span
                  style={{color: 'rgb(255, 66, 65)', fontWeight: 600}}>{this.state.saler_price_modal}</span> 元/吨
                  <Tooltip title="模型销售价格是根据业务大数据及数学模型计算出的销售价格,仅供参考。" placement="bottomLeft">
                    <IconFont type='icon-iconfontwenhao1' style={{
                      fontSize: 18,
                      marginLeft: 13,
                      marginTop: '-2px',
                      verticalAlign: 'middle',
                      color: '#333',
                    }}/>
                  </Tooltip>
                </div>
              </Col>
              <Col span={10}>
                <FormItem labelCol={{span: 8}} wrapperCol={{span: 13}} label="数量" hasFeedback
                          style={{display: 'block', marginLeft: '-5px'}}>
                  {getFieldDecorator('saler_num')(
                    <InputNumber placeholder="请填写数量" addonAfter='吨' max={22} step={0.001} disabled
                                 style={{width: 150}}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={6} style={{paddingTop: 7, textAlign: 'right'}}>
                <div style={{fontSize: 16}}>销售额：<span
                  style={{color: '#FF4241'}}>{this.state.sales}元</span></div>
              </Col>
            </Row>
            <Divider dashed={true}/>
            <Row>
              <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>站点信息</Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="站点简称" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('site_id', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <AutoComplete placeholder="请选择站点名称" style={{width: 185}} onChange={this.siteChange}
                                  disabled={!!this.props.confirm}
                                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                  dataSource={siteOptions}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="站点类型" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('site_id2')(
                    <Select placeholder="自动生成，非手填" style={{width: 185}} disabled>
                      <Option value="1">加气站</Option>
                      <Option value="2">气化站</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={8} style={{visibility: 'hidden'}}>
                <FormItem {...formItemLayout} label="用户类型" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('site_id3')(
                    <Select placeholder="自动生成，非手填" style={{width: 185}} disabled></Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="收货联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('recv_contact', {
                    rules: [
                      {required: true, message: '请填写收货联系人', pattern: REGS.name, max: 10},
                    ],
                  })(
                    <AutoComplete
                      onChange={this.autoSelect}
                      disabled={!!this.props.confirm}
                      dataSource={this.state.dataSource}
                      placeholder="请填写收货联系人姓名"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="联系电话" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('recv_phone', {
                    rules: [{
                      required: true,
                      message: '请填写正确联系电话！',
                      max: 11,
                      pattern: REGS.phone,
                    }],
                    validateTrigger: 'onBlur',
                  })(
                    <Input placeholder="请填写联系电话"/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="交货时间" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('recv_time', {
                    rules: [{required: true, message: '请选择交货时间！'}],
                  })(
                    <DatePicker placeholder="请选择交货时间" format={'YYYY-MM-DD HH:00:00'} showTime={{format: 'HH'}}
                                disabled={!!this.props.confirm}
                                locale={locale}/>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="配送方式" hasFeedback style={{display: 'block', marginBottom: 10}}>
                  {getFieldDecorator('deliver_type', {
                    rules: [{required: true, message: '此项为必选项！'}],
                  })(
                    <Select placeholder="请选择配送方式" style={{width: 150}}
                            onChange={this.typeChange}>
                      <Option value="1">配送</Option>
                      <Option value="2">自提</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={16}>
                <FormItem labelCol={{span: 5}} wrapperCol={{span: 18}} label="收货地址" hasFeedback
                          style={{display: 'block', marginLeft: '-5px'}}>
                  {getFieldDecorator('delivery')(
                    <Input placeholder="请选择收货地址" disabled/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Divider dashed={true}/>
            <Row style={{display: this.state.currType === '2' ? 'none' : 'block'}}>
              <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>物流信息</Col>
              <Col span={24}>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="定价方式" hasFeedback style={{display: 'block', marginBottom: 10}}>
                    {getFieldDecorator('cus_deliver_type', {
                      rules: [{required: this.state.currType !== '2', message: '选择计价方式！'}],
                    })(
                      <Select placeholder="请选择计价方式" style={{width: 150}} onChange={this.typeChange}>
                        <Option value="1">自动计算</Option>
                        <Option value="3">手动填写</Option>
                      </Select>,
                    )}
                  </FormItem>

                </Col>
              </Col>
            </Row>
            {this.state.currType === '1' ? <>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="运距" hasFeedback style={{display: 'block', marginBottom: 10}}>
                    {getFieldDecorator('distance', {
                      rules: [{required: true, message: '请填写数字！', pattern: REGS.number, max: 10}],
                    })(
                      <Input placeholder="请填写运距" addonAfter='公里' onChange={this.calculation}/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label="运费单价" hasFeedback
                            style={{display: 'block', marginLeft: '-55px'}}>
                    {getFieldDecorator('deliver_price', {
                      rules: [{required: true, message: '请填写数字！', pattern: REGS.number, max: 10}],
                    })(
                      <Input placeholder="请填写运费单价" addonAfter='元 / 吨 / 公里' onChange={this.calculation}/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem labelCol={{span: 6}} wrapperCol={{span: 16}} label="数量" hasFeedback
                            style={{display: 'block', marginLeft: '-5px'}}>
                    {getFieldDecorator('saler_num2')(
                      <InputNumber placeholder="请填写数量" addonAfter='吨' max={22} step={0.001} disabled
                                   style={{width: 150}}/>,
                    )}
                    <div style={{
                      position: 'absolute',
                      border: '1px solid #d9d9d9',
                      backgroundColor: '#fafafa',
                      top: '-7px',
                      right: 0,
                      padding: '0 11px',
                      height: 32,
                      lineHeight: '30px',
                      borderRadius: '0 3px 3px 0',
                    }}>吨
                    </div>
                  </FormItem>
                </Col>
                <Col span={24} style={{fontSize: 16, marginTop: 6, textAlign: 'right', marginBottom: 4}}>
                  <span>物流成本：<span style={{color: 'red', marginRight: 5}}>{this.state.logisticsCost}</span>元</span>
                </Col>
              </Row>
              <Divider dashed={true}/></> : this.state.currType === '3' ? <>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="运费总额" hasFeedback style={{display: 'block', marginBottom: 10}}>
                    {getFieldDecorator('deliver_fee', {
                      rules: [{required: true, message: '请填写数字！', pattern: REGS.number, max: 10}],
                    })(
                      <Input placeholder="请填写运费" addonAfter='元' onChange={this.calculation}/>,
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                </Col>
                <Col span={24} style={{fontSize: 16, marginTop: 6, textAlign: 'right', marginBottom: 4}}>
                  <span>物流成本：<span style={{color: 'red', marginRight: 5}}>{this.state.logisticsCost}</span>元</span>
                </Col>
              </Row>
              <Divider dashed={true}/></> : null}
            <div style={{textAlign: 'right'}}>
              <div style={{color: '#A1A9B3', fontSize: 18, marginBottom: 16}}>

                  <span style={{marginRight: 25}}>毛利润：<span
                    style={{color: 'rgb(255, 66, 65)'}}>{this.state.maoli}</span>元</span>
                <span style={{marginRight: 25}}>进销差：<span
                  style={{color: 'rgb(255, 66, 65)'}}>{this.state.diffInSales}</span>元/吨</span>
                <span>付款方式：{this.state.payType}</span>
              </div>
              <div style={{color: '#545F76', fontSize: 20, marginBottom: 8, fontWeight: 600}}>合计金额：
                <span style={{color: '#FF4241', fontSize: 22}}>￥{this.state.total}</span>&nbsp;&nbsp;
                <span style={{fontSize: 18}}>
                    (多含7.5%预付款)
                  </span>
              </div>
              <div style={{
                color: '#A1A9B3',
                fontSize: 18,
                marginBottom: 8,
              }}>余额支付{this.state.yuePay}元，信用支付{this.state.xinyongPay}元
              </div>
            </div>
          </Form>
          <div
            style={{
              height: 84,
              backgroundColor: '#F4F6F8',
              borderTop: '1px solid #CCCED2',
              margin: '30px -23px -23px',
            }}>
            <div>
              <Button size='large' type='primary'
                      style={{float: 'right', marginTop: 22, marginRight: 40, width: 140}} onClick={this.submit}>提交订单
                ></Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {customOption, supplierOption, siteOption, goodsOption, currentTab, order_type, modal_price} = state.order
  return {
    customOption,
    supplierOption,
    siteOption,
    goodsOption,
    currentTab,
    order_type,
    modal_price,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(Form.create()(OrderModal))
