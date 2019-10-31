import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import _ from 'lodash'
import FastImage from 'react-native-fast-image'
import Images from '../constants/images'
import Colors from '../constants/colors'

const ELEVATION = 5

export default class Avatar extends PureComponent {

  static defaultProps = {
    source: Images.avatar,
    size: 80,
    iconSize: 24,
    active: false,
    bottomText: null,
    bottomTextSize: 12,
    onPress: null,
    onPressRightIcon: null,
    rightIcon: null,
    style: null,
    rightIconStyle: null,
    bottomTextStyle: null,
  }

  constructor(props) {
    super(props)

    this.onPress = this.onPress.bind(this)
    this.onPressRightIcon = this.onPressRightIcon.bind(this)
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  onPressRightIcon() {
    if (this.props.onPressRightIcon) {
      this.props.onPressRightIcon()
    }
  }

  render() {
    const {
      source,
      size,
      iconSize,
      active,
      bottomText,
      bottomTextSize,
      onPress,
      onPressRightIcon,
      rightIcon,
      style,
      rightIconStyle,
      bottomTextStyle,
    } = this.props

    const Wrapper = onPress ? TouchableOpacity : View
    const WrapperRightIcon = onPressRightIcon ? TouchableOpacity : View
    const rightIconTintColor = _.get(rightIconStyle, 'tintColor')
    const imageSource = source || Images.avatar

    return (
      <Wrapper
        style={[styles.container, {
          width: size,
          height: size,
          borderRadius: size / 2,
          ...style,
        }]}
        onPress={this.onPress}
      >
        <View
          style={[
            styles.image,
            {
              flex: 1,
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: active ? 1 : 0,
              backgroundColor: Colors.light_gray,
              overflow: 'hidden'
            },
          ]}
        >
          <FastImage
            source={imageSource}
            style={{
              flex: 1
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        {
          rightIcon && (
            <WrapperRightIcon
              style={[
                styles.rightIcon,
                {
                  width: iconSize,
                  height: iconSize,
                  borderRadius: iconSize / 2,
                  ...rightIconStyle,
                }
              ]}
              onPress={this.onPressRightIcon}
            >
              <FastImage
                source={rightIcon}
                style={{
                  flex: 1
                }}
                tintColor={rightIconTintColor}
                resizeMode={FastImage.resizeMode.contain}
              />
            </WrapperRightIcon>
          )
        }
        {
          bottomText && (
            <View style={[styles.bottomContainer, { width: size }]}>
              <View style={[styles.bottomText, bottomTextStyle]}>
                <Text numberOfLines={1} style={{ color: Colors.white, fontSize: bottomTextSize }}>
                  {bottomText}
                </Text>
              </View>
            </View>
          )
        }
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    elevation: ELEVATION,
  },
  image: {
    borderColor: Colors.red_2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0.6 * ELEVATION,
    },
    shadowOpacity: 0.0015 * ELEVATION + 0.18,
    shadowRadius: 0.54 * ELEVATION,
  },
  rightIcon: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  bottomText: {
    backgroundColor: Colors.orange,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
})
