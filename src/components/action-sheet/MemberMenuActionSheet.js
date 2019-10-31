import React, { Component } from 'react'
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
  Image
} from 'react-native'
import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'
import { i18next, RelationshipHelper } from '../../utils'
import CommonStyles from '../../constants/styles'
import { createAnimation } from '../../utils/AnimationHelper'
import Helper from '../../utils/Helper'
import { hideActionSheet } from '../../navigator'
import Avatar from '../Avatar'

const { width, height } = Dimensions.get('window')
const DURATION = 200

export default class MemberMenuActionSheet extends Component {

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
      name: null,
      relationship: null,
      buttons: null
    }
  }

  constructor(props) {
    super(props)
    this.renderItemButton = this.renderItemButton.bind(this)
    this.renderListButton = this.renderListButton.bind(this)
    this.dimissActionSheet = this.dimissActionSheet.bind(this)

    this.animated = new Animated.Value(0)
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

  dimissActionSheet() {
    this.animate(0).start(() => {
      this.setState({ isShowing: false }, () => {
        hideActionSheet(this.props.componentId)
      })
    })
  }

  handlePress(callback, type) {
    this.animate(0).start(() => {
      this.setState({ isShowing: false }, () => {
        hideActionSheet(this.props.componentId)
          .then(() => {
            callback(type);
          })
      })
    })
  }

  render() {
    const { isShowing } = this.state
    const { buttons, data } = this.props.options
    const name = _.get(data, 'name')
    const avatar_url = _.get(data, 'avatar_url') || null
    const source = Helper.imageSource(avatar_url, null)
    const relationship = _.get(data, 'relationship') || ''
    const heightActionSheet = (buttons ? buttons.length : 0) * (24 + 24) + 81 + 40

    const marginBottom = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-heightActionSheet, 0],
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
          }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0}
            onPress={this.dimissActionSheet} />
        </Animated.View>

        {
          isShowing &&
          <Animated.View
            style={[styles.mainContainer, {
              marginBottom: marginBottom,
            }]}>
            <View style={styles.viewTitle}>
              <Avatar
                active
                size={64}
                source={source}
              />
              <View style={styles.viewTextTitle}>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.textRelationship}>{relationship}</Text>
              </View>
            </View>

            {
              (buttons && buttons.length > 0) &&
              <View
                style={{ paddingBottom: 40 }}>
                {this.renderListButton()}
              </View>
            }
          </Animated.View>
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
    const type = item.type || index

    return (
      <TouchableOpacity
        key={index}
        style={styles.viewButton}
        activeOpacity={0.5}
        onPress={() => this.handlePress(callback, type)}>
        <Image
          source={item.icon}
          style={styles.iconButton}
        />
        <Text style={styles.textButton}>{item.text}</Text>
      </TouchableOpacity>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  viewActionSheetContainer: {
    justifyContent: 'flex-end',
  },
  textCancel: {
    color: Colors.blue_2,
    ...CommonStyles.textJp16,
    fontFamily: Fonts.hiraKakuProW6,
    textAlign: 'center'
  },
  viewButton: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
    flexDirection: 'row',
    marginTop: 24
  },
  iconButton: {
    width: 24,
    height: 24
  },
  textButton: {
    color: Colors.black_6,
    ...CommonStyles.textJp16,
    fontFamily: Fonts.hiraKakuProW3,
    flex: 1,
    marginLeft: 20
  },
  viewTitle: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.gray_9,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  viewTextTitle: {
    flex: 1,
    marginLeft: 10
  },
  textName: {
    color: Colors.black_6,
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW6,
  },
  textRelationship: {
    color: Colors.orange_5,
    ...CommonStyles.textJp12,
    fontFamily: Fonts.hiraKakuProW3,
  }
})
