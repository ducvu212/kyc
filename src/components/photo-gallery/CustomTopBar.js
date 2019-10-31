import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import Colors from '../../constants/colors'
import Images from '../../constants/images'
import Device from '../../modules/Device'
import CommonStyles from '../../constants/styles'
import { i18next } from '../../utils'
import _ from 'lodash'

export default class CustomTopBar extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    onPressTitle: PropTypes.func,
    onPressLeftBarButton: PropTypes.func,
    onPressRightBarButton: PropTypes.func
  }

  static defaultProps = {
    title: 'title',
    colorBackground: 'transparent',
    showBottomBorder: true
  };

  constructor(props) {
    super(props)
    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressRightBarButton = this.onPressRightBarButton.bind(this)
    this.onPressTitle = this.onPressTitle.bind(this)
  }


  onPressLeftBarButton() {
    if (this.props.onPressLeftBarButton) {
      this.props.onPressLeftBarButton()
    }
  }

  onPressRightBarButton() {
    if (this.props.onPressRightBarButton) {
      this.props.onPressRightBarButton()
    }
  }

  onPressTitle() {
    if (this.props.onPressTitle) {
      this.props.onPressTitle()
    }
  }

  render() {
    const isIos = Platform.OS === 'ios'
    const statusBarHeight = Device.statusBarSize().height
    const topBarHeight = Device.topBarSize().height

    const { title, disabledRight, hasSelected } = this.props

    return (
      <View style={[styles.container, { height: statusBarHeight + topBarHeight }]} >

        {
          isIos &&
          < View style={[
            CommonStyles.position_absolute_full,
            {
              backgroundColor: Colors.white,
            },
            styles.shadow]} />
        }

        <View style={[{ marginTop: statusBarHeight, flex: 1 }]} >
          <TouchableOpacity
            style={[styles.buttonBar, { left: 16 }]}
            onPress={this.onPressLeftBarButton}
          >
            <Text
              style={styles.buttonText}
            >
              {i18next.t('Cancel')}
            </Text>
          </TouchableOpacity>
          <View
            style={styles.titleContainer}
            onPress={this.onPressTitle}
          >
            <Text
              style={styles.title}
              numberOfLines={1}
            >
              {title}
            </Text>
            {/*<View style={{ justifyContent: 'center', flexDirection: 'row' }}>*/}
              {/*<Text*/}
                {/*style={styles.subTitle}*/}
                {/*numberOfLines={1}*/}
              {/*>*/}
                {/*{i18next.t('TapToChange')}*/}
              {/*</Text>*/}
              {/*<Image*/}
                {/*source={Images.down}*/}
                {/*resizeMode='contain'*/}
                {/*style={{*/}
                  {/*width: 9,*/}
                  {/*height: 9,*/}
                  {/*marginLeft: 5,*/}
                {/*}}*/}
              {/*/>*/}
            {/*</View>*/}
          </View>

          <TouchableOpacity
            style={[styles.buttonBar, { right: 16 }]}
            onPress={this.onPressRightBarButton}
            disabled={disabledRight}
          >
            {
              hasSelected && (
                <Text
                  style={styles.buttonText}
                >
                  {i18next.t('Done')}
                </Text>
              )
            }
            {
              !hasSelected && (
                <Image
                  source={Images.camera}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              )
            }
          </TouchableOpacity>

        </View>

        {
          !isIos &&
          < View style={[
            {
              height: 0.5,
              backgroundColor: Colors.light_gray
            }]} />
        }
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'space-evenly',
    top: 2,
    bottom: 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.gray_1,
  },
  subTitle: {
    fontSize: 9,
    alignSelf: 'center',
    color: Colors.gray_1,
  },
  buttonText: {
    textAlign: 'right',
    fontSize: 14,
    color: Colors.blue_3,
  },
  buttonBar: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 2,
    bottom: 2,
    position: 'absolute',
  },
  shadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.black_1,
    shadowOpacity: 1,
    shadowRadius: 7,
  }
});
