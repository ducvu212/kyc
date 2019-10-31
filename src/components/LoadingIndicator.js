import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import CommonStyles from '../constants/styles'

export default class LoadingIndicator extends PureComponent {
  render() {
    const { center, animating, color, height, size } = this.props

    const heightIndicator = height ? height : 46

    const style =
      center ?
        { ...CommonStyles.position_absolute_full, alignSelf: 'center' }
        :
        { height: heightIndicator, marginVervical: 20 }

    return (
      <ActivityIndicator
        style={style}
        animating={animating}
        color={color}
        size={size}
      />
    )
  }
}
