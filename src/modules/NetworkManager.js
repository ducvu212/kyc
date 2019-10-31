import axios from 'axios'
import { Platform as Pf } from 'react-native'
import Config from 'react-native-config'
import { i18next, HUD } from '../utils'
import Device from './Device'
import { dispatchAction } from '../store'
import {
  setRootToLoginScreen,
} from '../navigator'
import { clearState } from '../actions'
import _ from 'lodash'

const BASE_URL = Config.BASE_URL
const timeout = 30000
const DeviceID = Device.getDeviceId()
const Platform = Pf.OS

const commonHeaders = {
  'Content-Type': 'application/json',
  DeviceID,
  Platform
}

const basic_auth = {
  username: '',
  password: ''
}

// interceptors request
const interceptorsRequestSuccess = (config) => {
  console.log('================ REQUEST ================', config, BASE_URL)
  return config;
}

// interceptors response
const interceptorsResponseSuccess = (response) => {
  return handlerResponse(response);
}

const interceptorsResponseError = async (error) => {

  // error handler
  const notShowUnauthorizedAlert = _.get(error, 'config.notShowUnauthorizedAlert')
  const newError = handlerError(error)

  // error was made from server
  try {
    const errorMessage = _.get(newError, 'data.error')
    if (newError.status === 401 && errorMessage === 'logged_in_another_device') {
      showAlertUnauthorized(i18next.t('ThisAccountHasBeenLoggedInWithAnotherDevice'))
      return Promise.reject(newError)
    }
    if (error.config &&
      error.config.usingRetrier === true) {
      const OAuthHandler = require('../modules/OAuthHandler').default
      const response = await OAuthHandler.retryHandler(newError, error.config)
      return Promise.resolve(response)
    }
  } catch (e) {
    if (e.status === 401 && !notShowUnauthorizedAlert) {
      showAlertUnauthorized(i18next.t('AuthenticationErrorPleaseLoginAgain'))
    }
    return Promise.reject(e)
  }

  return Promise.reject(newError)
}

const showAlertUnauthorized = (message) => {
  const options = {
    buttons: [
      {
        text: i18next.t('OK'),
        onPress: handlePressUnauthorizedAlert,
        invertedColors: true,
      }
    ]
  };
  const data = {
    title: i18next.t('Notification'),
    message,
  }
  HUD.showAlert(data, options)
}

const handlePressUnauthorizedAlert = () => {
  setRootToLoginScreen()
  dispatchAction(clearState())
}

const handlerResponse = (response) => {
  const newResponse = { ...response };
  delete newResponse.config
  delete newResponse.headers
  delete newResponse.request
  return newResponse;
}

const handlerError = (error) => {

  // error was made from server
  if (error.response) {
    const newError = { ...error.response };
    if (newError.config) {
      delete newError.config
    }
    if (newError.headers) {
      delete newError.headers
    }
    if (newError.request) {
      delete newError.request
    }
    return newError

  } else if (error.request) {

    const newError = {
      data: {
        messages: [{ message: i18next.t('noNetWorkConnection') }]
      },
      status: error.request.status
    };
    return newError
  }

  // other
  let newError = { data: {}, status: -600 };
  if (!error.data) {
    newError = { ...newError, data: { ...error } };
  } else {
    newError = { ...newError, ...error };
  }

  return newError
}

// Create request
// const axiosInstance = axios.create();
// axiosInstance.defaults.timeout = timeout;
// axiosInstance.interceptors.request.use(interceptorsRequestSuccess, null);
// axiosInstance.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError)

const createRequest = async (config) => {

  // set base url
  const headers = { ...commonHeaders, ...config.headers }
  const newConfig = {
    baseURL: BASE_URL,
    ...config,
    headers,
    auth: basic_auth,
  }

  // base url
  if (newConfig.needBaseUrl === false) {
    delete newConfig.baseURL
  }

  // create a axios instance
  const axiosInstance = axios.create();
  axiosInstance.defaults.timeout = timeout;
  axiosInstance.interceptors.request.use(interceptorsRequestSuccess, null);
  axiosInstance.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError)
  // return
  return axiosInstance(newConfig)
}

const request = async (config) => {

  // Authentication
  const OAuthHandler = require('../modules/OAuthHandler').default
  // const authen_header = OAuthHandler.authenticationHeader()
  const commonAuthHeader = OAuthHandler.commonAuthHeader()
  const headers = { ...config.headers, ...commonAuthHeader }
  
  // using retrier
  const newConfig = { ...config, headers, usingRetrier: true }

  // request
  return createRequest(newConfig)
}

const requestWithoutToken = async (config) => {

  // request
  return createRequest(config)
}

// Cancel request
const CancelToken = axios.CancelToken;
const sourceCancel = () => {
  return CancelToken.source();
}

const cancelRequest = (source, message) => {
  if (source) {
    source.cancel(message)
  }
}

const isCancel = (error) => {
  return axios.isCancel(error)
}

export default {
  request,
  requestWithoutToken,
  cancelRequest,
  sourceCancel,
  isCancel,
}

