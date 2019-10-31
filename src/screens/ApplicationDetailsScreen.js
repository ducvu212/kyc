import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  BackHandler,
  Text,
} from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  backToHome,
  back,
  dismissModal
} from '../navigator'
import Colors from '../constants/colors'
import { Background, TopBarView, TextInputForm, ViewApp } from '../components'
import _ from 'lodash'
import Images from '../constants/images'
import { Helper, HUD, i18next } from '../utils'
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('window')

export default class ApplicationDetailsScreen extends Component {
  static options(passProps) {
    return {
      statusBar: {
        backgroundColor: 'transparent',
        visible: true,
        style: 'dark'
      },
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  onPressBackAndroid() {
    dismissModal(this.props.componentId)
    return true
  }

  onPressLeftBarButton() {
    dismissModal(this.props.componentId)
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true

    }
  }

  render() {
    const { loading } = this.state

    return (
      <View style={[styles.container]}>
        <Background />
        <TopBarView
          imageLeft={Images.ic_close}
          tintColor={Colors.orange}
          title={i18next.t('AppDetail')}
          onPressLeftBarButton={this.onPressLeftBarButton}
        />
        {this.renderBody()}
      </View>
    )
  }

  renderBody() {
    console.log(this.props);
    
    const data = _.get(this.props, 'data', null)
    return (
      <View style={{ flex: 1 }}>
        <ViewApp
          data={data} />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
})
