import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import CommonStyles from '../constants/styles'

export default class ButtonForm extends PureComponent {
  static defaultProps = {
    text: '',
    loading: false,
    disabled: false,
    invertedColors: false,
    loadingColor: Colors.white,
    style: null,
    textStyle: null,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.getStyle = this.getStyle.bind(this)
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  getStyle() {
    const { loading, disabled, invertedColors } = this.props
    let styleContainer = invertedColors ?
      { ...styles.container, ...styles.cancelContainer }
      :
      { ...styles.container, ...styles.successContainer }
    let styleText = invertedColors ?
      { ...styles.text, ...styles.cancelText }
      :
      { ...styles.text, ...styles.successText }

    if (loading) {
      styleContainer = { ...styleContainer, ...styles.loadingContainer }
      styleText = { ...styleText, ...styles.loadingText }
    }
    if (disabled) {
      styleContainer = { ...styleContainer, ...styles.disabledContainer }
      styleText = { ...styleText, ...styles.disabledText }
    }

    return {
      styleContainer,
      styleText,
    }
  }

  render() {
    const { text, disabled, loading, loadingColor, style, textStyle } = this.props
    const { styleContainer, styleText } = this.getStyle()

    return (
      <TouchableOpacity
        disabled={disabled || loading || false}
        style={[styleContainer, style]}
        onPress={this.onPress}>
        {
          loading && <ActivityIndicator color={loadingColor} size='small' />
        }
        <Text numberOfLines={1} style={[styleText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  text: {
    ...CommonStyles.textJp16,
    fontFamily: Fonts.hiraKakuProW6,
  },
  successContainer: {
    backgroundColor: Colors.orange,
  },
  cancelContainer: {
    backgroundColor: Colors.white,
    // borderWidth: 1,
    // borderColor: Colors.pink_1,
  },
  disabledContainer: {
    backgroundColor: Colors.gray_5
  },
  loadingContainer: {
    backgroundColor: Colors.pink_1
  },
  successText: {
    color: Colors.white,
  },
  cancelText: {
    color: Colors.orange,
  },
  disabledText: {
    color: Colors.white,
  },
  loadingText: {
    marginLeft: 5,
    color: Colors.white,
  }
})
