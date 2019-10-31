import React, { PureComponent } from 'react'
import {
  View,
  Dimensions,
  Image,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

const { width, height } = Dimensions.get('window')

export default class PhotoSlideShowItem extends PureComponent {
  static defaultProps = {
    data: {}
  }

  render() {
    const data = _.get(this.props, 'data')

    return (
      <View style={{ width, height: 254 }}>
        {
          data.url && (
            <FastImage
              source={{ uri: data.url }}
              style={{ flex: 1 }}
              resizeMode='cover'
            />
          )
        }
        {
          data.uri && (
            <Image
              source={{ uri: data.uri }}
              style={{ flex: 1 }}
              resizeMode='cover'
            />
          )
        }
      </View>
    )
  }
}
