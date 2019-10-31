
import React, { Component } from 'react';
import _ from 'lodash'
import HUD from './index'
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated, BackHandler, Platform } from 'react-native';
import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'
import { ButtonForm, Avatar } from '../../components'
import { i18next } from '../'
import CommonStyles from '../../constants/styles'

const { width, height } = Dimensions.get('window')
const ELEVATION = 7

export default class AlertScreen extends Component {

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
    data: {
      title: 'Title',
      message: 'Message',
    },
    options: {
      buttons: [
        {
          text: i18next.t('Cancel'),
          type: 'cancel',
          invertedColors: false,
          onPress: null
        },
      ],
      multilineButtons: true,
      avatar: null,
      onPressBackAndroid: null
    },
  }

  constructor(props) {
    super(props)

    this.renderListButton = this.renderListButton.bind(this)
    this.renderItemButton = this.renderItemButton.bind(this)
    this.renderAvatar = this.renderAvatar.bind(this)

    // animate
    this.animateScale = new Animated.Value(0.01)

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid);
    this.animate()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid);
  }

  onPressBackAndroid = () => {
    const backAndroid = _.get(this.props, 'options.onPressBackAndroid')
    if (backAndroid) backAndroid()
    return true
  }

  handlePress(callback, notDismiss) {
    if (notDismiss) {
      callback()
      return
    }
    HUD.hideAlert()
      .then(() => {
        callback();
      })
  };

  handleCancel() {
    HUD.hideAlert();
  };

  animate = () => {
    this.animateScale.setValue(0.5)
    Animated.spring(this.animateScale, {
      toValue: 1,
      friction: 9,
      tension: 150,
      useNativeDriver: true,
    }).start()
  }

  renderListButton() {
    const { buttons } = this.props.options;
    const buttonsView = [];
    buttons.forEach((item, index) => {
      buttonsView.push(this.renderItemButton(item, index));
    });
    return buttonsView;
  };

  renderItemButton(item, index) {
    const { text, onPress, type, invertedColors, notDismiss } = item
    const cancelType = !onPress || type === 'cancel'
    const onPressFunction = cancelType ? this.handleCancel : () => this.handlePress(onPress, notDismiss)
    const buttonStyle = invertedColors || cancelType ? {
      borderWidth: 1,
      borderColor: Colors.pink_1,
      backgroundColor: Colors.white_1
    } : null

    return (
      <ButtonForm
        key={index}
        colorText={Colors.white}
        style={[styles.buttonContainer, buttonStyle]}
        textStyle={styles.buttonText}
        invertedColors={invertedColors || cancelType}
        text={text}
        onPress={onPressFunction}
      />
    )
  };

  renderAvatar() {
    const { avatar } = this.props.options
    console.log(avatar);
    
    if (!avatar) return null
    const { source, title, subTitle } = avatar

    return (
      <View style={styles.avatarContainer}>
        <Avatar
          size={72}
          source={source}
        />
        <Text style={styles.avatarSubTitle}>{subTitle}</Text>
        <Text style={styles.avatarTitle}>{title}</Text>
      </View>
    )
  }

  render() {
    const { title, message } = this.props.data
    const { buttons, multilineButtons } = this.props.options

    const listButtonStyle = buttons.length > 2 || multilineButtons ? { flexDirection: 'column' } : null

    return (
      <View style={styles.container} >
        <View style={styles.overlayBg} opacity={0.5} />
        <Animated.View
          style={[styles.mainContainer, {
            transform: [{ scale: this.animateScale }],
            // backgroundColor: Colors.white,
          }]} >
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}
              numberOfLines={4}
            >
              {title}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
          >
            {this.renderAvatar()}
            <Text
              style={styles.content}
            >
              {message}
            </Text>
          </ScrollView>
          {
            buttons && buttons.length > 0 && (
              <View
                style={{
                  backgroundColor: Colors.white, borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}>
                <View style={[styles.listButtonContainer, listButtonStyle]}>
                  {this.renderListButton()}
                </View>
              </View>
            )
          }
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlayBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.black,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 35,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0.6 * ELEVATION,
    },
    shadowOpacity: 0.0015 * ELEVATION + 0.18,
    shadowRadius: 0.54 * ELEVATION,
    elevation: ELEVATION,
    maxHeight: height - 70,
  },
  contentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 22,
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  titleContainer: {
    backgroundColor: Colors.gray_1,
    padding: 14,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW6,
    textAlign: 'center',
  },
  content: {
    color: Colors.gray_1,
    fontFamily: Fonts.hiraKakuProW3,
    ...CommonStyles.textJp16,
    textAlign: 'center',
    ...Platform.select({
      android: {
        lineHeight: 32
      }
    }),
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSubTitle: {
    marginTop: 5,
    ...CommonStyles.textJp12,
    fontFamily: Fonts.hiraKakuProW3,
    color: Colors.gray_1,
  },
  avatarTitle: {
    ...CommonStyles.textJp16,
    fontFamily: Fonts.hiraKakuProW6,
    color: Colors.red_1,
  },
  listButtonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.black_3,
    flexGrow: 1,
    paddingVertical: 8.5,
    paddingHorizontal: 7,
    justifyContent: 'space-around'
  },
  buttonContainer: {
    flexGrow: 1,
    minHeight: 36,
    maxHeight: 36,
    paddingHorizontal: 5,
    marginHorizontal: 7,
    marginVertical: 8.5,
  },
  buttonText: {
    flex: 1,
    ...CommonStyles.textJp14,
    textAlign: 'center'
  }
});
