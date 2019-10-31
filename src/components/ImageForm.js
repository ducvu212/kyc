import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Images from '../constants/images';
import Colors from '../constants/colors';

const ELEVATION = 5

export default class ImageForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      imageSource,
      customImageContainerStyle,
      customImageStyle } = this.props;

    const source = imageSource ? { uri: imageSource } : Images.avatar_default

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.container, customImageContainerStyle]}>
        <Image
          source={source}
          style={customImageStyle}
        />
      </TouchableOpacity>
    )
  }

  onPress = () => {
    if (this.props.onPressImage) {
      this.props.onPressImage();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.red_2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0.6 * ELEVATION,
    },
    shadowOpacity: 0.0015 * ELEVATION + 0.18,
    shadowRadius: 0.54 * ELEVATION,
  },
});
