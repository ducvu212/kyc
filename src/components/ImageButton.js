import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import CommonStyles from '../constants/styles';

export default class ImageButton extends PureComponent {

  render() {
    const { image, text, style, textStyle, imageStyle } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Image
          style={[styles.image, imageStyle]}
          source={image}
          resizeMode={resizeMode.contain}
        />
        <Text
          style={[CommonStyles.textJp14, styles.text, textStyle]}
          numberOfLines={1}
          ellipsizeMode='middle'
        >{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: Colors.red_3,
    overflow: 'hidden',
    borderRadius: 36,
    backgroundColor: Colors.white,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingRight: 12,
    paddingLeft: 5,
    marginRight: 28,
    height: 36,
    marginTop: 18,
  },
  image: {
    width: 27,
    height: 27,
  },
  text: {
    color: Colors.red_3,
    paddingLeft: 10,
    lineHeight: 24,
    fontFamily: Fonts.hiraKakuProW3,
  }
})
