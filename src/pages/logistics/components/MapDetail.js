import React, { PureComponent } from 'react'

class MapDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showDetail: false
    }
  }

  toggleMapDetail = (e) => {
    e.stopPropagation()
    this.setState({
      showDetail: !this.state.showDetail
    })
  }

  render() {
    return (
      <div>
        <div className='map-title' style={this.state.showDetail ? {top: 280} : {}} onClick={this.toggleMapDetail}>
          1123
        </div>
        <div className='map-detail' style={this.state.showDetail ? {height: 200} : {}}>123</div>
      </div>
    )
  }
}

export default MapDetail
