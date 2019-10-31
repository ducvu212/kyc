import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  setRootToTutorialScreen,
  pushUserBasicInfoScreen
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { PasswordInputForm, TextInputForm, ButtonForm } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'
import Device from '../modules/Device'
import TouchID from 'react-native-touch-id'

const { width, height } = Dimensions.get('window')

export default class LoginScreen extends Component {
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

    this.onChangeTextUserName = this.onChangeTextUserName.bind(this)
    this.onChangeTextPassword = this.onChangeTextPassword.bind(this)
    this.onPressLogin = this.onPressLogin.bind(this)
    this.checkTouchId = this.checkTouchId.bind(this)

    this.state = {
      username: 'test_a@msb.com.vn',
      password: 'test_a'
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
    }
    const token_collection = _.get(this.props, 'user.me.token_collection')
    if (token_collection) {
      this.isSupportTouch()
    }
  }

  onChangeTextPassword(password) {
    this.setState({ password })
  }

  onChangeTextUserName(username) {
    this.setState({ username })
  }

  onPressLogin() {
    this.doSubmit()
  }

  checkTouchId() {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.authenticate(i18next.t('Fingerprint'), optionalConfigObject)
      .then(success => {
        setRootToHomeScreen()
      })
      .catch(error => {
        // this.showAlertSuccess(error)
      });
  }

  isSupportTouch() {
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else if (biometryType === 'TouchID') {
          this.checkTouchId()
        } else if (biometryType === true) {
          // Touch ID is supported on Android
          this.checkTouchId()
        }
      })
      .catch(error => {
        // Failure code if the user's device does not have touchID or faceID enabled
        console.log(error);
      });
  }

  doSubmit = () => {
    HUD.showLoading()
    const username = _.get(this.state, 'username', '')
    const password = _.get(this.state, 'password', '')
    const usernameText = username.trim()
    const passwordText = password.trim()
    const data = {
      username: usernameText,
      password: passwordText,
      device_ID: Device.getDeviceId(),
      device_brand: Device.getManufacturer()
    }
    this.props.login(data)
      .then(response => {
        HUD.hideLoading()
        setRootToHomeScreen()
      })
      .catch(error => {
        HUD.hideLoading()
        // this.showAlertTryAgain()
        this.showAlert(JSON.stringify(error))
        console.log(error);

      })
  }

  showAlert(message) {
    const options = {
      buttons: [
        {
          text: i18next.t('OK'),
          onPress: this.onPressId,
          invertedColors: true,
        }
      ],
      avatar: {
        source: Images.ic_touch,
        title: i18next.t('Fingerprint'),
        subTitle: i18next.t('FingerprintDes')
      }
    }
    const data = {
      title: i18next.t('Success'),
      message,
    }
    HUD.showAlert(data, options)
  }

  showAlertSuccess(message) {
    const options = {
      buttons: [
        {
          text: i18next.t('OK'),
          invertedColors: true,
        }
      ],
    }
    const data = {
      title: i18next.t('Success'),
      message,
    }
    HUD.showAlert(data, options)
  }

  showAlertTryAgain = (callback) => {
    const options = {
      buttons: [
        {
          text: i18next.t('OK'),
          onPress: callback,
          invertedColors: true,
        }
      ]
    };
    const data = {
      title: i18next.t('Error'),
      message: i18next.t('TryAgain'),
    }
    HUD.showAlert(data, options)
  }

  render() {
    const commonStyleTextInput = {
      textStyle: styles.textInput,
      placeholderColor: Colors.gray_5,
      containerStyle: styles.inputContainerStyle,
      containerInputStyle: styles.containerInputStyle
    }

    const { username, password } = this.state

    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps='handled'>
        <ImageBackground source={Images.background} style={styles.container}>
          <Image
            source={Images.logo}
            resizeMode='contain'
            style={{
              width: 150,
              height: 150,
              paddingVertical: 100,
              alignSelf: 'center'
            }}
          />
          <TextInputForm
            {...commonStyleTextInput}
            value={username}
            placeholder={i18next.t('Username')}
            onChangeText={this.onChangeTextUserName}
          // messageValidate={messageValidateUrl
          // onEndEditing={this.onEndEditingUrl}
          />
          <PasswordInputForm
            containerStyle={{ marginTop: 30, paddingHorizontal: 24 }}
            value={password}
            placeholder={i18next.t('Password')}
            onChangeText={this.onChangeTextPassword}
          // messageValidate={messageValidateUrl}
          // onEndEditing={this.onEndEditingUrl}
          />
          <ButtonForm
            loadingColor={Colors.white}
            style={styles.buttonContainer}
            text={i18next.t('Login')}
            onPress={this.onPressLogin}
          />
        </ImageBackground>
      </ScrollView>
    )
  }

  renderDialogTouchId() {
    return (
      <View style={{ justifyContent: 'center', alignItem: 'center', borderRadius: 10 }}>
        <Image
          source={Images.ic_touch}
          style={{ width: 100, height: 100 }}
          resizeMode='contain'
        />
        <Text>{i18next.t}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    ...Platform.select({
      android: {
        paddingTop: Device.statusBarSize().height
      }
    }),
  },
  inputContainerStyle: {
    paddingHorizontal: 24,
    marginTop: 60,
  },
  containerInputStyle: {
    borderBottomColor: Colors.black_4,
    paddingBottom: 10
  },
  buttonContainer: {
    marginTop: 75,
    marginBottom: 24,
    marginHorizontal: 24
  },
})
