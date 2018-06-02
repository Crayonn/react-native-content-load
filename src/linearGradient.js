import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Linear extends PureComponent {
  render() {
    const { firstColor, secondColor, endX, endY, startX, stateY, ...restProps } = this.props;

    return (
      <LinearGradient
        {...restProps}
        end={{ x: endX || 0, y: endY || 0 }}
        start={{ x: startX || 0, y: stateY || 0 }}
        colors={[firstColor, secondColor]} />
    )
  }
}

export default Animated.createAnimatedComponent(Linear);
