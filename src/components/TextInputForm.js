import React, { PureComponent } from 'react'
import { TextInput, Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import IconButtonForm from './IconButtonForm'
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import CommonStyles from '../constants/styles'
import MessageValidate from './MessageValidate'
import { Helper } from '../utils'

class CustomTextInput extends PureComponent {
  static defaultProps = {
    value: '',
    placeholder: '',
    label: null,
    rightIcon: null, // set if use icon button
    rightText: null, // set if use text button
    onPressRightButton: null,
    iconSize: 20,
    containerStyle: null,
    onPressForm: null,
    editable: true,
  }

  constructor(props) {
    super(props);
    this.onPressRightButton = this.onPressRightButton.bind(this)
    this.onPressForm = this.onPressForm.bind(this)
  }

  onPressRightButton() {
    if (this.props.onPressRightButton) {
      this.props.onPressRightButton()
    }
  }

  onPressForm() {
    if (this.props.onPressForm) {
      this.props.onPressForm()
    }
  }

  render() {
    const {
      value,
      placeholder,
      label,
      rightIcon,
      iconSize,
      rightText,
      containerStyle,
      containerInputStyle,
      textStyle,
      rightStyle,
      editable,
      placeholderRequire,
      messageValidate,
      colorMessageValidate,
      onPressForm
    } = this.props
    const newProps = { ...this.props };
    const pointerEvents = (!editable && onPressForm) ? 'none' : 'auto'
    const CustomContainerView = !editable && onPressForm ? TouchableOpacity : View

    return (
      <CustomContainerView style={containerStyle}
        onPress={this.onPressForm}>
        <View
          pointerEvents={pointerEvents}
          style={[styles.container, containerInputStyle]}>
          {
            placeholderRequire &&
            (
              <View style={CommonStyles.position_absolute_full}>
                <View style={styles.viewPlaceHolder}>
                  <Text style={[styles.textInput, { color: Colors.gray_5 }]}>{placeholderRequire}</Text>
                  <Text style={[styles.textInput, { color: Colors.red_4 }]}>*</Text>
                </View>
              </View>
            )
          }
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              ref={this.props.innerRef}
              value={Helper.checkNullText(value)}
              underlineColorAndroid='transparent'
              autoCorrect={false}
              placeholder={placeholder}
              style={[styles.textInput, textStyle]}
              autoCapitalize={'none'}
              {...newProps}
            />
          </View>
          {
            (rightIcon || rightText) && (
              <IconButtonForm
                icon={rightIcon}
                text={rightText}
                iconSize={iconSize}
                style={rightStyle}
                onPress={this.onPressRightButton}
              />
            )
          }
        </View>
        <MessageValidate
          message={messageValidate}
          textColor={colorMessageValidate || Colors.red}
        />
      </CustomContainerView>
    )
  }
}

export default TextInputForm = React.forwardRef((props, ref) => {
  return (
    <CustomTextInput innerRef={ref} {...props} />
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_5,
    paddingBottom: 5,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontFamily: Fonts.hiraKakuProW3,
    ...CommonStyles.textJp12,
    color: Colors.pink_1,
  },
  textInput: {
    fontFamily: Fonts.hiraKakuProW3,
    ...Platform.select({
      android: {
        padding: 0,
        lineHeight: 18,
      }
    }),
    fontSize: 18,
  },
  viewPlaceHolder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    ...Platform.select({
      android: {
        paddingBottom: 10
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
