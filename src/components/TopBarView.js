import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import Fonts from '../constants/fonts'
import Colors from '../constants/colors'
import Images from '../constants/images'
import Device from '../modules/Device'
import CommonStyles from '../constants/styles'
import _ from 'lodash'
import FastImage from 'react-native-fast-image'

export default class TopBarView extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    colorText: PropTypes.string,
    colorBackground: PropTypes.string,
    onPressLeftBarButton: PropTypes.func,
    onPressRightBarButton: PropTypes.func
  }

  static defaultProps = {
    title: 'title',
    colorBackground: 'transparent',
    showBottomBorder: true
  };

  onPressLeftBarButton = () => {
    if (this.props.onPressLeftBarButton) {
      this.props.onPressLeftBarButton()
    }
  }

  onPressRightBarButton = () => {
    if (this.props.onPressRightBarButton) {
      this.props.onPressRightBarButton()
    }
  }

  render() {
    const isIos = Platform.OS === 'ios' ? true : false
    const statusBarHeight = isIos ? Device.statusBarSize().height : Device.statusBarSize().height / 2
    const topBarHeight =  Device.topBarSize().height 
    const shadowBackground = _.get(this.props, 'style.backgroundColor') || Colors.white

    const {
      back,
      imageRight,
      titleRight,
      titleLeft,
      title,
      titleColor,
      subTitle,
      tintColor,
      showBottomBorder,
      disabledRight,
      rightTitleStyle,
      leftTitleStyle,
      leftImageRound
    } = this.props

    let imageLeft = this.props.imageLeft
    if (back === true) {
      imageLeft = Images.back
    }

    const styleContainer = { ...styles.container, ...this.props.style }
    const styleTitle = { ...CommonStyles.title_nav_bar, ...styles.title, color: titleColor || Colors.black }
    const styleSubTitle = { ...CommonStyles.sub_title_nav_bar, ...styles.subTitle, color: titleColor || Colors.black }
    const styleTextBar = { ...CommonStyles.text_nav_bar, ...styles.title, ...rightTitleStyle }
    const styleImageRound = leftImageRound === true ? { width: 30, height: 30, borderRadius: 15 } : null
    const leftImageResizeMode = leftImageRound === true ? FastImage.resizeMode.contain : FastImage.resizeMode.center
    return (
      <View style={[styleContainer, { height: statusBarHeight + topBarHeight, zIndex: 9999 }]} >

        {
          showBottomBorder &&
          isIos &&
          < View style={[
            CommonStyles.position_absolute_full,
            {
              backgroundColor: shadowBackground,
            },
            styles.shadow]} />
        }

        <View style={[{ marginTop: statusBarHeight, flex: 1 }]} >
          {
            (titleLeft) &&
            (<TouchableOpacity style={[styles.button_bar, { left: 8 }]}
              onPress={this.onPressLeftBarButton.bind(this)}
            >
              <Text style={[styleTextBar, styles.leftTitle, leftTitleStyle]}>{titleLeft}</Text>
            </TouchableOpacity>)
          }
          {
            (imageLeft) &&
            (<TouchableOpacity style={[styles.button_bar, { left: 8, width: 40 }]}
              onPress={this.onPressLeftBarButton.bind(this)} >
              <Image
                source={imageLeft}
                resizeMode={leftImageResizeMode}
                style={[styles.image_bar_left, { alignSelf: 'center', tintColor }, styleImageRound]}
                tintColor={tintColor} />
            </TouchableOpacity>)
          }
          <View style={{
            // flex: 1,
            position: 'absolute',
            justifyContent: 'space-evenly',
            left: 48,
            right: 48,
            top: 2,
            bottom: 2,
          }}>
            <Text
              style={[styleTitle]}
              numberOfLines={1}
            >{title}</Text>
            {
              (subTitle) &&
              <Text
                style={[styleSubTitle]}
                numberOfLines={1}
              >{subTitle}</Text>
            }
          </View>

          {
            (imageRight) &&
            (<TouchableOpacity style={[styles.button_bar, { right: 8, width: 40 }]}
              onPress={this.onPressRightBarButton.bind(this)}
              disabled={disabledRight}>
              <Image
                source={imageRight}
                resizeMode={FastImage.resizeMode.center}
                tintColor={tintColor}
                style={[styles.image_bar_right, { tintColor }]} />
            </TouchableOpacity>)
          }
          {
            (titleRight) &&
            (<TouchableOpacity style={[styles.button_bar, { right: 16 }]}
              onPress={this.onPressRightBarButton.bind(this)}
              disabled={disabledRight}>
              <Text style={[styleTextBar, { textAlign: 'right', fontFamily: Fonts.hiraKakuProW3 }]}>{titleRight}</Text>
            </TouchableOpacity>)
          }

        </View>

        {
          showBottomBorder &&
          !isIos &&
          < View style={[
            {
              height: 0.5,
              backgroundColor: Colors.light_gray
            }]} />
        }
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  title: {
    alignSelf: 'center',
    color: Colors.black_1,
  },
  subTitle: {
    alignSelf: 'center',
    color: Colors.black_1,
  },
  image_bar_left: {
    // marginLeft: 8,
    alignSelf: 'flex-start',
    width: 40,
    height: 40
  },
  image_bar_right: {
    // marginRight: 8,
    alignSelf: 'flex-end',
    width: 40,
    height: 40
  },
  button_bar: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 2,
    bottom: 2,
    position: 'absolute',
  },
  shadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.black_1,
    shadowOpacity: 1,
    shadowRadius: 7,
  },
  leftTitle: {
    textAlign: 'left',
    fontFamily: Fonts.hiraKakuProW3
  }
});
