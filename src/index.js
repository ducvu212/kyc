import { Navigation } from 'react-native-navigation';
import { defautOptions } from './navigator/options';
import { registerScreens } from './config/screens-register';
import { setRootToLaunchScreen } from './navigator';
import { Reachability } from './utils'
import Device from './modules/Device'
// import AppHandler from './modules/AppHandler'
// import SocketManager from './modules/SocketManager'
// import PushNotificationHandler from './modules/PushNotificationHandler';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {

  // options
  Navigation.setDefaultOptions(defautOptions);

  // setroot
  setRootToLaunchScreen()

  // app state
  // AppHandler.listenState()

  // listen
  // Reachability.listen()

  // get device info
  Device.configure()

  // socket
  // SocketManager.connect()

  // PushNotification
  // PushNotificationHandler.listenNotifications()

});

Navigation.events().registerComponentDidAppearListener(({ componentId, componentName }) => {
  // console.log('registerComponentDidAppearListener: ' + componentId + " " + componentName)
});

Navigation.events().registerComponentDidDisappearListener(({ componentId, componentName }) => {
  // console.log('registerComponentDidAppearListener: ' + componentId + " " + componentName)
});
