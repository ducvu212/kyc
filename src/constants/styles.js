import Colors from '../constants/colors'
import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
  textJp30: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 7.5,
          },
        ],
      },
    }),
    fontSize: 30,
  },
  textJp24: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 6,
          },
        ],
      },
    }),
    fontSize: 24,
  },
  textJp22: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 5.5,
          },
        ],
      },
    }),
    fontSize: 22,
  },
  textJp18: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 4.5,
          },
        ],
      },
    }),
    fontSize: 18,
  },
  textJp16: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 4,
          },
        ],
      },
    }),
    fontSize: 16,
  },
  textJp14: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 3.5,
          },
        ],
      },
    }),
    fontSize: 14,
  },
  textJp12: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 3,
          },
        ],
      },
    }),
    fontSize: 12,
  },
  textJp11: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 2.75,
          },
        ],
      },
    }),
    fontSize: 11,
  },
  textJp10: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 2.5,
          },
        ],
      },
    }),
    fontSize: 10,
  },
  textJp9: {
    ...Platform.select({
      ios: {
        transform: [
          {
            translateY: 2.25,
          },
        ],
      },
    }),
    fontSize: 9,
  },
  border_gray_46: {
    borderRadius: 4,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    height: 46,
  },
  border_gray: {
    borderColor: Colors.gray,
    borderWidth: 0.5,
  },
  border_light_gray: {
    borderColor: Colors.light_gray,
    borderWidth: 0.5,
  },
  border_light_gray_bottom: {
    borderColor: Colors.light_gray,
    borderBottomWidth: 0.5,
  },
  text_nav_bar: {
    color: Colors.black,
    fontSize: 18,
  },
  title_nav_bar: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold'
  },
  sub_title_nav_bar: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold'
  },
  position_absolute_full: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  position_absolute_bottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  position_absolute_top: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
