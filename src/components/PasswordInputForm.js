import React, { PureComponent } from 'react'
import { TextInput, Text, View, StyleSheet, Platform, Image } from 'react-native'
import IconButtonForm from './IconButtonForm'
import Colors from '../constants/colors'
import { i18next } from '../utils'
import Fonts from '../constants/fonts'
import CommonStyles from '../constants/styles'
import Images from '../constants/images'

class CustomTextInput extends PureComponent {
  static defaultProps = {
    placeholder: '',
    label: null,
    containerStyle: null,
    keyboardType: 'default'
  }

  constructor(props) {
    super(props);

    this.onPressRightButton = this.onPressRightButton.bind(this)

    this.state = {
      text: '',
      isShow: false,
    }
  }

  onChangeText = value => {
    this.props.onChangeText && this.props.onChangeText(value)
  }

  onEndEditing = () => {
    this.props.onEndEditing && this.props.onEndEditing()
  }

  onPressRightButton() {
    const isShow = !this.state.isShow
    this.setState({ isShow })
  }

  render() {
    const { isShow } = this.state
    const {
      placeholder,
      label,
      placeholderTextColor,
      selectionColor,
      value,
      messageValidate,
      containerInputStyle,
      containerStyle,
      colorMessageValidate,
      innerRef,
      keyboardType
    } = this.props
    const showTintColor = this.props.showTintColor || Colors.orange_3
    const textStyle = { ...styles.textInput, ...this.props.textStyle }

    return (
      <View style={containerStyle}>
        <View style={[styles.container, containerInputStyle]}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              ref={innerRef}
              value={value}
              underlineColorAndroid="transparent"
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              style={textStyle}
              onChangeText={this.onChangeText}
              secureTextEntry={!isShow}
              maxLength={30}
              selectionColor={selectionColor}
              onEndEditing={this.onEndEditing}
              autoCapitalize={'none'}
              keyboardType={keyboardType}
            />
          </View>
          <IconButtonForm
            text={!isShow ? i18next.t('Show') : i18next.t('Hide')}
            onPress={this.onPressRightButton}
            tintColor={showTintColor}
          />
        </View>
        {
          (messageValidate && messageValidate !== '') &&
          <View style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Images.icon_warning} style={{ width: 16, height: 16, marginRight: 5 }} />
            <Text
              style={[styles.textMessageValidate, { color: colorMessageValidate || Colors.red }]}>
              {messageValidate}
            </Text>
          </View>
        }
      </View>
    )
  }
}

export default PasswordInputForm = React.forwardRef((props, ref) => {
  return (
    <CustomTextInput innerRef={ref} {...props} />
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_4,
    paddingBottom: 5,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.pink_1,
  },
  textInput: {
    fontSize: 18,
    fontFamily: Fonts.hiraKakuProW3,
    ...Platform.select({
      android: {
        padding: 0,
        lineHeight: 18,
      }
    }),
  },
  textMessageValidate: {
    fontFamily: Fonts.hiraKakuProW3,
    ...CommonStyles.textJp12,
    flex: 1,
    // marginTop: 6,
  }
});
