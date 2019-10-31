// import AsyncStorage from '@react-native-community/async-storage';
// import * as Keychain from 'react-native-keychain';
// import Device from './Device';

// const APP_PREFIX = 'EKYC_'

// const saveValue = async (value, key) => {
//   const app_key = `${APP_PREFIX}${key}`

//   try {
//     if (value) {
//       await AsyncStorage.setItem(app_key, value.toString());
//     } else {
//       await AsyncStorage.removeItem(app_key)
//     }
//     return Promise.resolve(true)
//   } catch (error) {
//     return Promise.reject(false)
//   }
// }

// const getValue = async (key) => {
//   const app_key = `${APP_PREFIX}${key}`
//   let value = null;

//   try {
//     value = await AsyncStorage.getItem(app_key);
//     if (value) {
//       return Promise.resolve(value)
//     }
//   } catch (error) {
//   }

//   return Promise.reject(value)
// }

// const removeValue = async (key) => {
//   const app_key = `${APP_PREFIX}${key}`

//   try {
//     await AsyncStorage.removeItem(app_key)
//     return Promise.resolve(true)
//   } catch (error) {
//     return Promise.reject(false)
//   }
// }

// const clearAllData = async (exception_keys) => {

//   try {
//     const all_keys = await AsyncStorage.getAllKeys()
//     if (all_keys) {
//       // get key of app
//       const app_keys = all_keys.filter((value) => {

//         var exception_key = value.replace(APP_PREFIX, '');
//         if (exception_keys.includes(exception_key)) {
//           return false
//         }

//         return value.includes(APP_PREFIX)
//       })

//       // remove keys
//       await AsyncStorage.multiRemove(app_keys)
//       return Promise.resolve(true)
//     }
//   } catch (error) {
//   }

//   return Promise.reject(false)
// }

// const saveKeyChain = async (key, value) => {
//   const app_key = `${APP_PREFIX}${key}`
//   const server = Device.getBundleId()
//   try {
//     if (value) {
//       await Keychain.setInternetCredentials(server, app_key, value)
//     } else {
//       await Keychain.resetInternetCredentials(server)
//     }
//     return Promise.resolve(true)
//   } catch (error) {}

//   return Promise.reject(false)
// }

// const getKeyChain = async (key) => {
//   const app_key = `${APP_PREFIX}${key}`
//   const server = Device.getBundleId()
//   let data = null

//   try {
//     const credentials = await Keychain.getInternetCredentials(server)
//     if (!credentials || credentials.username !== app_key) return Promise.resolve(data)

//     value = credentials.password
//     data = {
//       key: credentials.username,
//       value: credentials.password
//     }
//     return Promise.resolve(data)
//   } catch (error) {}

//   return Promise.reject(data)
// }

// export default {
//   getValue,
//   saveValue,
//   removeValue,
//   saveKeyChain,
//   getKeyChain,
//   clearAllData
// }
