import { Component } from 'react'
import { Modal } from 'antd'


class ImageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: false,
    });
  };

  render() {
    const {children, imgUrl, title} = this.props;
    return (
      <div style={{cursor: 'pointer', color: '#3477ED', display: 'inline-block'}} onClick={this.showModelHandler}>
        {children}
        <Modal
          title={title}
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModelHandler}
          width={1200}
        >
          <img src={imgUrl} alt="" width='100%' height='100%'/>
        </Modal>
      </div>
    );
  }
}

export default ImageModal
