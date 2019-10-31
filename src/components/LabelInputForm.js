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

class CustomTextInput extends PureComponent {

  static defaultProps = {
    placeholder: '',
    value: null,
    containerStyle: null,
    multiline: true,
    viewOnly: true,
    showIcon: false,
    onPressInfo: null,
    editable: true,
    scrollEnabled: false,
    subTitle: null,
  }

  constructor(props) {
    super(props);
    this.onPressIcon = this.onPressIcon.bind(this)
    this.onPressInfo = this.onPressInfo.bind(this)
  }

  onChangeText = value => {
    this.props.onChangeText && this.props.onChangeText(value)
  }

  onEndEditing = () => {
    this.props.onEndEditing && this.props.onEndEditing()
  }

  onPressIcon() {
    if (this.props.onPressIcon) {
      this.props.onPressIcon()
    }
  }

  onPressInfo() {
    if (this.props.onPressInfo) {
      this.props.onPressInfo()
    }
  }

  render() {
    const {
      placeholder,
      title,
      icon,
      value,
      maxLength,
      multiline,
      styleTextInput,
      styleTitle,
      keyboardType,
      messageValidate,
      colorMessageValidate,
      onPressInfo,
      showIcon,
      placeholderTextColor,
      viewOnly,
      editable,
      scrollEnabled,
      subTitle
    } = this.props
    const containerStyle = viewOnly ? styles.show_container : styles.edit_container
    const fontSize = viewOnly ? {
      ...CommonStyles.textJp14,
      ...Platform.select({
        ios: {
          paddingTop: subTitle ? 6 : 14,
        },
        android: {
          paddingTop: subTitle ? 2 : 8
        }
      }),
      flex: 1,
    }
      : { ...CommonStyles.textJp12 }
    const styleLabel = (viewOnly && !value) ? { color: Colors.gray_5 } : { color: Colors.orange }
    const marginTextInput = viewOnly ? { marginLeft: 16, flex: 2 } : { marginLeft: 0 }
    const pointerEvents = (showIcon && onPressInfo || viewOnly || !editable) ? 'none' : 'auto'
    const Wrapper = ((!viewOnly || showIcon) && onPressInfo) ? TouchableOpacity : View
    const textPlaceHolder = viewOnly ? null : placeholder
    const required = (this.props.required && !viewOnly) ? ' *' : ''

    return (
      <View style={this.props.style}>
        <View style={[styles.container, containerStyle]}>
          {
            title &&
            (
              <Text
                style={[styles.title, styleLabel, fontSize, styleTitle]}>{`${title}${required}`}</Text>
            )
          }

          <Wrapper
            onPress={this.onPressInfo}
            style={marginTextInput}
          >
            <View
              pointerEvents={pointerEvents}
              style={styles.textInforField}>
              <View style={styles.containerTextInput}>
                {
                  subTitle &&
                  <Text style={styles.textSubTitle}>{subTitle}</Text>
                }

                <TextInput
                  ref={this.props.innerRef}
                  value={value}
                  multiline={multiline}
                  underlineColorAndroid='transparent'
                  placeholder={textPlaceHolder}
                  placeholderTextColor={placeholderTextColor}
                  style={[styles.textInput, styleTextInput]}
                  onChangeText={this.onChangeText}
                  autoCapitalize={'none'}
                  maxLength={maxLength}
                  keyboardType={keyboardType}
                  onEndEditing={this.onEndEditing}
                  scrollEnabled={scrollEnabled}
                />
              </View>
              {
                (icon && showIcon) &&
                <IconButtonForm
                  style={{ marginHorizontal: 2 }}
                  icon={icon}
                  onPress={this.onPressIcon}
                />
              }
            </View>
          </Wrapper>
        </View>
        <MessageValidate
          message={messageValidate}
          textColor={colorMessageValidate || Colors.red}
        />
      </View >
    )
  }
}

export default LabelInputForm = React.forwardRef((props, ref) => {
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
    alignSelf: 'flex-start',
    fontFamily: Fonts.hiraKakuProW3,
  },
  textInput: {
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW3,
    color: Colors.gray_1,
    ...Platform.select({
      android: {
        paddingVertical: 4,
      },
    }),
    // textAlignVertical: 'center',
  },
  textInforField: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'space-between',
  },
  textSubTitle: {
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW6,
    color: Colors.green_1,
  },
  containerTextInput: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingVertical: 4,
      },
    }),
  }
});
