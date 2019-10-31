import DataManager from './DataManager'
import Themes from '../constants/themes'

const THEME_KEY = 'THEME_KEY'

const THEME = {
  TH_1: 'Theme 1',
  TH_2: 'Theme 2',
  TH_3: 'Theme 3',
  TH_4: 'Theme 4',
}

const setTheme = async (value) => {

  // dispatch action
  // const { dispatchAction } = require('../store')
  // dispatchAction(action)

  try {
    await DataManager.saveValue(value, THEME_KEY)
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(false)
  }
}


const resetTheme = async () => {
  try {
    const value = await DataManager.currentTheme()
    Themes.reset(value, THEME)

    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(false)
  }
}

const currentTheme = async () => {
  return DataManager.getValue(THEME_KEY)
}

export default {
  THEME,
  setTheme,
  currentTheme,
  resetTheme
}
