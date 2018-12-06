import React from 'react'
import { Modal } from 'antd'

class RotateModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      rotate: 0,
    }
  }

  rotateImage = () => {
    let rotate = this.state.rotate + 90
    this.setState({
      rotate: rotate,
    })
  }

  render() {
    const {visible, previewImage, closePreView} = this.props
    return (
      <Modal
        visible={visible}
        style={{top: 50}}
        width={800}
        className='transparents'
        destroyOnClose={true}
        onCancel={closePreView}
        bodyStyle={{
          padding: 0,
          transform: `rotate(${this.state.rotate}deg)`,
          transition: 'all 0.5s',
          cursor: 'pointer',
        }}
        footer={null}>
        <img alt='' width='100%' height='100%' onClick={this.rotateImage} src={previewImage}/>
      </Modal>
    )
  }
}

export default RotateModal
