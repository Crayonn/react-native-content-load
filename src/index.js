import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Animated, } from 'react-native';
import LinearAnmiation from './linearGradient';
import PropTypes from 'prop-types';
import { hasParams, isArray, isNumber, isFunction } from './utils';
const paramsKey = ['color', 'startX', 'startY', 'endX', 'endY'];

/**
 * color  {
 *  first  [ color1, color2]
 *  second [ color3, color4],
 * }
 *
 * startX [0, 0.3],  startY endX endY is the same
 *
 */

export default class LinearWarpper extends React.PureComponent {
  static propTypes = {
    color: PropTypes.shape({
      first: PropTypes.array,
      second: PropTypes.array,
    }),
    startX: PropTypes.oneOfType(['array', 'number']),
    startY: PropTypes.oneOfType(['array', 'number']),
    endX: PropTypes.oneOfType(['array', 'number']),
    endY: PropTypes.oneOfType(['array', 'number']),
    speed: PropTypes.number,
    isLoop: PropTypes.bool,
  }

  static defaultProps = {
    color: {
      first: ['#CCC', '#F1F1F1', '#CCC'],
      second: ['#F1F1F1', '#CCC', '#CCC']
    },
    startX: 0,
    startY: 0.4,
    endX: 1,
    endY: 0.6,
    speed: 3000,
    isLoop: true,
  }

  constructor(props) {
    super(props);

    this.state = { ...this.initalAnimation() }
  }

  componentDidMount() {
    this.loopAnimated()
  }

  componentWillUnmount() {
    this.stopAnimated();
  }

  initalAnimation = () => {
    return paramsKey.reduce((acc, key) => {
      if (this.props[key]) {
        if (key === 'color') {
          acc[key] = { first: this.newAnimated(), second: this.newAnimated() };
        } else {
          acc[key] = isArray(this.props[key])
            ? this.newAnimated()
            : this.props[key];
        }
      }
      return acc;
    }, {})
  }

  newAnimated = () => {
    return new Animated.Value(0);
  }

  stopStateAnimation = (state) => {
    if (isNumber(state)) {
      return;
    }

    isFunction(state.stopAnimation) && state.stopAnimation();
  }

  createAnimatedTiming = (state, toValue) => {
    if (isNumber(state)) {
      return;
    }
    return Animated.timing(
      state,
      {
        toValue,
        duration: this.props.speed,
      }
    )
  }

  getColorAnimatend = (param) => {
    if (!param) {
      return;
    }

    const { first, second } = param;
    const { color } = this.state;
    color.first.stopAnimation()
    color.second.stopAnimation()
    color.first.setValue(0);
    color.second.setValue(0);

    return [
      this.createAnimatedTiming(color.first, first.length - 1),
      this.createAnimatedTiming(color.second, second.length - 1)]
  }

  getParamAnimated = (param, key) => {
    if (!hasParams(param) || isNumber(param)) {
      return;
    }

    this.stopStateAnimation(this.state[key]);
    this.state[key].setValue(0)
    return this.createAnimatedTiming(this.state[key], param.length - 1);
  }

  loopAnimated = () => {
    Animated.parallel(Object.keys(this.state).reduce((acc, key) => {

      const animated = key === 'color'
        ? this.getColorAnimatend(this.props[key])
        : this.getParamAnimated(this.props[key], key);
      if (animated) {
        acc = acc.concat(animated);
      }
      return acc;
    }, [])).start(() => {
      if (this.props.isLoop) {
        this.loopAnimated();
      }
    });
  }

  getInputRange = (array) => {
    if (!hasParams(array)) {
      return []
    }
    const length = array && array.length;
    return Array.from({ length }, (v, i) => i);
  }

  stopAnimated = () => {
    Object.keys(this.state).forEach(key => {
      if (key === 'color') {
        this.state.color.first.stopAnimation();
        this.state.color.second.stopAnimation();
      }

      this.stopStateAnimation(this.state[key]);
    })
  }

  getStateValue = (key) => {
    if (isNumber(this.state[key])) {
      return this.state[key];
    }

    if (!this.state[key]) {
      return;
    }

    return this.state[key].interpolate({
      inputRange: this.getInputRange(this.props[key]),
      outputRange: this.props[key],
    })
  }

  getStateColorValue = (key) => {
    const { color: propsColor } = this.props;
    const { color } = this.state;
    if (!(propsColor[key] && color[key])) {
      return []
    }

    return color[key].interpolate({
      inputRange: this.getInputRange(propsColor[key]),
      outputRange: propsColor[key],
    })
  }

  render() {
    const { children, classNames } = this.props;

    return (
      <LinearAnmiation
        firstColor={this.getStateColorValue('first')}
        secondColor={this.getStateColorValue('second')}
        startX={this.getStateValue('startX')}
        startY={this.getStateValue('startY')}
        endX={this.getStateValue('endX')}
        endY={this.getStateValue('endY')}
        style={classNames}>
        {children}
      </LinearAnmiation>
    )
  }
}
