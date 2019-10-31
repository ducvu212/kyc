
// import io from 'socket.io-client';
// import _ from 'lodash'
// import Config from 'react-native-config'
// import OAuthHandler from './OAuthHandler'
// import { dispatchAction } from '../store/'
// import { MESSAGE_CHAT_RECEIVED, MESSAGE_CHAT_SEEN } from '../actions/action-types'

// const CHANNEL_CREATED_MESSAGE = 'created_message'
// const CHANNEL_CONNECT = 'connect'
// const CHANNEL_DISCONNECT = 'disconnect'

// const MAX_RECONNECT_COUNT = 5
// let number_reconnect_attempt = 0

// const connect = async () => {
//   this.socket = io(Config.SOCKET_SERVER, { transports: ['websocket'] });
//   listen()
// }

// const sendMessage = (data) => {

//   // get access token
//   OAuthHandler.getAccessToken().then(token => {
//     const dataBody = { ...data, token }
//     this.socket.emit(CHANNEL_CREATED_MESSAGE, dataBody);
//   })
// }

// const listen = () => {

//   this.socket.on(CHANNEL_CONNECT, () => {
//     console.log('Socket CHANNEL_CONNECT')
//     number_reconnect_attempt = 0
//   });

//   this.socket.on(CHANNEL_DISCONNECT, () => {
//     console.log('Socket CHANNEL_DISCONNECT')
//     if (number_reconnect_attempt <= MAX_RECONNECT_COUNT) {
//       number_reconnect_attempt += 1
//       connect()
//     }

//   });

//   this.socket.on(CHANNEL_CREATED_MESSAGE, (data) => {
//     console.log('Socket CHANNEL_CREATED_MESSAGE', data)

//   });

// }

// export default {
//   connect,
//   sendMessage
// }
