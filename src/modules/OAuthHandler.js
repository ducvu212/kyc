import NetworkManager from './NetworkManager'
import ApiConfig from '../config/api-config';
import _ from 'lodash'

const getRefreshToken = () => {
  const { getState } = require('../store/index')
  return getState().auth.refresh_token
}

const getAccessToken = () => {
  const { getState } = require('../store/index')
  return getState().auth.access_token
}

// const getDeviceId = () => {
//   const { getState } = require('../store/index')
//   return getState().auth.device_id
// }

// adapterHandler
const authenticationHeader = () => {
  const accessToken = getAccessToken()
  if (accessToken) {
    return `Bearer ${accessToken}`
  }
  return null
}

const commonAuthHeader = () => {
  const authorization = authenticationHeader()
  return {
    JWTAuthorization: authorization
  }
}


// retryHandler
let unauthorizedReqQueue = [];
const retryHandler = async (error, orgConfig) => {

  // check if error is not 401 or is not unauthorized type
  if (error.status !== 401) {
    return Promise.reject(error);
  }

  // check if orgConfig contain Authorization key
  if (!orgConfig.headers.Authorization) {
    return Promise.reject(error);
  }

  //================== 401 Unauthorized ================== 

  // create new promise
  let newReqPromise = new Promise((resolve, reject) => {

    let newOrgConfig = { ...orgConfig }
    // delete newOrgConfig.headers.Authorization

    const callback = async (success) => {

      if (success !== true) {
        return reject(error)
      }

      try {
        const resp = await NetworkManager.request(newOrgConfig);
        return resolve(resp);
      } catch (e) {
        return reject(e);
      }
    };

    // add callback
    unauthorizedReqQueue.push(callback);
  });

  // create request to refresh token
  getTokenAndCallBack()

  // next
  return newReqPromise;
}

// get refresh token
let isRefreshingToken = false;
const getTokenAndCallBack = () => {

  if (isRefreshingToken === false) {
    isRefreshingToken = true;

    // get token
    getTokenFromServer()
      .then((token) => {

        if (token) {
          // save tokens
          const { REFRESH_TOKEN, dispatchAction } = require('../actions/action-types')
          dispatchAction(REFRESH_TOKEN, token, true)
          return true
        } else {
          return false
        }
      }).catch(failure => {
        return failure
      }).then(isSuccess => {

        // request again
        unauthorizedReqQueue.forEach(callback =>
          callback(isSuccess)
        );
        unauthorizedReqQueue = []
        isRefreshingToken = false;
      });
  }
}

const getTokenFromServer = async () => {

  const refresh_token = getRefreshToken()

  if (!refresh_token) {
    return Promise.reject(null)
  }

  // Request
  return NetworkManager.request(ApiConfig.auth.refreshToken(refresh_token))
    .then(function (response) {
      const access_token = _.get(response, 'data.access_token')

      if (access_token) {
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(null)
      }
    })
    .catch(function (error) {
      return Promise.reject(null)
    });
}

export default {
  retryHandler,
  authenticationHeader,
  commonAuthHeader,
  // saveRefreshToken,
  // getAccessToken,
  // clearToken
}