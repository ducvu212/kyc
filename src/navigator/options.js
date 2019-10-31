import Images from '../constants/images'
import Colors from '../constants/colors'
import ScreenName from '../config/screens-name'
import Fonts from '../constants/fonts'
// import Device from '../modules/Device';

export const pushAnimations = {
  // content: {
  //   x: {
  //     from: 1000,
  //     to: 0,
  //     duration: 300,
  //     // interpolation: 'accelerate'
  //   },
  // }
}

export const popAnimations = {
  // content: {
  //   x: {
  //     from: 0,
  //     to: 1000,
  //     duration: 250,
  //     interpolation: 'accelerate'
  //   },
  // }
}

export const defautOptions = {
  statusBar: {
    backgroundColor: Colors.transparent,
    style: 'dark',
    drawBehind: true
  },
  topBar: {
    drawBehind: true,
    visible: false,
  },
  bottomTabs: {
    titleDisplayMode: 'alwaysShow',
  },
  bottomTab: {
    iconInsets: { top: 2, left: 0, bottom: -2, right: 0 },
    fontSize: 10,
    // fontFamily: Fonts.hiraKakuProW6,
    selectedTextColor: Colors.orange,
    selectedIconColor: Colors.orange,
    iconColor: Colors.gray_11,
    textColor: Colors.gray_11
  },
  animations: {
    push: pushAnimations,
    pop: popAnimations,
  },
  layout: {
    orientation: ['portrait']
  },
  sideMenu: {
    left: {
      // shouldStretchDrawer: false, // defaults to true, when false sideMenu contents not stretched when opened past the width
      // animationVelocity: 2500 // defaults to 840, high number is a faster sideMenu open/close animation
    },
    animationType: 'slide', // defaults to none if not provided, options are 'parallax', 'door', 'slide', or 'slide-and-scale'
    openGestureMode: 'bezel'
  }
}
