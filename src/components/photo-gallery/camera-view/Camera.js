import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  Text,
  BackHandler,
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import CameraRoll from '@react-native-community/cameraroll'
import FastImage from 'react-native-fast-image'
import Images from './images/images'
import Utils from '../Utils'
import Device from '../../../modules/Device'
import Colors from '../../../constants/colors'
import LoadingIndicator from '../../LoadingIndicator'
import { Helper, i18next } from '../../../utils'
import CommonStyles from '../../../constants/styles'
import Fonts from '../../../constants/fonts'

const { width, height } = Dimensions.get('window')

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'off',
}

const cameraTypeOrder = {
  back: 'front',
  front: 'back',
}

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.onPressCloseCamera = this.onPressCloseCamera.bind(this)
    this.toggleSwitchCamera = this.toggleSwitchCamera.bind(this)
    this.onPressTakePicture = this.onPressTakePicture.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)
    this.touchToFocus = this.touchToFocus.bind(this)
    this.onPressSave = this.onPressSave.bind(this)
    this.onPressSelectFromCamera = this.onPressSelectFromCamera.bind(this)

    this.state = {
      flash: 'off',
      zoom: 0,
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: {
          x: 0.5,
          y: 0.5
        },
        drawRectPosition: {
          x: width * 0.5,
          y: height * 0.5,
        },
      },
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      firstMedia: null,
      isPreview: false,
      loading: true,
      permissionNotGranted: true,
      saved: false,
    }

    this.temp = null
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
    if (this.timeoutLoadCamera) clearTimeout(this.timeoutLoadCamera)
    this.timeoutLoadCamera = setTimeout(() => {
      Utils.checkCameraPermission().then(granted => {
        if (granted) {
          this.setState({
            loading: false,
            permissionNotGranted: false,
          })
        } else {
          this.setState({
            loading: false,
            permissionNotGranted: true,
          })
        }
      }).catch(() => {
        this.setState({
          loading: false
        })
      })
    }, 250)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  onPressBackAndroid = () => {
    this.onPressCloseCamera()
    return true
  }

  onPressCloseCamera() {
    if (this.timeoutLoadCamera) clearTimeout(this.timeoutLoadCamera)
    if (this.props.onPressCloseCamera) {
      this.props.onPressCloseCamera()
    }
  }

  async onPressSave() {
    try {
      if (this.temp) {
        await Utils.requestWriteExternalStorage()
        await CameraRoll.saveToCameraRoll(this.temp.uri)
        const response = await this.getFirstPhoto()
        if (response && this.props.onPressSaveNewPhoto) {
          this.setState({
            saved: true
          })
          this.props.onPressSaveNewPhoto(response)
        }
        this.camera.pausePreview()
      }
    } catch (e) {

    }
  }

  async onPressTakePicture() {
    if (!this.camera) return
    try {
      const newPicture = await Utils.takePicture(this.camera)
      if (newPicture) {
        this.setState({
          isPreview: true
        })
        this.temp = newPicture
      }
    } catch (error) {

    }
  }

  onPressSelectFromCamera() {
    if (this.props.onPressSelectFromCamera) {
      this.props.onPressSelectFromCamera(this.temp)
    }
  }

  async getFirstPhoto() {
    try {
      const response = await Utils.getMedia(1)
      if (response.edges && response.edges.length > 0) {
        return Promise.resolve(response.edges[0])
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  toggleSwitchCamera() {
    const type = this.state.type
    this.setState({
      type: cameraTypeOrder[type]
    })
  }

  toggleFlash() {
    const flash = this.state.flash
    this.setState({
      flash: flashModeOrder[flash],
    })
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const isPortrait = screenHeight > screenWidth

    let x = pageX / screenWidth
    let y = pageY / screenHeight
    if (isPortrait) {
      x = pageY / screenHeight
      y = -(pageX / screenWidth) + 1
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    })
  }

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }))

  renderTopComponent() {
    return (
      <View
        style={[styles.topContainer, {
          height: Device.statusBarSize().height + Device.topBarSize().height,
          paddingTop: Device.statusBarSize().height,
        }]}
      >
        <TouchableOpacity
          onPress={this.onPressCloseCamera}
        >
          <FastImage
            source={Images.close}
            style={styles.commonIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderCaptureComponent = () => {
    const { flash, permissionNotGranted } = this.state

    let flashIcon = Images.flash_close
    switch (flash) {
      case 'on':
        flashIcon = Images.flash_open
        break
      default:
        flashIcon = Images.flash_close
        break
    }

    return (
      <View
        style={styles.captureContainer}
      >
        <TouchableOpacity
          onPress={this.toggleFlash}
          disabled={permissionNotGranted}
        >
          <FastImage
            source={flashIcon}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onPressTakePicture}
          disabled={permissionNotGranted}
          style={{ marginHorizontal: 40 }}
        >
          <FastImage
            source={Images.shutter}
            style={styles.apertureIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.toggleSwitchCamera}
          disabled={permissionNotGranted}
        >
          <FastImage
            source={Images.switch_camera}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderPreviewComponent = () => {
    const { saved } = this.state
    return (
      <View style={styles.previewContainer}>
        <View style={{ opacity: saved ? 0.5 : 1, minWidth: 50 }}>
          <TouchableOpacity
            onPress={this.onPressSave}
            disabled={saved}
            style={styles.saveButton}
          >
            <FastImage
              source={Images.save}
              style={{ width: 18, height: 18 }}
            />
            <Text style={{ color: Colors.white }}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.onPressSelectFromCamera}
          style={styles.selectButton}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderBottomComponent() {
    const { isPreview } = this.state

    return (
      <View style={styles.bottomContainer}>
        { isPreview ? this.renderPreviewComponent() : this.renderCaptureComponent() }
      </View>
    )
  }

  renderNotAuthorizedView() {
    return (
      <View style={styles.notAuthorizedContainer}>
        <Text style={styles.notAuthorizedText}>
          { i18next.t('AccessToTheCameraHasBeenProhibited') }
        </Text>
        {
          Platform.OS === 'ios' && (
            <TouchableOpacity
              style={styles.allowAccessButton}
              onPress={() => Helper.handleOpenLink('app-settings:')}
            >
              <Text style={styles.allowAccessButtonText}>{i18next.t('AllowAccess')}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }

  renderCamera() {
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    }

    const { loading } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: Colors.black }}>
        {
          !loading ?
            (
              <RNCamera
                ref={ref => this.camera = ref}
                style={{ flex: 1 }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
                playSoundOnCapture={true}
                captureAudio={false}
                notAuthorizedView={this.renderNotAuthorizedView()}
                androidCameraPermissionOptions={{
                  title: i18next.t('PermissionToUseCamera'),
                  message: i18next.t('WeNeedYourPermissionToUseCamera'),
                  buttonPositive: i18next.t('OK'),
                  buttonNegative: i18next.t('Cancel'),
                }}
              >
                {/*<View style={StyleSheet.absoluteFill}>*/}
                {/*<View style={[styles.autoFocusBox, drawFocusRingPosition]} />*/}
                {/*<TouchableWithoutFeedback onPress={this.touchToFocus}>*/}
                {/*<View style={{ flex: 1 }} />*/}
                {/*</TouchableWithoutFeedback>*/}
                {/*</View>*/}
              </RNCamera>
            )
            :
            (
              <LoadingIndicator
                center={true}
                size='small'
              />
            )
        }
      </View>
    )
  }

  render() {
    const { style } = this.props

    return (
      <View style={[styles.container, style]}>
        {
          this.renderTopComponent()
        }
        <SafeAreaView style={{flex: 1}}>
          {
            this.renderCamera()
          }
          {
            this.renderBottomComponent()
          }
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  topContainer: {
    backgroundColor: Colors.black,
    width,
    zIndex: 9999,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    width,
    height: 84,
    backgroundColor: Colors.black,
    justifyContent: 'center',
  },
  captureContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  previewContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
  },
  apertureIcon: {
    width: 64,
    height: 64,
  },
  commonIcon: {
    width: 16,
    height: 16,
  },
  notAuthorizedContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  notAuthorizedText: {
    color: Colors.white,
    textAlign: 'center',
    ...CommonStyles.textJp16,
    ...Platform.select({
      android: {
        lineHeight: 32,
      },
    }),
    fontFamily: Fonts.hiraKakuProW3,
  },
  allowAccessButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    width: 125,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  allowAccessButtonText: {
    ...CommonStyles.textJp14,
    fontFamily: Fonts.hiraKakuProW3,
    color: Colors.blue_3,
  }
})
