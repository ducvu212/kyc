
import { pushScreen, backToComponent } from './navigator';
import ScreenName from '../config/screens-name'

export function pushLoginScreen(componentId, data, options, callback) {
  pushScreen(componentId, ScreenName.login, data, options, callback)
}
