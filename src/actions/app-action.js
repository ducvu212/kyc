import { GET_STATE, CLEAR_STATE } from './action-types'
import NetworkManager from '../modules/NetworkManager'
import ApiConfig from '../config/api-config'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getState() {
  return { type: GET_STATE }
}

