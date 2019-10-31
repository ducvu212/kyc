import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Images from '../constants/images'
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'

export default class IconButtonForm extends PureComponent {
  static defaultProps = {
    icon: null,
    iconSize: 20,
    text: null,
    textSize: 16,
    tintColor: Colors.orange_2,
    onPress: null,
    underline: true,
    tintColorDisable: Colors.gray
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }


  onPress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    const { icon,
      iconSize,
      text,
      textSize,
      tintColor,
      underline,
      disabled,
      tintColorDisable
    } = this.props
    const typeStyle = icon ? { width: iconSize } : null
    const textStyle = {
      textDecorationLine: underline ? 'underline' : 'none',
      fontSize: textSize,
      color: disabled ? tintColorDisable : tintColor
    }

    return (
      <TouchableOpacity
        style={[styles.icon, typeStyle, this.props.style]}
        onPress={this.onPress}
        disabled={disabled}
      >
        {
          icon && (
            <Image
              source={icon}
              resizeMode='contain'
              style={{ width: iconSize, height: iconSize }}
            />
          )
        }
        {
          text && (
            <View style={styles.textButton}>
              <Text style={[styles.text, textStyle]}>
                {text}
              </Text>
            </View>
          )
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
  },
  textButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.hiraKakuProW6,
  },
})
