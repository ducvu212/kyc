import { Navigation } from 'react-native-navigation';
import ScreenName from '../config/screens-name'
import Images from '../constants/images';
import { i18next } from '../utils'
import { popAnimations } from './options'

// goto screen functions
export const setRootToLaunchScreen = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            name: ScreenName.launch,
            options: {
              backgroundImage: Images.background_1
            }
          }
        }
      ],
      options: {
        statusBar: {
          visible: true,
          style: 'dark'
        },
        animations: {
          pop: popAnimations,
        }
      }
    }
  }
})

export const setRootToLoginScreen = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            name: ScreenName.login,
            options: {
              backgroundImage: Images.background,
            }
          }
        }
      ],
      options: {
        animations: {
          pop: popAnimations,
        }
      }
    }
  }
})

export const setRootToTutorialScreen = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            name: ScreenName.tutorial,
          }
        }
      ],
      options: {
        animations: {
          pop: popAnimations,
        }
      }
    }
  }
})

const bottomTabs = {
  id: 'bottomTabs',
  children: [
    {
      stack: {
        children: [{
          component: {
            name: ScreenName.home,
            id: 'home'
          }
        }],
        options: {
          bottomTab: {
            text: i18next.t('Home'),
            icon: Images.tabbar_home,
          },
          animations: {
            pop: popAnimations,
          }
        }
      }
    },
    {
      stack: {
        children: [{
          component: {
            name: ScreenName.application,
            id: 'application'
          }
        }],
        options: {
          bottomTab: {
            text: i18next.t('Application'),
            icon: Images.tabbar_application,
          },
          animations: {
            pop: popAnimations,
          }
        }
      }
    },
    {
      stack: {
        children: [{
          component: {
            name: ScreenName.notification,
            id: 'notification'
          }
        }],
        options: {
          bottomTab: {
            text: i18next.t('Notification'),
            icon: Images.tabbar_notification,
          },
          animations: {
            pop: popAnimations,
          }
        }
      }
    },
    {
      stack: {
        children: [{
          component: {
            name: ScreenName.profile,
            id: 'profile'
          }
        }],
        options: {
          bottomTab: {
            text: i18next.t('Profile'),
            icon: Images.tabbar_profile,
          },
          animations: {
            pop: popAnimations,
          }
        }
      }
    }
  ]
}

export const setBottomTabByIndex = (index) => {
  Navigation.mergeOptions('bottomTabs', {
    bottomTabs: {
      currentTabIndex: index
    }
  });
}

export const setRootToHomeScreen = () => Navigation.setRoot({
  root: {
    bottomTabs
  }
})
