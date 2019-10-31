
import Colors from './colors'
import Images from './images'

// COLOR
let color_1 = Colors.black_1

// IMAGES
let background = Images.background_theme_1


// reset theme resources
const reset = (theme, THEME) => {

  switch (theme) {
    case THEME.TH_1:
      color_1 = Colors.black_2
      background = Images.background_theme_1
      break;

    default:
      break;
  }
}

export default Themes = {
  reset,
  Colors: {
    color_1
  },
  Images: {
    background
  }
}