import { Navigation } from 'react-native-navigation';
import {
  Platform,
} from 'react-native'
import ScreenName from '../config/screens-name';
import _ from 'lodash'

const lastScreen = { screenName: null }

export function enablePopGesture(componentId, popGesture) {
  Navigation.mergeOptions(componentId, {
    popGesture,
  });
};

export function back(componentId, toRoot) {
  lastScreen.screenName = null
  if (toRoot) {
    Navigation.popToRoot(componentId)
  } else {
    Navigation.pop(componentId);
  }
}

export function backToComponent(componentId) {
  Navigation.popTo(componentId);
}

export function openLeftMenu(callback) {
  Navigation.showOverlay({
    component: {
      name: ScreenName.leftMenu,
      passProps: {
        callback
      }
    }
  })
}

export function openRightMenu(callback) {
  Navigation.showOverlay({
    component: {
      name: ScreenName.rightMenu,
      passProps: {
        callback
      }
    }
  })
}


export function pushScreen(componentId, screenName, data, options, callback) {
  const id = _.get(options, 'componentId')

  if (Platform.OS === 'android' && screenName === lastScreen.screenName) return
  lastScreen.screenName = screenName

  Navigation.push(componentId, {
    component: {
      name: screenName,
      id,
      passProps: {
        data,
        options,
        callback
      },
      options: {}
    }
  });
};


export function showModal(screenName, data, options, callback, componentId) {
  const cId = componentId ?
    { id: componentId }
    :
    null

  if (Platform.OS === 'android' && screenName === lastScreen.screenName) return
  lastScreen.screenName = screenName

  Navigation.showModal({
    stack: {
      children: [{
        component: {
          name: screenName,
          ...cId,
          passProps: {
            data,
            options,
            callback
          },
          options: {
            topBar: {
              drawBehind: true,
              visible: false,
            },
          }
        }
      }]
    }
  });
};

export function showModalNotificationDetail(screenName, data, options, callback, componentId) {
  const cId = componentId ?
    { id: componentId }
    :
    null

  if (Platform.OS === 'android' && screenName === lastScreen.screenName) return
  lastScreen.screenName = screenName

  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: ScreenName.notifications,
          }
        },
        {
          component: {
            name: screenName,
            ...cId,
            passProps: {
              data,
              options,
              callback
            },
            options: {
              topBar: {
                drawBehind: true,
                visible: false,
              },
            }
          }
        }]
    }
  });
};

export async function dismissModal(componentId) {
  try {
    lastScreen.screenName = null

    await Navigation.dismissModal(componentId);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function dimissOverlay(componentId) {
  try {
    await Navigation.dismissOverlay(componentId);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
}
