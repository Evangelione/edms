import PageTitle from '../../components/PageTitle/PageTitle'
import DetailForm from './components/DetailForm'

export default () => {

  return (
    <div>
      <PageTitle>我要下单</PageTitle>
      <DetailForm defaultSubmit={true} editable={true}></DetailForm>
    </div>
  )
}
