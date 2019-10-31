import { YellowBox, AppRegistry } from 'react-native';
// import PushNotificationHandler from './src/modules/PushNotificationHandler';

YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Task orp']);
YellowBox.ignoreWarnings(['Unrecognized WebSocket connection option(s) ']);
YellowBox.ignoreWarnings(['Setting a timer for a long period of time,']);
require('./src/index')
console.disableYellowBox = true;
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotificationHandler.bgMessaging)
