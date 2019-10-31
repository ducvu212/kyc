import _ from 'lodash';
import {
  LOGIN,
  createAction,
} from './action-types'
import NetworkManager from '../modules/NetworkManager'
import ApiConfig from '../config/api-config'

export function login(data) {

  return async function (dispatch) {
    return NetworkManager.requestWithoutToken(ApiConfig.auth.login(data))
      .then(response => {
        const data = response.data
        if (data) {
          dispatch(createAction(LOGIN, data, true))
        }
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      });
  }
}