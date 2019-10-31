import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { StyleSheet, View, Image, Dimensions, Text} from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  setRootToTutorialScreen,
  pushUserBasicInfoScreen
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { Background } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'

const { width, height } = Dimensions.get('window')

export default class NotificationScreen extends Component {
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

    this.state = {
      loading: false
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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
        <Text style={{alignItems: 'center', justifyContent: 'center', fontSize: 24}}>
        {'Notification Screen'}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent
  },
  activityIndicator: {
    // marginTop: 110
  },
})
