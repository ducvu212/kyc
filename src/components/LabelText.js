import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Platform, Text } from 'react-native';
import _ from 'lodash'
import CardView from 'react-native-cardview'
import Colors from '../constants/colors'
import FastImage from 'react-native-fast-image'
import { Avatar } from '.';
import Images from '../constants/images';

export default class LabelText extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const isIos = Platform.OS === 'ios'
    const background = isIos ? {backgroundColor: Colors.white_6} : null
    const {
        title,
        value
    } = this.props
    return (
      <View style={{flexDirection: 'row', borderBottomColor: Colors.gray_5, borderBottomWidth: 0.5, alignItems: 'flex-start', marginVertical: 24}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    paddingBottom: 6,
    color: Colors.orange,
    flex: 2,
    alignSelf: 'flex-end'
  },
  value: {
    fontSize: 20,
    paddingBottom: 6,
    color: Colors.black_2,
    flex: 3,
    alignSelf: 'flex-start'
  },
})