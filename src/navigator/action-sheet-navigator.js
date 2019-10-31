import { Navigation } from 'react-native-navigation';
import ScreenName from '../config/screens-name'

export function showActionSheetOptions(options, callback) {
  showActionSheet(ScreenName.actionSheet, options, callback)
}

export function showDateActionSheet(options, callback) {
  showActionSheet(ScreenName.dateActionSheet, options, callback)
}

export function showMemberMenuActionSheet(options, callback) {
  showActionSheet(ScreenName.memberMenuActionSheet, options, callback)
}

export function showActionSheet(screenName, options, callback) {
  Navigation.showOverlay({
    component: {
      name: screenName,
      passProps: {
        callback,
        options
      },
      options: {
        overlay: {
          interceptTouchOutside: true
        }
      }
    }
  });
}

export async function hideActionSheet(componentId) {
  try {
    await Navigation.dismissOverlay(componentId);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
}
