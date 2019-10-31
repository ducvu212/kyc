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
  Easing,
  DatePickerIOS
} from 'react-native';
import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'
import { i18next } from '../../utils'
import CommonStyles from '../../constants/styles'
import { createAnimation } from '../../utils/AnimationHelper'
import { hideActionSheet } from '../../navigator'

const { width, height } = Dimensions.get('window')
const DURATION = 200

export default class DateActionSheet extends Component {

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
      currentDate: new Date(),
      // maximumDate: new Date()
    }
  }

  constructor(props) {
    super(props)
    this.onPressOK = this.onPressOK.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.dimissActionSheet = this.dimissActionSheet.bind(this)

    this.animated = new Animated.Value(0)
    this.date = this.props.options.currentDate

    this.state = {
      isShowing: false
    }
  }

  componentDidMount() {
    this.setState({ isShowing: true })
    this.animate(1).start()
  }

  animate(toValue) {
    return createAnimation(this.animated, toValue, DURATION)
  }

  onPressOK(callback) {
    this.animate(0).start(() => {
      this.setState({ isShowing: false }, () => {
        hideActionSheet(this.props.componentId).then(() => {
          if (this.props.options.minimumDate && this.props.options.minimumDate > this.date) {
            this.date = this.props.options.minimumDate
          }
          callback(this.date)
        })
      })
    })
  }

  handleDateChange(date) {
    this.date = date
  }

  dimissActionSheet() {
    this.animate(0).start(() => {
      this.setState({ isShowing: false }, () => {
        hideActionSheet(this.props.componentId)
      })
    })
  }

  render() {
    const { isShowing } = this.state
    const { callback } = this.props
    const { currentDate, maximumDate, minimumDate, mode } = this.props.options
    const heightActionSheet = 250

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
          style={[CommonStyles.position_absolute_full, styles.overlayBg,
          {
            opacity: opacity
          }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0}
            onPress={this.dimissActionSheet} />
        </Animated.View>

        {
          isShowing &&
          <SafeAreaView>
            <Animated.View
              style={[styles.mainContainer, {
                marginBottom: marginBottom,
                marginHorizontal: 8
              }]}>
              <View style={styles.viewOptions}>
                <TouchableOpacity
                  onPress={() => this.onPressOK(callback)}
                  style={styles.viewButton}>
                  <Text style={styles.textButtonChoosen}>{i18next.t('Done')}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 200 }} >
                <DatePickerIOS
                  mode={mode}
                  date={currentDate}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  onDateChange={this.handleDateChange}
                  style={{ height: 200 }}/>
              </View>

            </Animated.View>
          </SafeAreaView>
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  overlayBg: {
    backgroundColor: Colors.black
  },
  mainContainer: {
    maxHeight: height / 2,
    justifyContent: 'flex-end',
    borderRadius: 8,
    backgroundColor: Colors.white
  },
  viewOptions: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-end',
    borderBottomColor: Colors.gray_8,
    borderBottomWidth: 1,
  },
  viewButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textButtonChoosen: {
    color: Colors.blue_2,
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW3,
    paddingHorizontal: 40
  }
})
