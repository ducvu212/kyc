import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import {
  TextInputForm
} from '../components'
import _ from 'lodash'
import Colors from '../constants/colors'
import FastImage from 'react-native-fast-image'
import { Helper, HUD, i18next } from '../utils'
const { width, height } = Dimensions.get('window')

export default class ViewAppDetail extends PureComponent {
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
    const data = _.get(this.props, 'data', null)
    const {
      dob,
      fullname,
      id_number,
      front,
      back,
      avatar
    } = data

    const title = ''

    return (
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps='handled'>
        {this.renderImageView(i18next.t('Avatar'), avatar)}
        {this.renderImageView(i18next.t('FrontID'), front)}
        {this.renderImageView(i18next.t('BackID'), back)}
        <TextInputForm
          value={id_number}
          placeholder={i18next.t('CcccNumber')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={title}
          placeholder={i18next.t('CccdDate')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={title}
          placeholder={i18next.t('CccdPlace')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={fullname}
          placeholder={i18next.t('FullName')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={dob}
          placeholder={i18next.t('DOB')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={title}
          placeholder={i18next.t('Email')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={title}
          placeholder={i18next.t('PhoneNumber')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={title}
          placeholder={i18next.t('Address')}
          textStyle={styles.textInput}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />

      </ScrollView>
    )
  }

  renderImageView(text, src) {
    return (
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 18, color: Colors.black_2, paddingVertical: 12 }}>{text}</Text>
        <FastImage
          source={{ uri: src }}
          style={{ width: width - 48, height: height / 3 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputFormContainer: {
    marginTop: 30,
  },
  textInput: {
    fontSize: 18,
    color: Colors.gray_1,
  },
})