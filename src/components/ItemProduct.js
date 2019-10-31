import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import _ from 'lodash'
import CardView from 'react-native-cardview'
import Colors from '../constants/colors'
import FastImage from 'react-native-fast-image'

export default class ItemProduct extends PureComponent {
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
      DESCRIPTION,
      IMAGE_URL
    } = item
    return (
      <View style={{ marginVertical: 16 }}>
        <Text style={styles.title}>{TITLE}</Text>
        <Text style={styles.subTitle}>{DESCRIPTION}</Text>
        <CardView
          cardElevation={7}
          cardMaxElevation={5}
          cornerRadius={10}
          style={styles.container}>

          <TouchableOpacity
            onPress={this.onPressItem}>
            <FastImage
              source={{ uri: IMAGE_URL }}
              style={{ width, height }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        </CardView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: Colors.white_6
  },
  title: {
    fontSize: 24,
    paddingLeft: 24,
    color: Colors.orange,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 14,
    paddingLeft: 24,
    paddingBottom: 24,
    color: Colors.black_2,
  },
})