import { Card, Tabs, Input } from 'antd'
import ClientTable from './components/ClientTable'
import SupplierTable from './components/SupplierTable'

const TabPane = Tabs.TabPane
const Search = Input.Search

export default () => {
  return (
    <div>
      <div className={'searchBox'}>
        <Search style={{width: 200, marginLeft: 10}} placeholder="输入关键字进行查询"
                onSearch={value => console.log(value)}/>
      </div>
      <Card>
        <Tabs>
          <TabPane tab="客户余额" key='1'>
            <ClientTable></ClientTable>
          </TabPane>
          <TabPane tab="供应商余额" key='2'>
            <SupplierTable></SupplierTable>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}
