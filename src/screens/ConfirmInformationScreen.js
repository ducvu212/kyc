import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  BackHandler,
  Text,
} from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  backToHome,
  back,
  dismissModal
} from '../navigator'
import Colors from '../constants/colors'
import { Background, TopBarView, TextInputForm, ButtonForm } from '../components'
import _ from 'lodash'
import Images from '../constants/images'
import { Helper, HUD, i18next } from '../utils'
import FastImage from 'react-native-fast-image'
import ViewAppDetail from '../components/ViewAppDetail'

const { width, height } = Dimensions.get('window')

export default class ConfirmInformationScreen extends Component {
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

    this.onPressSave = this.onPressSave.bind(this)
    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)

    this.state = {
      loading: false
    }
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

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true

    }
  }

  onPressSave() {
    HUD.showLoading()
    const data = _.get(this.props, 'data', null)
    const {
      dob,
      fullname,
      id_number,
      front,
      back,
      avatar
    } = data
    const sections = _.get(this.props, 'user.me.SESSION', null)
    const session_code = _.last(sections).CODE
    const direct_sale_id = _.get(this.props, 'user.me._id', null)
    const formData = new FormData()
    formData.append('session_code', session_code)
    formData.append('direct_sale_id', direct_sale_id)
    formData.append('profile_img_url', avatar)
    formData.append('cccd_front_img_url', front)
    formData.append('cccd_back_img_url', back)
    formData.append('CCCD_NUMBER', id_number)
    formData.append('FULLNAME', fullname)
    formData.append('DOB', dob)
    formData.append('file', null)
    formData.append('CCCD_DATE', null)
    formData.append('CCCD_PLACE', null)
    formData.append('CMND_NUMBER', null)
    formData.append('CMND_DATE', null)
    formData.append('CMND_PLACE', null)
    formData.append('GENDER', null)
    formData.append('CCCD_DATE', null)
    formData.append('EMAIL', null)
    formData.append('PHONE_NUMBER', null)
    formData.append('ADDRESS', null)
    formData.append('LONGITUDE', null)
    formData.append('LATITUDE', null)
    this.props.saveCard(formData)
      .then(response => {
        this.showAlert(i18next.t('SaveSuccess'))
        dismissModal(this.props.componentId)
        HUD.hideLoading()
      })
      .catch(error => {
        console.log(error);
        HUD.hideLoading()
      })
  }

  render() {
    const { loading } = this.state

    return (
      <View style={[styles.container]}>
        <Background />
        <TopBarView
          imageLeft={Images.ic_back}
          tintColor={Colors.orange}
          title={i18next.t('ConfirmInformation')}
          onPressLeftBarButton={this.onPressLeftBarButton}
        />
        {this.renderBody()}
      </View>
    )
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
      title: i18next.t('Success'),
      message,
    }
    HUD.showAlert(data, options)
  }

  renderBody() {
    const data = _.get(this.props, 'data', null)
    return (
      <View style={{ flex: 1 }}>
        <ViewAppDetail
          data={data} />
        <ButtonForm
          loadingColor={Colors.white}
          style={styles.buttonContainer}
          text={i18next.t('Save')}
          onPress={this.onPressSave}
        />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  buttonContainer: {
    margin: 24,
  },
})
