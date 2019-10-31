import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  BackHandler,
} from 'react-native'
import { dismissModalPhotoGallery } from '../navigator'
import { Navigation } from 'react-native-navigation'
import { PhotoGallery } from '../components/photo-gallery'
import _ from 'lodash'
import Colors from '../constants/colors'

export default class CameraRollScreen extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressRightBarButton = this.onPressRightBarButton.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  onPressBackAndroid = () => {
    dismissModalPhotoGallery(this.props.componentId)
    return true
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
    }
  }

  onPressLeftBarButton() {
    dismissModalPhotoGallery(this.props.componentId)
  }

  onPressRightBarButton(selectedData) {
    const { callback } = this.props
    if (callback) callback(selectedData)
    dismissModalPhotoGallery(this.props.componentId)
  }

  render() {
    const maxSelect = _.get(this.props, 'data.maxSelect')
    const selectedData = _.get(this.props, 'data.selectedData')

    return (
      <View style={styles.container}>
        <PhotoGallery
          maxSelect={maxSelect}
          selectedData={selectedData}
          onPressLeftBarButton={this.onPressLeftBarButton}
          onPressRightBarButton={this.onPressRightBarButton}
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
