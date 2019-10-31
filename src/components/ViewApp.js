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
  TextInputForm, Avatar
} from '../components'
import _ from 'lodash'
import Colors from '../constants/colors'
import FastImage from 'react-native-fast-image'
import { Helper, HUD, i18next } from '../utils'
const { width, height } = Dimensions.get('window')

export default class ViewApp extends PureComponent {
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
    console.log(data);

    const {
      DOB,
      FULLNAME,
      CCCD_NUMBER,
      CCCD_FRONT_IMG_URL,
      CCCD_BACK_IMG_URL,
      PROFILE_IMG_URL,
      CCCD_DATE,
      CCCD_PLACE,
      EMAIL,
      PHONE_NUMBER,
      ADDRESS,
      GENDER,
      STATUS
    } = data

    const title = ''

    return (
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps='handled'>
        {this.renderImageView(i18next.t('Avatar'), PROFILE_IMG_URL)}
        {this.renderImageView(i18next.t('FrontID'), CCCD_FRONT_IMG_URL)}
        {this.renderImageView(i18next.t('BackID'), CCCD_BACK_IMG_URL)}
        <TextInputForm
          value={STATUS}
          placeholder={i18next.t('Status')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={CCCD_NUMBER}
          placeholder={i18next.t('CcccNumber')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={CCCD_DATE}
          placeholder={i18next.t('CccdDate')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={CCCD_PLACE}
          placeholder={i18next.t('CccdPlace')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={FULLNAME}
          placeholder={i18next.t('FullName')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={DOB}
          placeholder={i18next.t('DOB')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={EMAIL}
          placeholder={i18next.t('Email')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={PHONE_NUMBER}
          placeholder={i18next.t('PhoneNumber')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={ADDRESS}
          placeholder={i18next.t('Address')}
          textStyle={styles.textInput}
          editable={false}
          placeholderColor={Colors.gray_5}
          onChangeText={this.onChangeTextTitle}
          containerStyle={styles.inputFormContainer}
          containerInputStyle={{ borderBottomColor: Colors.black_4, paddingBottom: 10 }}
        />
        <TextInputForm
          value={GENDER}
          placeholder={i18next.t('Gender')}
          textStyle={styles.textInput}
          editable={false}
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