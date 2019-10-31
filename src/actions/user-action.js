import _ from 'lodash';
import {
  SAVE_CARD,
  FACE_VERIFY,
  createAction
} from './action-types'
import NetworkManager from '../modules/NetworkManager'
import ApiConfig from '../config/api-config'

export function getAllProduct(data) {
  return async function (dispatch) {
    return NetworkManager.requestWithoutToken(ApiConfig.users.getAllProduct(data))
      .then(response => {
        // const data = response.data
        // if (data) {
        //   dispatch(createAction(LOGIN, data, true))
        // }
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      });
  }
}

export function detectId(data) {
  return async function (dispatch) {
    return NetworkManager.requestWithoutToken(ApiConfig.users.detectId(data))
      .then(response => {
        // const data = response.data
        // if (data) {
        //   dispatch(createAction(LOGIN, data, true))
        // }
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      });
  }
}

export function faceCompare(data) {
  return async function (dispatch) {
    return NetworkManager.requestWithoutToken(ApiConfig.users.compareFace(data))
      .then(response => {
        const data = _.get(response, 'data.data')
        if (data) {
          dispatch(createAction(FACE_VERIFY, data, true))
        }
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      });
  }
}

export function saveCard(data) {
  return async function (dispatch) {
    return NetworkManager.requestWithoutToken(ApiConfig.users.saveCard(data))
      .then(response => {
        const data = _.get(response, 'data.data')
        if (data) {
          dispatch(createAction(SAVE_CARD, data, true))
        }
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      });
  }
}

export function getAllApp(data) {
  return async function (dispatch) {
    return NetworkManager.requestWithoutToken(ApiConfig.users.showAllApp(data))
      .then(response => {
        // const data = _.get(response, 'data.data')
        // if (data) {
        //   dispatch(createAction(SAVE_CARD, data, true))
        // }
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      });
  }
}