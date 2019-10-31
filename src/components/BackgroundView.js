
import React from 'react';
import { View, Image, Platform, } from 'react-native';
import Themes from '../constants/themes'
import CommonStyles from '../constants/styles'
import { connect } from 'react-redux';
import { } from '../actions';

class Background extends React.PureComponent {

  // shouldComponentUpdate(nextProps, nextState) {

  //   return true
  // }

  render() {
    const { androidOnly } = this.props

    if (androidOnly && Platform.OS === 'ios') return null

    const background = this.props.backgroundImage || Themes.Images.background
    return (
      <View style={[CommonStyles.position_absolute_full]}>
        <Image style={[{ flex: 1, width: '100%', height: '100%' }]}
          source={background}
          resizeMode='cover'
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return {
    user,
  };
};

const BackgroundView = connect(
  mapStateToProps,
  {
  }
)(Background);

export default BackgroundView

