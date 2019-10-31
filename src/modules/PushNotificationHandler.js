// import firebase from 'react-native-firebase'
// import { Platform } from 'react-native'
// // import DeviceInfo from 'react-native-device-info';
// // import NetworkManager from '../utils/NetworkManager'
// // import ApiConfig from '../config/api-config'
// import { CLICK_NOTIFICATION } from '../actions/action-types'
// import { dispatchAction } from '../store'
// import _ from 'lodash'

// const ANDROID_CHANNEL_ID = 'tasuki-channel'
// const ANDROID_CHANNEL_NAME = 'Tasuki-channel'
// const SMALL_ICON = 'ic_launcher_round'

// const bgMessaging = async (data) => {
//   //handle bg for android
//   showNotificationAndroid(data.data)
//   // setBadge()
// }

// const showNotificationAndroid = async (data) => {
//   const localNotification = new firebase.notifications.Notification()
//     .setNotificationId(data.notificationId)
//     .setTitle(data.title)
//     .setData({ data })
//     .setBody(data.body)
//     .android.setChannelId(ANDROID_CHANNEL_ID)
//     .android.setSmallIcon(SMALL_ICON)
//   return firebase.notifications().displayNotification(localNotification);
// }

// const requestPermissionAndListen = async () => {
//   try {
//     await firebase.messaging().requestPermission();

//     // User has authorised and listen permission
//     listenNotifications()

//     // return
//     return Promise.resolve(true)
//   } catch (error) {
//   }

//   // User has rejected permissions
//   return Promise.reject(false)
// }

// const permissionEnabled = async () => {
//   try {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//       // user has permissions
//       return Promise.resolve(true)
//     }
//   } catch (error) {
//   }

//   // User has rejected permissions
//   return Promise.reject(false)
// }

// const currentToken = async () => {
//   try {
//     const fcmToken = await firebase.messaging().getToken();
//     if (fcmToken) {
//       // user has a device token
//       return Promise.resolve(fcmToken)
//     }
//   } catch (error) { }

//   // user doesn't have a device token yet
//   return Promise.reject(null)
// }

// const listenNotifications = async () => {

//   // unlisten prev listener
//   unlistener()

//   // check permissions
//   let enabled = false;
//   try {
//     enabled = await permissionEnabled();
//   } catch (error) {
//   }
//   // user has rejected permissions
//   if (enabled === false) {
//     return
//   }

//   // Create chanel for notification android
//   const channel = new firebase.notifications.Android.Channel(
//     ANDROID_CHANNEL_ID,
//     ANDROID_CHANNEL_NAME,
//     firebase.notifications.Android.Importance.High,
//   );
//   firebase.notifications().android.createChannel(channel);

//   this.messageListener = firebase.messaging().onMessage((message) => {
//     // Process your message as required
//     // handle for Android
//     showNotificationAndroid(message._data)
//     // setBadge()
//   });

//   // receviced in foreground
//   this.notificationUnlistener = firebase.notifications().onNotification((notification) => {
//     // Process your notification as required
//     try {
//       showNotification(notification)
//     } catch (error) { }
//   });

//   // Displayed
//   this.notificationDisplayedUnlistener = firebase.notifications().onNotificationDisplayed((notification) => {
//     // reloadNotification(true)
//     // Process your notification as required
//     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//   });

//   // when a notification is clicked / tapped / opened
//   // App in Foreground and background
//   this.notificationOpenedUnlistener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//     // Get the action triggered by the notification being opened
//     const action = notificationOpen.action;
//     // Get information about the notification that was opened
//     const notification = notificationOpen.notification;
//     firebase.notifications().removeDeliveredNotification(notification._notificationId)
//     clickNotification(notification)
//   });


//   try {
//     // App Closed
//     const notificationOpen = await firebase.notifications().getInitialNotification();
//     if (notificationOpen) {
//       // App was opened by a notification
//       // Get the action triggered by the notification being opened
//       const action = notificationOpen.action;
//       // Get information about the notification that was opened
//       const notification = notificationOpen.notification;
//       firebase.notifications().removeDeliveredNotification(notification._notificationId)
//       clickNotification(notification)
//     }
//   } catch (error) {
//   }

// }

// const showNotification = async (notification) => {
//   // set channel for android
//   const new_notification = notification
//     .android.setChannelId(ANDROID_CHANNEL_ID)
//     .android.setSmallIcon(SMALL_ICON)
//   //  show
//   return firebase.notifications().displayNotification(new_notification).catch(err => console.error(err));
// }

// const setBadge = async (badge) => {
//   let number = parseInt(badge)
//   try {
//     if (number <= 0) {
//       await firebase.notifications().setBadge(0)
//       return
//     }
//     await firebase.notifications().setBadge(number)
//   } catch (eror) {
//   }
// }

// const unlistener = () => {
//   if (this.notificationOpenedUnlistener) {
//     this.notificationOpenedUnlistener()
//   }
//   if (this.notificationUnlistener) {
//     this.notificationUnlistener()
//   }
//   if (this.notificationDisplayedUnlistener) {
//     this.notificationDisplayedUnlistener()
//   }
// }

// const removeToken = async () => {
//   try {
//     await firebase.notifications().removeAllDeliveredNotifications()
//   } catch (error) {
//   }
// }

// const clickNotification = (notification) => {
//   let notificationId = ''
//   let notificationType = ''
//   if (Platform.OS === 'ios') {
//     notificationId = _.get(notification, '_data.notificationId') || ''
//     notificationType = _.get(notification, '_data.type') || ''
//   } else {
//     notificationId = _.get(notification, '_data.data.notificationId') || ''
//     notificationType = _.get(notification, '_data.data.type') || ''
//   }
//   const payload = {
//     notification_id: notificationId,
//     notification_type: notificationType
//   }
//   dispatchAction({
//     type: CLICK_NOTIFICATION,
//     payload
//   })
// }

// const addNotification = (notification) => {
//   // const notificationType = _.get(notification, '_data.type')
//   // const notificationId = _.get(notification, '_data.notificationId')
//   // const params = _.get(notification, '_data.params') || ""
//   // const content = params == '' ? [] : JSON.parse(params)

//   // const newNotification = {
//   //   content,
//   //   created_at: 1566568686,
//   //   id: notificationId,
//   //   seen: true,
//   //   notificationType: notificationType,
//   //   sender_id: ''
//   // }
//   // const notification = getState().notification || null
//   // const currentNotification = notification ? (notification.data || []) : []
//   // const newNotifications = currentNotification.concat(newNotification)
// }

// export default {
//   requestPermissionAndListen,
//   currentToken,
//   permissionEnabled,
//   listenNotifications,
//   unlistener,
//   setBadge,
//   removeToken,
//   bgMessaging,
//   showNotificationAndroid
// }
