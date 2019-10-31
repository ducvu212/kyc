import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Platform, Text } from 'react-native';
import _ from 'lodash'
import CardView from 'react-native-cardview'
import Colors from '../constants/colors'
import FastImage from 'react-native-fast-image'
import { Avatar } from '.';
import Images from '../constants/images';

export default class ItemApplication extends PureComponent {
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
    const isIos = Platform.OS === 'ios'
    const background = isIos ? {backgroundColor: Colors.white_6} : null
    const { width, height } = this.props
    if (!item) return
    const {
      FULLNAME,
      DOB,
      CCCD_NUMBER,
      PROFILE_IMG_URL
    } = item

    return (
      <TouchableOpacity
        onPress={this.onPressItem}>
        <CardView
          style={[{ marginVertical: 12, flexDirection: 'row', paddingHorizontal: 24, height, width }, background]}
          cardElevation={7}
          cardMaxElevation={5}
          cornerRadius={10}>
          <Avatar
            source={{uri: PROFILE_IMG_URL}}
            style={{ alignSelf: 'center' }}
          />
          <View
            style={styles.container}>
            <Text style={styles.title}>{FULLNAME}</Text>
            <Text style={styles.subTitle}>{DOB}</Text>
            <Text style={styles.subTitle}>{CCCD_NUMBER}</Text>
          </View>
        </CardView>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    paddingLeft: 24,
    paddingVertical: 6,
    color: Colors.orange,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 16,
    paddingLeft: 24,
    paddingVertical: 12,
    color: Colors.black_2,
  },
})