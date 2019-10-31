import { showModal, dismissModal } from './navigator'
import ScreenNames from '../config/screens-name'

export function showModalPhotoView(data, callback) {
  showModal(ScreenNames.photoView, data, {
    statusBar: {
      visible: false
    }
  }, callback)
}

export function dismissModalPhotoView(componentId) {
  dismissModal(componentId)
}

export function showModalCameraRoll(data, callback) {
  showModal(ScreenNames.cameraRoll, data, null, callback)
}

export function dismissModalPhotoGallery(componentId) {
  dismissModal(componentId)
}

export function showModalCamera(data, options, callback) {
  showModal(ScreenNames.camera, data, options, callback)
}

export function dismissModalCamera(componentId) {
  dismissModal(componentId)
}
