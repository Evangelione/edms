import React from 'react'
import { Card, Tabs, Input } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import CompanyDetail from './components/CompanyDetail'
import SalesPerformance from './components/SalesPerformance'

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
      paneKey: key
    })
  }

  render() {
    return(
      <div>
        <PageTitle>我的公司</PageTitle>
        {this.state.paneKey === '2' ?
          <div className={'searchBox'}>
            <Search style={{width: 200, marginLeft: 10}} placeholder="输入关键字进行查询"
                    onSearch={value => console.log(value)}/>
          </div>
          : ''}
        <Card>
          <Tabs onChange={this.callback}>
            <TabPane tab="公司信息" key='1'>
              <CompanyDetail></CompanyDetail>
            </TabPane>
            <TabPane tab="销售业绩" key='2'>
              <SalesPerformance></SalesPerformance>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Company
