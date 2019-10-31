import {
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import CameraRoll from '@react-native-community/cameraroll'
import { Permissions, request, check, PERMISSIONS } from 'react-native-permissions'

const getMedia = (count, options = {}) => {
  return CameraRoll.getPhotos({
    first: count,
    ...options
  }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  })
}

const takePicture = (camera, options = {}) => {
  const defaultOptions = {
    // base64: true,
    exif: true,
    pauseAfterCapture: true,
    forceUpOrientation: true,
    fixOrientation: true,
    orientation: "landscapeRight",
    ...options
  }
  return camera.takePictureAsync(defaultOptions)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

const takeVideo = (camera, options = {}) => {
  const defaultOptions = {
    mute: false,
    maxDuration: 5,
    quality: RNCamera.Constants.VideoQuality['480p'],
    ...options
  }
  return camera.recordAsync(defaultOptions)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

const requestWriteExternalStorage = async () => {
  try {
    if (Platform.OS === 'ios') return Promise.resolve(true)
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    return Promise.resolve(granted === PermissionsAndroid.RESULTS.GRANTED)
  }
  catch (err) {
    return Promise.reject(false)
  }
}

const checkPhotoPermission = async (options) => {
  try {
    let permission = null
    if (Platform.OS === 'ios') {
      permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    } else {
      permission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    }
    switch (permission) {
      case 'granted':
        return Promise.resolve(true)
      case 'denied':
        let response = null
        if (Platform.OS === 'ios') {
          response = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        } else {
          response = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        }
        return Promise.resolve(response === 'granted')
      default:
        return Promise.resolve(false)
    }
  } catch (error) {
    return Promise.resolve(error)
  }
}

const checkCameraPermission = async (options) => {
  try {
    let permission = null
    if (Platform.OS === 'ios') {
      permission = await check(PERMISSIONS.IOS.CAMERA)
    } else {
      permission = await check(PERMISSIONS.ANDROID.CAMERA)
    }

    switch (permission) {
      case 'granted':
        return Promise.resolve(true)
      case 'denied':
        let response = null
        if (Platform.OS === 'ios') {
          response = await request(PERMISSIONS.IOS.CAMERA)
        } else {
          response = await request(PERMISSIONS.ANDROID.CAMERA)
        }
        return Promise.resolve(response === 'granted')
      default:
        return Promise.resolve(false)
    }
  } catch (error) {
    return Promise.resolve(error)
  }
}

export default {
  getMedia,
  takePicture,
  takeVideo,
  checkCameraPermission,
  checkPhotoPermission,
  requestWriteExternalStorage,
}
