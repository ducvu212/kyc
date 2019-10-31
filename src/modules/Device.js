import { Dimensions, NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

let statusHeight = 20
let topBarHeight = 44
let bottomTabHeight = 50
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

const screenSize = () => {
  return {
    width: screenWidth,
    height: screenHeight,
  }
}

const statusBarSize = () => {
  return {
    width: screenWidth,
    height: statusHeight,
  }
}

const topBarSize = () => {
  return {
    width: screenWidth,
    height: topBarHeight,
  }
}

const bottomBarSize = () => {
  return {
    width: screenWidth,
    height: bottomTabHeight,
  }
}

const { StatusBarManager } = NativeModules;

const configure = async () => {
  if (Platform.OS === 'android') {
    statusHeight = StatusBarManager.HEIGHT
  } else {
    StatusBarManager.getHeight((statusBarFrameData) => {
      statusHeight = statusBarFrameData.height;
    });
  }
}

export default Device = {
  configure,
  screenSize,
  statusBarSize,
  topBarSize,
  bottomBarSize,
  getVersion: () => {
    return DeviceInfo.getVersion()
  },
  getBuildNumber: () => {
    return DeviceInfo.getBuildNumber()
  },
  getBundleId: () => {
    return DeviceInfo.getBundleId()
  },
  getDeviceId: () => {
    return DeviceInfo.getUniqueId()
  },
  getManufacturer: () => {
    return DeviceInfo.getManufacturer()
  }
}
