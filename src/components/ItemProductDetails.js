import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import _ from 'lodash'
import CardView from 'react-native-cardview'
import Colors from '../constants/colors'
import FastImage from 'react-native-fast-image'

export default class ItemProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.onPressItem = this.onPressItem.bind(this)
  }

  onPressItem() {
    if (this.props.onPressItem) {
      this.props.onPressItem()
    }
  }

  render() {
    const item = _.get(this.props, 'item', null)

    const { width, height } = this.props
    if (!item) return
    const {
      TITLE,
      SUBTITLE,
      IMAGE_URL
    } = item
    const isSUb = SUBTITLE ? true : false
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onPressItem}>
        <Text style={styles.title}>{TITLE}</Text>
        {
          isSUb &&
          <Text style={styles.subTitle}>{SUBTITLE}</Text>
        }
        {
          URL &&
          <TouchableOpacity
            onPress={this.onPressUrl}>
            <Text style={styles.url}>{URL}</Text>
          </TouchableOpacity>
        }

        <CardView
          cardElevation={7}
          cardMaxElevation={5}
          cornerRadius={10}>

          <TouchableOpacity
            onPress={this.onPressItem}>
            <FastImage
              source={{ uri: IMAGE_URL }}
              style={{ width, height }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        </CardView>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    marginTop: 24
  },
  title: {
    fontSize: 20,
    color: Colors.orange,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 14,
    color: Colors.black_2
  },
  url: {
    fontSize: 14,
    color: Colors.blue_3
  }
})