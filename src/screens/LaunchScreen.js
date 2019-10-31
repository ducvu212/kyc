import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import {
  pushLoginScreen, setRootToHomeScreen, setRootToLoginScreen
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { Background } from '../components'
import SplashScreen from 'react-native-splash-screen'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'
import Device from '../modules/Device'

const { width, height } = Dimensions.get('window')

export default class LaunchScreen extends Component {
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
      // setTimeout(() => {
      //   this.setState({
      //     loading: true
      //   })
      setTimeout(() => {
        this.doGetInformation()
        // pushLoginScreen(this.props.componentId)
      }, 2000)
      // }, 4000)
    }
  }

  doGetInformation = () => {
    SplashScreen.hide()
    // const token_collection = _.get(this.props, 'user.me.token_collection') 
    // if(token_collection) {
    //   setRootToHomeScreen()
    // } else {
      setRootToLoginScreen()
    // }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Image
          source={Images.background_1}
          resizeMode='cover'
          style={{
            height,
            width,
          }}
        />
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
