import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import Colors from '../constants/colors'
import IconButtonForm from './IconButtonForm'
import CommonStyles from '../constants/styles'
import Fonts from '../constants/fonts';
import MessageValidate from './MessageValidate'
import { i18next } from '../utils'

class CustomTextInput extends PureComponent {

  static defaultProps = {
    placeholder: '',
    value: null,
    containerStyle: null,
    viewOnly: true,
    editable: true,
    scrollEnabled: false,
    maxLength: 30,
    keyboardType: 'default',
    showTintColor: Colors.orange_3
  }

  constructor(props) {
    super(props);
    this.onPressRightButton = this.onPressRightButton.bind(this)

    this.state = {
      isShow: false
    }
  }

  onPressRightButton() {
    const isShow = !this.state.isShow
    this.setState({ isShow })
  }

  onChangeText = value => {
    this.props.onChangeText && this.props.onChangeText(value)
  }

  render() {
    const { isShow } = this.state
    const {
      placeholder,
      title,
      value,
      maxLength,
      styleTextInput,
      keyboardType,
      messageValidate,
      colorMessageValidate,
      placeholderTextColor,
      viewOnly,
      editable,
      scrollEnabled,
      showTintColor
    } = this.props
    const containerStyle = viewOnly ? styles.show_container : styles.edit_container
    const fontSize = viewOnly ? {
      fontSize: 14,
      ...Platform.select({
        ios: {
          paddingTop: 12,
        },
        android: {
          paddingVertical: 4,
        }
      }),
      flex: 1
    }
      : { fontSize: 12 }
    const styleLabel = (viewOnly && !value) ? { color: Colors.black_4 } : { color: Colors.orange }
    const marginTextInput = viewOnly ? { marginLeft: 16, flex: 2 } : { marginLeft: 0 }
    const pointerEvents = (viewOnly || !editable) ? 'none' : 'auto'
    const textPlaceHolder = viewOnly ? null : placeholder
    const required = (this.props.required && !viewOnly) ? ' *' : ''

    return (
      <View style={this.props.style}>
        <View style={[styles.container, containerStyle]}>
          {
            title &&
            (<Text
              style={[styles.title, styleLabel, fontSize]}>{`${title}${required}`}</Text>)
          }
          <View
            style={[styles.textInforField, marginTextInput]}>
            <View
              pointerEvents={pointerEvents}
              style={styles.viewInput}
            >
              <TextInput
                ref={this.props.innerRef}
                value={value}
                underlineColorAndroid='transparent'
                placeholder={textPlaceHolder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.textInput, styleTextInput]}
                autoCapitalize={'none'}
                maxLength={maxLength}
                keyboardType={keyboardType}
                scrollEnabled={scrollEnabled}
                secureTextEntry={!isShow}
                onChangeText={this.onChangeText}
              />
            </View>
            <IconButtonForm
              text={!isShow ? i18next.t('Show') : i18next.t('Hide')}
              onPress={this.onPressRightButton}
              tintColor={showTintColor}
            />
          </View>
        </View>
        <MessageValidate
          message={messageValidate}
          textColor={colorMessageValidate || Colors.red}
        />
      </View>
    )
  }
}

export default LabelPasswordInputForm = React.forwardRef((props, ref) => {
  return (
    <CustomTextInput innerRef={ref} {...props} />
  )
})

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_4,
  },
  show_container: {
    flexDirection: 'row',
  },
  edit_container: {
    flexDirection: 'column',
  },
  title: {
    color: Colors.orange,
    // flex: 1,
    alignSelf: 'flex-start',
    fontFamily: Fonts.hiraKakuProW3,
    // marginTop: 1,
  },
  textInput: {
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW3,
    color: Colors.gray_1,
    paddingVertical: 4,
    textAlignVertical: 'center',
  },
  textInforField: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'space-between',
  },
  viewInput: {
    flex: 1
  }
});
