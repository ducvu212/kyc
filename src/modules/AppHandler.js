import { Platform, AppState, Keyboard, InteractionManager, BackHandler } from 'react-native';
import Device from './Device';
import _ from 'lodash';
import { getAppInfo as getApiAppInfo } from '../actions';
import { Helper, HUD, i18next } from '../utils';

let m_keyboardDidShow = false

const listenState = () => {
  // app state
  AppState.addEventListener('change', this.handleAppStateChange);
  this.handleAppStateChange(AppState.currentState)
  this.listenKeyboardChange()
}

handleAppStateChange = (nextAppState) => {

  if (nextAppState === 'active') {
    // get current id and update token
  } else if (nextAppState === 'background') {
  }
}

listenKeyboardChange = () => {

  this.keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    this._keyboardDidShow,
  );
  this.keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    this._keyboardDidHide,
  );
}

removeKeyboardChange = () => {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}

_keyboardDidShow = () => {
  m_keyboardDidShow = true
}

_keyboardDidHide = () => {
  m_keyboardDidShow = false
}

const keyboardDidShow = () => {
  return m_keyboardDidShow
}

const runAfterInteractions = (callback) => {
  if (m_keyboardDidShow !== true) {
    callback && callback()
    return
  }

  InteractionManager.runAfterInteractions(() => {
    callback && callback()
  })
}

const getAppLink = () => {
  const APP_STORE_LINK = 'https://apps.apple.com/us/app/apple-store/id375380948'
  const PLAY_STORE_LINK = 'https://play.google.com/store/apps'
  return Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK
}

const showAlertForceUpdate = (url) => {
  const options = {
    buttons: [
      {
        text: i18next.t('Update'),
        invertedColors: true,
        onPress: () => Helper.handleOpenLink(url),
        notDismiss: true,
      }
    ],
    onPressBackAndroid: () => BackHandler.exitApp()
  };
  const data = {
    title: i18next.t('Notification'),
    message: i18next.t('TasukiHaveANewVersionDownloadTheLatestVersion'),
  }
  HUD.showAlert(data, options)
}

const getAppInfo = async () => {
  const currentVersion = Device.getVersion()
  const params = {
    version_number: currentVersion
  }
  try {
    const response = await getApiAppInfo(params)
    const updateRequired = _.get(response, 'data.update_required')
    if (updateRequired) {
      showAlertForceUpdate(getAppLink())
      return Promise.reject({ needUpdate: true })
    }
    return Promise.resolve({ data: response })
  } catch (error) {
    return Promise.resolve({ error })
  }
}

const INTERVAL_FORCE_UPDATE_TIME = 10 * 60 * 1000

const checkForceUpdate = () => {
  if (this.intervalForceUpdate) clearInterval(this.intervalForceUpdate)
  this.intervalForceUpdate = setInterval(() => {
    getAppInfo()
      .catch(error => {
        if (this.intervalForceUpdate) clearInterval(this.intervalForceUpdate)
      })
  }, INTERVAL_FORCE_UPDATE_TIME)
}

export default AppHandler = {
  listenState,
  keyboardDidShow,
  runAfterInteractions,
  getAppInfo,
  checkForceUpdate,
}
