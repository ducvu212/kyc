import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import Images from '../constants/images'
import Fonts from '../constants/fonts'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'

export default class MessageValidate extends PureComponent {
  static defaultProps = {
    message: null,
    style: null,
    textColor: Colors.red,
    center: false
  }

  render() {
    const {
      message,
      style,
      textColor,
      center
    } = this.props

    if (!message || message === '') return null
    const styleText = center ? { color: textColor } : { color: textColor, flex: 1 }

    return (
      <View style={[styles.container, style]}>
        <Image
          source={Images.icon_warning}
          style={styles.image}
        />
        <Text
          style={[styles.text, styleText]}
        >
          {message}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  text: {
    fontFamily: Fonts.hiraKakuProW3,
    ...CommonStyles.textJp12,
  },
})
