import { Linking } from 'react-native'
import _ from 'lodash'
import HUD from './hud'
import i18next from './languages'
import Colors from '../constants/colors'

// const validateCode = (code, length) => {
//   let checkCode = code.trim()
//   const reg = /^\d+$/g
//   if (checkCode.length < length) return false
//   return reg.test(checkCode)
// }

// const validateUsername = string => {
//   const regAllowedCharacters = /^[a-zA-Z0-9-_.@]+$/
//   const regNumber = /^\d+$/
//   const regSymbol = /^[_.@-]+$/
//   const regSameSequence = /^([a-z]|[A-Z][0-9])\1+$/

//   if (!string || string === '') {
//     return i18next.t('IsRequireItemPleaseEnterIt', { item: i18next.t('UserId') })
//   }
//   if ((string.length < 4 || string.length > 20)) {
//     return i18next.t('PleaseEnterUsernamer4to20Characters')
//   }
//   if (!regAllowedCharacters.test(string)) {
//     return i18next.t('TheCharactersCan_Alphanumberic_SpecialCharacter')
//   }
//   if (regNumber.test(string)) {
//     return i18next.t('DoNotIncludeOnlyTheNumberInTheUserID')
//   }
//   if (regSymbol.test(string)) {
//     return i18next.t('DoNotIncludeOnlyTheSymbolInTheUserID')
//   }
//   if (regSameSequence.test(string)) {
//     return i18next.t('UserIDMustNotContainTheSameSequence')
//   }
//   return null
// }

// const validatePassword = string => {
//   const regAllowedCharacters = /^[a-zA-Z\d_.@-]+$/
//   const regHasSpace = /\s/
//   const regHasNumberAndAlphabet = /^((?=.*?[a-z])|(?=.*?[A-Z]))(?=.*?\d)[a-zA-Z0-9-_.@]+$/

//   if (!string || string === '') {
//     return i18next.t('IsRequireItemPleaseEnterIt', { item: i18next.t('Password') })
//   }
//   if (string.length < 6) {
//     return i18next.t('PasswordShouldBeWithAtLeast6Characters')
//   }
//   if (regHasSpace.test(string)) {
//     return i18next.t('PasswordMustNotContainSpace')
//   }
//   if (!regAllowedCharacters.test(string)) {
//     return i18next.t('PasswordEnter_AllowedCharacters')
//   }
//   if (!regHasNumberAndAlphabet.test(string)) {
//     return i18next.t('PasswordMustContainLettersAndNumbers')
//   }
//   return null
// }

// const validateEmail = string => {
//   const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return reg.test(String(string).toLowerCase());
// }

// const validateMinLength = string => {
//   return !(string && string.length < 8)
// }

// const validatePhoneNumber = (string, length = 20) => {
//   const reg = /^\d+$/g
//   return string && reg.test(string)
// }

// const validateUrl = (string) => {
//   const reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
//   return string && reg.test(string)
// }

// const convertTimeToSecond = numberTime => {
//   if (numberTime) {
//     let stringTime = numberTime > 60 ?
//       convertNumberTwoCharacter(Math.floor(numberTime / 60)) + ':' + convertNumberTwoCharacter(numberTime % 60)
//       : '00:' + convertNumberTwoCharacter(numberTime)
//     return stringTime
//   }
//   return '00:00'
// }

// const convertNumberTwoCharacter = number => {
//   if (!number) return '00'
//   if (number >= 10) return number
//   return '0' + number
// }

// const showAlertNoNetworkConnection = (error, retryFunc) => {
//   const messages = _.get(error, 'data.messages') || null
//   if (!messages) return false
//   const noNetworkError = _.findIndex(messages, { message: 'noNetWorkConnection' })
//   if (noNetworkError !== -1) {
//     const opt = retryFunc ? { onPress: retryFunc } : { type: 'cancel' }
//     const options = {
//       buttons: [
//         {
//           text: i18next.t('OK'),
//           invertedColors: true,
//           ...opt,
//         }
//       ]
//     };
//     const data = {
//       title: i18next.t('Error'),
//       message: i18next.t('CouldNotConnectToInternet'),
//     }
//     HUD.showAlert(data, options)
//     return true
//   }
//   return false
// }

const handleOpenLink = (url) => {
  if (!url) return
  Linking.canOpenURL(url).then(supported => {
    supported && Linking.openURL(url)
  }, err => { })
}

// const encryptedText = (text) => {
//   if (!text) return null
//   const CryptoJS = require('crypto-js')
//   const encrypted = CryptoJS.SHA256(text)
//   return CryptoJS.enc.Base64.stringify(encrypted)
// }

const imageSource = (uri, image_default) => {
  if (!uri) {
    return image_default
  }
  return {
    uri
  }
}

// const fullName = (last_name, first_name) => {
//   return (last_name || '') + ' ' + (first_name || '')
// }

// _.mixin({
//   'mergeByKey': function (array1, array2, key) {
//     var criteria = {};
//     criteria[key] = null;
//     return _.map(array1, function (item) {
//       criteria[key] = item[key];
//       return _.merge(item, _.find(array2, criteria));
//     });
//   }
// });

// const mergeByKey = (array1, array2, key) => {
//   return _.mergeByKey(array1, array2, key);
//   // return _(array1)
//   //   .keyBy(key)
//   //   .merge(_.keyBy(array2, key))
//   //   .values()
//   //   .value();
// }

// const getRole = role => {
//   switch (role) {
//     case Role.ADMIN:
//       return i18next.t('Admin')
//     case Role.ROOT:
//       return i18next.t('Root')
//     case Role.MEMBER:
//       return i18next.t('Member')
//     default:
//       return null
//   }
// }

// const getGenderText = gender => {
//   switch (gender) {
//     case 'male':
//       return i18next.t('Male')
//     case 'female':
//       return i18next.t('Female')
//     default:
//       return null
//   }
// }

// const getPageList = (data, size_page = 1) => {
//   if (!data || data.length === 0) return 1
//   return parseInt(data.length / size_page)
// }

const checkNullText = (text) => text ? text : ''

export default {
  //   validateCode,
  //   validateUsername,
  //   validatePassword,
  //   validateMinLength,
  //   validatePhoneNumber,
  //   validateEmail,
  //   validateUrl,
  //   convertTimeToSecond,
  //   convertNumberTwoCharacter,
  //   showAlertNoNetworkConnection,
  //   encryptedText,
  imageSource,
  checkNullText,
  //   fullName,
  handleOpenLink,
  //   mergeByKey,
  //   getRole,
  //   getGenderText,
  //   getPageList
}
