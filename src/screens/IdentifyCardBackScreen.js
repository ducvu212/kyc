import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet, SafeAreaView, BackHandler, Dimensions, View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import {
  setRootToLoginScreen,
  pushScreenFaceCompare,
  back,
  showModalCameraRoll
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { Background, TopBarView, IdentifyCard } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'
import CardView from 'react-native-cardview'

const { width, height } = Dimensions.get('window')

export default class IdentifyCardBackScreen extends Component {
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
    this.onPressAvatar = this.onPressAvatar.bind(this)
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)

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
    this.props.detectId(formData)
      .then(response => {
        console.log(response);
        const data = _.get(response, 'data.data.document.data')
        const img_url = _.get(response, 'data.data.img_url', null)
        const cardData = _.get(this.props, 'data')
        const dataPass = {...cardData, back: img_url}
        if (!data) {
          this.showAlert(i18next.t('ErrorImage'), i18next.t('TryAgain'))
          HUD.hideLoading()
          return
        }
        pushScreenFaceCompare(this.props.componentId, dataPass)
        HUD.hideLoading()
      })
      .catch(error => {
        this.showAlert(i18next.t('Error'), i18next.t('TryAgain'))
        console.log(error);
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
        console.log(selectedData[0]);

        this.setState({ source: avatar_url, image: selectedData[0] })
      }
    }
    showModalCameraRoll(data, callback)
  }

  render() {
    const { loading, source } = this.state
    const titleRight = !source ? null : i18next.t('Next')

    return (
      <ImageBackground source={Images.background} style={styles.container}>
        <TopBarView
          imageLeft={Images.ic_back}
          tintColor={Colors.orange}
          title={i18next.t('IdentifyCard')}
          titleRight={titleRight}
          rightTitleStyle={styles.rightTitleStyle}
          onPressRightBarButton={this.onPressRightBarButton}
          onPressLeftBarButton={this.onPressLeftBarButton}
        />
        <SafeAreaView style={[styles.container]}>
          <Text style={{ marginTop: 64, alignSelf: 'center', fontSize: 22 }}>{i18next.t('UploadBackIdCard')}</Text>
          <TouchableOpacity
            onPress={this.onPressAvatar}>
            <CardView
              cardElevation={7}
              cardMaxElevation={5}
              cornerRadius={10}
              style={{ width: width - 48, height: height / 3, backgroundColor: Colors.gray_5, marginTop: 120, alignSelf: 'center' }}>
              {
                source &&
                <Image
                  resizeMode='contain'
                  style={{ width: width - 48, height: height / 3 }}
                  source={{ uri: source }}
                />
              }
            </CardView>
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
    fontSize: 18
  },
})
