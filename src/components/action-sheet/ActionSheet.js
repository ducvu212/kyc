import React, { Component, PureComponent } from 'react';
import _ from 'lodash'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  BackHandler
} from 'react-native';
import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'
import { i18next } from '../../utils'
import CommonStyles from '../../constants/styles'
import { createAnimation } from '../../utils/AnimationHelper'
import { hideActionSheet } from '../../navigator'

const { width, height } = Dimensions.get('window')
const DURATION = 200
const MAX_HEIGHT = height / 2

export default class ActionSheet extends Component {

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

  static defaultProps = {
    options: {
      title: null,
      buttons: null
    }
  }

  constructor(props) {
    super(props)
    this.renderItemButton = this.renderItemButton.bind(this)
    this.renderListButton = this.renderListButton.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)

    this.animated = new Animated.Value(0)
    this.state = {
      isShowing: false
    }
  }

  componentDidMount() {
    this.setState({ isShowing: true })
    this.animate(1).start()
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid);
  }

  onPressBackAndroid() {
    hideActionSheet(this.props.componentId)
    return true
  }

  animate(toValue) {
    return createAnimation(this.animated, toValue, DURATION)
  }

  handleCancel() {
    this.animate(0).start(() => {
      this.setState({ isShowing: false }, () => {
        hideActionSheet(this.props.componentId)
      })
    })

  }

  handlePress(callback, item, index) {
    this.animate(0).start(() => {
      this.setState({ isShowing: false }, () => {
        hideActionSheet(this.props.componentId)
          .then(() => {
            callback(item, index);
          })
      })
    })
  }

  render() {
    const { isShowing } = this.state
    const { title, buttons } = this.props.options
    const styleOption = title ? { ...styles.buttonEnd } : { borderRadius: 8 }
    const heightFormButton = (buttons ? buttons.length : 0) * 50 + (50 + 8) + (title ? 48 : 0)
    const heightActionSheet = heightFormButton > MAX_HEIGHT ? MAX_HEIGHT : heightFormButton

    const marginBottom = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-heightActionSheet, 8],
      extrapolate: 'clamp',
    })
    const opacity = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7],
      extrapolate: 'clamp',
    })

    return (
      <View style={[CommonStyles.position_absolute_full, styles.container]} >
        <Animated.View
          useNativeDriver
          style={[CommonStyles.position_absolute_full, styles.overlayBg, {
            opacity: opacity
          }]} />

        {
          isShowing &&
          <SafeAreaView>
            <Animated.View
              style={[styles.mainContainer, {
                marginBottom: marginBottom,
                marginHorizontal: 8,
                backgroundColor: Colors.black_4
              }]}>
              {
                title && (
                  <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>{title}</Text>
                  </View>
                )
              }

              {
                (buttons && buttons.length > 0) &&
                <ScrollView
                  bounces={false}
                  style={[styleOption]}>
                  {this.renderListButton()}
                </ScrollView>
              }

              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={this.handleCancel}>
                <Text style={styles.textCancel}>{i18next.t('Cancel')}</Text>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        }
      </View>
    )
  }

  renderListButton() {
    const { buttons } = this.props.options

    const buttonsView = []

    buttons.forEach((item, index) => {
      buttonsView.push(this.renderItemButton(item, index))
    })
    return buttonsView
  }

  renderItemButton(item, index) {
    const { callback } = this.props
    const { title, buttons } = this.props.options
    const styleButton =
      (index === 0 && index < (buttons.length - 1) && !title) ?
        { ...styles.viewButton, ...styles.buttonStart }
        :
        (index === buttons.length - 1) ?
          { ...styles.viewButton, ...styles.buttonEnd }
          :
          { ...styles.viewButton, ...styles.borderBottomButton }
    const colorText = item.color ? item.color : Colors.blue_2

    return (
      <TouchableOpacity
        key={index}
        style={styleButton}
        activeOpacity={0.5}
        onPress={() => this.handlePress(callback, item, index)}>
        <Text style={[styles.textButton, { color: colorText }]}>{item.text}</Text>
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  overlayBg: {
    backgroundColor: Colors.black
  },
  mainContainer: {
    maxHeight: MAX_HEIGHT,
    justifyContent: 'flex-end',
  },
  buttonCancel: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 8
  },
  textCancel: {
    color: Colors.blue_2,
    ...CommonStyles.textJp16,
    fontFamily: Fonts.hiraKakuProW6,
    textAlign: 'center'
  },
  viewButton: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  textButton: {
    ...CommonStyles.textJp16,
    fontFamily: Fonts.hiraKakuProW3,
    textAlign: 'center'
  },
  viewTitle: {
    height: 48,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomColor: Colors.gray_8,
    borderBottomWidth: 1
  },
  textTitle: {
    color: Colors.gray_7,
    ...CommonStyles.textJp14,
    fontFamily: Fonts.hiraKakuProW3,
    textAlign: 'center'
  },
  buttonEnd: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  buttonStart: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomColor: Colors.gray_8,
    borderBottomWidth: 1
  },
  borderBottomButton: {
    borderBottomColor: Colors.gray_8,
    borderBottomWidth: 1
  }
})
