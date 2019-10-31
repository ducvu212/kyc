import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { getStore } from '../store/';

// ScreenName
import ScreenName from './screens-name'

// Container
import LaunchContainer from '../containers/LaunchContainer'
import LoginContainer from '../containers/LoginContainer'
import HomeContainer from '../containers/HomeContainer'
import NotificationContainer from '../containers/NotificationContainer'
import ApplicationContainer from '../containers/ApplicationContainer'
import ProfileContainer from '../containers/ProfileContainer'
import ProductDetailsContainer from '../containers/ProductDetailsContainer'
import IdentifyCardFirstContainer from '../containers/IdentifyCardFirstContainer'
import IdentifyCardBackContainer from '../containers/IdentifyCardBackContainer'
import FaceCompareContainer from '../containers/FaceCompareContainer'
import ConfirmInformationContainer from '../containers/ConfirmInformationContainer'
import AppDetailContainer from '../containers/AppDetailContainer'


// View
import LoadingScreen from '../utils/hud/LoadingScreen'
import AlertScreen from '../utils/hud/AlertScreen'
// import ActionSheet from '../components/action-sheet/ActionSheet'
import DateActionSheet from '../components/action-sheet/DateActionSheet'
import MemberMenuActionSheet from '../components/action-sheet/MemberMenuActionSheet'
import { ToastScreen } from '../utils/hud/ToastScreen'
import PhotoViewContainer from '../containers/PhotoViewContainer'
import CameraContainer from '../containers/CameraContainer'
import CameraRollContainer from '../containers/CameraRollContainer'


// register screens
export function registerScreens() {

  // register Component
  registerComponent(ScreenName.loading, LoadingScreen)
  registerComponent(ScreenName.alert, AlertScreen)
  registerComponent(ScreenName.toast, ToastScreen)
  // registerComponent(ScreenName.actionSheet, ActionSheet)
  registerComponent(ScreenName.dateActionSheet, DateActionSheet)
  registerComponent(ScreenName.memberMenuActionSheet, MemberMenuActionSheet)
  registerComponent(ScreenName.cameraRoll, CameraRollContainer)
  registerComponent(ScreenName.camera, CameraContainer)

  // register with Redux
  registerComponentWithRedux(ScreenName.launch, LaunchContainer)
  registerComponentWithRedux(ScreenName.login, LoginContainer)
  registerComponentWithRedux(ScreenName.home, HomeContainer)
  registerComponentWithRedux(ScreenName.application, ApplicationContainer)
  registerComponentWithRedux(ScreenName.notification, NotificationContainer)
  registerComponentWithRedux(ScreenName.profile, ProfileContainer)
  registerComponentWithRedux(ScreenName.productDetail, ProductDetailsContainer)
  registerComponentWithRedux(ScreenName.frontId, IdentifyCardFirstContainer)
  registerComponentWithRedux(ScreenName.backId, IdentifyCardBackContainer)
  registerComponentWithRedux(ScreenName.photoView, PhotoViewContainer)
  registerComponentWithRedux(ScreenName.faceCompare, FaceCompareContainer)
  registerComponentWithRedux(ScreenName.confirmScreen, ConfirmInformationContainer)
  registerComponentWithRedux(ScreenName.appDetail, AppDetailContainer)

}

const registerComponent = (screenName, ReduxScreen) => {
  Navigation.registerComponent(screenName, () => ReduxScreen)
}

const registerComponentWithRedux = (screenName, ReduxScreen) => {
  const store = getStore()
  Navigation.registerComponent(screenName, () => (props) => (
    <Provider store={store}>
      <ReduxScreen {...props} />
    </Provider>
  ), () => ReduxScreen);

}

export default { registerScreens }
