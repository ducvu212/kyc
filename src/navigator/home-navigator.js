import { backToComponent, pushScreen, showModal } from './navigator'
import ScreenName from '../config/screens-name'

export function showModalProductDetails(data) {
    showModal(ScreenName.productDetail, data, null, null, ScreenName.productDetail)
}

export function showModalFrontId() {
    showModal(ScreenName.frontId, null, null, null, ScreenName.frontId)
}

export function pushScreenBackID(componentId, data) {
    pushScreen(componentId, ScreenName.backId, data, null)
}

export function pushScreenFaceCompare(componentId, data) {
    pushScreen(componentId, ScreenName.faceCompare, data, null, null)
}

export function pushScreenConfirmInformation(componentId, data) {
    pushScreen(componentId, ScreenName.confirmScreen, data, null, null)
}

export function showModalAppDetail(data) {
    showModal(ScreenName.appDetail, data, null, null, ScreenName.appDetail)
}

export function backToHome() {
    backToComponent(ScreenName.home)
  }