import { Navigation } from 'react-native-navigation';
import { changeToastData } from '../hud/ToastScreen'

// LOADING
const LOADING_SCREEN = 'LoadingScreen'
const LOADING_SCREEN_ID = 'loadingHUDScreenId'
let isShowingLoading = false
let loadingCustomOptions = {}
const showLoading = (data) => {
  if (isShowingLoading === true) {
    return
  }

  isShowingLoading = true
  Navigation.showOverlay({
    component: {
      id: LOADING_SCREEN_ID,
      name: LOADING_SCREEN,
      passProps: {
        data,
        options: loadingCustomOptions
      },
      options: {
        overlay: {
          interceptTouchOutside: false
        }
      }
    }
  });
}

const hideLoading = async () => {
  isShowingLoading = false
  try {
    await Navigation.dismissOverlay(LOADING_SCREEN_ID);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
}

// ALERT
const ALERT_SCREEN = 'AlertScreen'
const ALERT_SCREEN_ID = 'alertScreenId'
let isShowingAlert = false
let alertCustomOptions = {}

const showAlert = (data, options) => {
  if (isShowingAlert === true) {
    return
  }
  options = { ...options, ...alertCustomOptions }
  isShowingAlert = true
  Navigation.showOverlay({
    component: {
      id: ALERT_SCREEN_ID,
      name: ALERT_SCREEN,
      passProps: {
        data,
        options
      },
      options: {
        overlay: {
          interceptTouchOutside: true
        }
      }
    }
  });
}

const hideAlert = async () => {
  isShowingAlert = false
  try {
    await Navigation.dismissOverlay(ALERT_SCREEN_ID);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
}

// Toast
const TOAST_SCREEN = 'ToastScreen'
const TOAST_SCREEN_ID = 'toastScreenId'
let isShowingToast = false
let toastCustomOptions = {}

const showToast = (data, options = {}) => {
  changeToastData(data, options)
  if (isShowingToast === true) {
    return
  }
  options = { ...options, ...toastCustomOptions }
  isShowingToast = true
  Navigation.showOverlay({
    component: {
      id: TOAST_SCREEN_ID,
      name: TOAST_SCREEN,
      passProps: {
        data,
        options
      },
      options: {
        overlay: {
          interceptTouchOutside: false
        }
      }
    }
  });
}

const hideToast = async () => {
  isShowingToast = false
  try {
    await Navigation.dismissOverlay(TOAST_SCREEN_ID);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
}

const mergeOptionsToast = (options) => {
  Navigation.mergeOptions(TOAST_SCREEN_ID, options);
}

const mergeOptionsAlert = (options) => {
  Navigation.mergeOptions(ALERT_SCREEN_ID, options);
}

const mergeOptionsLoading = (options) => {
  Navigation.mergeOptions(LOADING_SCREEN_ID, options);
}

const mergeOptions = (options) => {
  alertCustomOptions = options
  toastCustomOptions = options
  loadingCustomOptions = options
  mergeOptionsAlert(options)
  mergeOptionsToast(options)
  mergeOptionsLoading(options)
}

export default {
  showLoading,
  hideLoading,
  showAlert,
  hideAlert,
  showToast,
  hideToast,
  mergeOptionsToast,
  mergeOptionsAlert,
  mergeOptionsLoading,
  mergeOptions
}
