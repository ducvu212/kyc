import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet,
  SafeAreaView,
  BackHandler,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import {
  showModalCameraRoll, back, pushScreenConfirmInformation
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { Background, TopBarView, Avatar } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'

const { width, height } = Dimensions.get('window')
const LIMIT_SIZE_IMAGE = 1048576 * 10
const ELEVATION = 5

export default class FaceCompareScreen extends Component {
  static options(passProps) {
    return {
      statusBar: {
        backgroundColor: 'transparent',
        visible: true,
        style: 'dark'
      },
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.onPressRightBarButton = this.onPressRightBarButton.bind(this)
    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)
    this.onPressAvatar = this.onPressAvatar.bind(this)

    this.state = {
      loading: false,
      source: null,
      image: null
    }
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true

    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  componentDidDisappear() {

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  onPressBackAndroid() {
    back(this.props.componentId)
    return true
  }

  onPressLeftBarButton() {
    back(this.props.componentId)
  }

  onPressRightBarButton() {
    HUD.showLoading()
    const { image } = this.state

    const img_url = _.get(this.props, 'data.front')
    const sections = _.get(this.props, 'user.me.SESSION', null)
    const session_code = _.last(sections).CODE
    const direct_sale_id = _.get(this.props, 'user.me._id', null)
    const formData = new FormData()
    formData.append('file', {
      uri: image.uri, //Your Image File Path
      type: 'image/jpeg',
      name: image.filename ? image.filename : 'image',
    });
    formData.append('session_code', session_code)
    formData.append('direct_sale_id', direct_sale_id)
    formData.append('img_url', img_url)
    this.props.faceCompare(formData)
      .then(response => {
        const data = _.get(response, 'data.data', null)
        const dataPass = _.get(this.props, 'data', null)
        const img_url = _.get(response, 'data.data.img_url', null)
        const sendData = { ...dataPass, avatar: img_url }
        const result_verify = _.get(data, 'result_verify', null)
        const confidence = _.get(result_verify, 'confidence', 0)
        const isIdentical = _.get(result_verify, 'isIdentical', null)
        console.log(confidence, isIdentical);
        
        if (isIdentical) {
          pushScreenConfirmInformation(this.props.componentId, sendData)
        } else {
          this.showAlert(i18next.t('FaceNotMatch'))
        }
        HUD.hideLoading()
      })
      .catch(error => {
        console.log('aaaaaaaaaaa', error);
        HUD.hideLoading()
      })
  }

  showAlert(message) {
    const options = {
      buttons: [
        {
          text: i18next.t('OK'),
          type: 'cancel',
        }
      ]
    }
    const data = {
      title: i18next.t('Error'),
      message,
    }
    HUD.showAlert(data, options)
  }

  onPressAvatar() {
    // showModalPhotoView({ images: [{ id: 1, url: me.avatar_url }] })
    const data = {
      maxSelect: 1
    }
    const callback = async (selectedData) => {
      if (selectedData && selectedData.length > 0) {
        const avatar_url = selectedData[0].assetPath
        this.setState({ source: avatar_url, image: selectedData[0] })
      }
    }
    showModalCameraRoll(data, callback)
  }

  render() {
    const { loading, source } = this.state
    const titleRight = !source ? null : i18next.t('Next')
    const avatar = Helper.imageSource(source, Images.default_avatar)

    return (
      <ImageBackground source={Images.background} style={styles.container}>
        <TopBarView
          imageLeft={Images.ic_back}
          tintColor={Colors.orange}
          title={i18next.t('FaceCompare')}
          titleRight={titleRight}
          rightTitleStyle={styles.rightTitleStyle}
          onPressRightBarButton={this.onPressRightBarButton}
          onPressLeftBarButton={this.onPressLeftBarButton}
        />
        <SafeAreaView style={[styles.container]}>
          <Text style={{ marginTop: 64, alignSelf: 'center', fontSize: 22 }}>{i18next.t('TakePhoto')}</Text>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={this.onPressAvatar}>
            <Image
              style={styles.avatar}
              source={avatar}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  rightTitleStyle: {
    color: Colors.orange,
    alignSelf: 'flex-start',
    fontSize: 16
  },
  avatar: {
    width: 300,
    height: 300,
  },
  avatarContainer: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    marginVertical: 26,
    borderWidth: 0,
    borderRadius: 300 / 2,
    backgroundColor: Colors.light_gray,
    borderColor: Colors.gray_5,
    shadowColor: Colors.gray_5,
    shadowOffset: {
      width: 0,
      height: 0.6 * ELEVATION,
    },
    shadowOpacity: 0.0015 * ELEVATION + 0.18,
    shadowRadius: 0.54 * ELEVATION,
    overflow: 'hidden',
    marginTop: 64
  },
})
