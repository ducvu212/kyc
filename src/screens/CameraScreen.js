import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  BackHandler,
} from 'react-native'
import {
  dismissModalCamera,
} from '../navigator'
import { Navigation } from 'react-native-navigation'
import _ from 'lodash'
import Colors from '../constants/colors'
import Camera from '../components/photo-gallery/camera-view/Camera'

export default class CameraScreen extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.onPressCloseCamera = this.onPressCloseCamera.bind(this)
    this.onPressSelectFromCamera = this.onPressSelectFromCamera.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  onPressBackAndroid = () => {
    this.onPressCloseCamera()
    return true
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
    }
  }

  onPressCloseCamera() {
    dismissModalCamera(this.props.componentId)
  }

  onPressSelectFromCamera(newPhoto) {
    const photos = [{
      ...newPhoto,
      assetPath: newPhoto.uri
    }]
    this.props.callback && this.props.callback(photos)
    dismissModalCamera(this.props.componentId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          onPressCloseCamera={this.onPressCloseCamera}
          onPressSelectFromCamera={this.onPressSelectFromCamera}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
})
