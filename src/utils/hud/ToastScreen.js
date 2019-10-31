import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import { HUD } from '../';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';

const { height } = Dimensions.get('window')
const DEFAULT_CONFIG = {
  POSITION_TYPE: {
    bottom: height - 120,
    center: height / 2,
    top: 100,
  },
  FADEIN_DURATION: 2000,
  FADEOUT_DURATION: 2000,
  FADE_DELAY: 2000,
  DELAY: 500,
}
const TOAST_DATA = []
const TOAST_OPTIONS = {
  fadeInDuration: DEFAULT_CONFIG.FADEIN_DURATION,
  fadeOutDuration: DEFAULT_CONFIG.FADEOUT_DURATION,
  fadeDelay: DEFAULT_CONFIG.FADE_DELAY,
  delay: DEFAULT_CONFIG.DELAY,
}

const initToastOptions = (options) => {
  let position = _.get(options, 'position') || DEFAULT_CONFIG.POSITION_TYPE.bottom
  if (typeof position === 'string') position = DEFAULT_CONFIG.POSITION_TYPE[position]

  return {
    ...TOAST_OPTIONS,
    ...options,
    position,
  }
}

export const changeToastData = (data, options) => {
  const toastOptions = initToastOptions(options)
  if (Array.isArray(data)) {
    data.forEach(item => {
      TOAST_DATA.push({
        data: item,
        options: toastOptions
      })
    })
  } else {
    TOAST_DATA.push({
      data,
      options: toastOptions
    })
  }
}

export class ToastScreen extends PureComponent {

  static options(passProps) {
    const statusBar = _.get(passProps, 'options.statusBar')
    return {
      statusBar: {
        backgroundColor: 'transparent',
        visible: true,
        ...statusBar
      },
    };
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      text: '',
    }
    this.opacityValue = new Animated.Value(0)
    this.options = {}

  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
      this.open()
    }
  }

  componentDidDisappear() {
    this.animation && this.animation.stop()
  }

  componentWillUnmount() {
    this.animation && this.animation.stop()
  }

  open() {
    if (this.props.data && this.props.data.length > 0) this.startAnimation()
  }

  startAnimation() {
    const { data, options } = TOAST_DATA[0]
    this.options = options

    this.setState({
      text: data
    }, () => {
      TOAST_DATA.shift(1)
      this.animation = this.createAnimation(this.options).start(() => {
        if (TOAST_DATA.length > 0) {
          this.startAnimation()
        } else {
          HUD.hideToast().catch(() => {})
        }
      })
    })
  }

  createAnimation(options) {
    const { fadeInDuration, fadeOutDuration, fadeDelay, delay } = options
    this.opacityValue.setValue(0)
    return Animated.sequence([
      Animated.timing(
        this.opacityValue,
        {
          toValue: 1,
          duration: fadeInDuration,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.opacityValue,
        {
          toValue: 0.0,
          duration: fadeOutDuration,
          delay: fadeDelay,
          useNativeDriver: true,
        }
      )
    ], {
        delay
      })
  }

  render() {
    const { position, textStyle, contentStyle } = this.options
    const { text } = this.state

    return (
      <View
        style={[styles.container, { top: position }]}
        pointerEvents='none'
      >
        <Animated.View
          style={[styles.content, { opacity: this.opacityValue }, contentStyle]}
        >
          <Text style={[styles.text, textStyle]}>
            {text}
          </Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
  },
})
