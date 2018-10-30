import { PureComponent } from 'react'
import Animated from 'animated/lib/targets/react-dom'

class AnimatePage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(200),
    }
  }

  UNSAFE_componentWillMount() {
    this.doAnimated()
  }

  doAnimated = () => {
    Animated.spring(this.state.anim, {toValue: 0, duration: 150}).start()
  }

  render() {
    return (
      <Animated.div style={{transform: [{translateX: this.state.anim}], position: 'relative'}}>
        {this.props.children}
      </Animated.div>
    )
  }
}

export default AnimatePage
