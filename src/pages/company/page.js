import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Input } from 'antd'
import CompanyDetail from './components/CompanyDetail'
import SalesPerformance from './components/SalesPerformance'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const Search = Input.Search

class Company extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paneKey: '1',
    }
  }

  callback = (key) => {
    this.setState({
      paneKey: key,
    })
    if (key === '2') {
      this.props.dispatch({
        type: 'company/fetchCompanyList',
        payload: {
          page: 1,
          find_str: '',
        },
      })
    }
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'company/fetchCompanyList',
      payload: {
        page: 1,
        find_str: value,
      },
    })
  }

  render() {
    return (
      <AnimatePage>
        {this.state.paneKey === '2' ?
          <div className={'searchBox'}>
            <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                    onSearch={this.iptSearch}/>
          </div>
          : ''}
        <Tabs onChange={this.callback}>
          <TabPane tab="公司信息" key='1'>
            <Card style={{paddingTop: 30}}>
              <CompanyDetail></CompanyDetail>
            </Card>
          </TabPane>
          <TabPane tab="销售业绩" key='2'>
            <Card style={{paddingTop: 30}}>
              <SalesPerformance></SalesPerformance>
            </Card>
          </TabPane>
        </Tabs>
      </AnimatePage>
    )
  }
}

export default connect()(Company)
