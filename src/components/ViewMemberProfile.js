import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import CommonStyles from '../constants/styles';
import Colors from '../constants/colors';
import Images from '../constants/images';
import { i18next, StatusHelper } from '../utils';
import {
  showModalPhotoView,
} from '../navigator';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateHelper from '../utils/DateHelper';
import DateFormat from '../constants/date-format';
import Helper from '../utils/Helper';
import Fonts from '../constants/fonts';
import LabelText from './LabelText';

const ELEVATION = 5
const AVATAR_SIZE = 116

export default class ViewUserProfile extends React.Component {

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    if (!_.isEqual(this.props.user, nextProps.user) ||
      this.props.isCurrentUser !== nextProps.isCurrentUser ||
      this.props.isUserActive !== nextProps.isUserActive) {
      return true
    }
    return false
  }

  onRefreshData() {
    this.setState({ refreshing: true }, () => {
      // this.doGetMemberInfo()
    })
  }

  render() {
    const {
      user,
    } = this.props

    if (!user) return null

    const {
      FULL_NAME,
      USERNAME,
      PHONE_NUMBER,
      EMAIL,
      img_url
    } = user.me

    const image = img_url ? { uri: img_url } : Images.default_avatar

    return (
      <ScrollView
        keyboardShouldPersistTaps='handled'>
        <View style={[{ alignItems: 'center', paddingBottom: 32 }]}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={this.onPressAvatar}>
            <Image
              style={styles.avatar}
              source={image}
            />
          </TouchableOpacity>

        </View>

        <LabelText
          title={i18next.t('Name')}
          // placeholder={i18next.t('Name')}
          value={Helper.checkNullText(FULL_NAME)}
          // style={styles.information}
          // styleTextInput={styles.textInputStyle}
        />

        <LabelText
          title={i18next.t('Username')}
          // placeholder={i18next.t('Username')}
          value={USERNAME}
          // icon={Images.icon_picker}
          // showIcon={false}
          // style={styles.information}
          // styleTextInput={styles.textInputStyle}
        />
        <LabelText
          title={i18next.t('PhoneNumber')}
          // placeholder={i18next.t('PhoneNumber')}
          // placeholderTextColor={Colors.gray_5}
          value={PHONE_NUMBER}
          // style={styles.information}
          // styleTextInput={styles.textInputStyle}
        />
        <LabelText
          value={EMAIL}
          title={i18next.t('Email')}
          // placeholder={i18next.t('Email')}
          // placeholderTextColor={Colors.gray_5}
          // style={styles.information}
          // styleTextInput={styles.textInputStyle}
          // editable={false}
        />

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  avatarContainer: {
    alignSelf: 'center',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginTop: 26,
    borderWidth: 0,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.light_gray,
    borderColor: Colors.gray_5,
    shadowColor: Colors.gray_5,
    shadowOffset: {
      width: 0,
      height: 0.6 * ELEVATION,
    },
    shadowOpacity: 0.0015 * ELEVATION + 0.18,
    shadowRadius: 0.54 * ELEVATION,
    overflow: 'hidden'
  },
  information: {
    marginVertical: 15,
  },
  textInputStyle: {
    ...Platform.select({
      android: {
        lineHeight: 21,
      }
    }),
    // lineHeight: 18,
    paddingHorizontal: 0,
    flex: 1,
  },
  textMessageImage: {
    color: Colors.red,
    fontSize: 12,
    textAlign: 'center',
  },
  textStyle: {
    ...CommonStyles.textJp14,
    // fontFamily: Fonts.hiraKakuProW6,
  }
})
