import { Animated } from 'react-native';

const createAnimation = (animation, value, duration, delay) => {
  return Animated.timing(
    animation,
    {
      toValue: value,
      duration: duration,
      // useNativeDriver: true,
      delay: delay,
    }
  )
}

export {
  createAnimation
}
