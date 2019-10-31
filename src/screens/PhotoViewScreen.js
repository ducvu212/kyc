import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { dismissModalPhotoView } from '../navigator'
import { PhotoView } from '../components'
import _ from 'lodash'
import Colors from '../constants/colors'
import Images from '../constants/images'
import Device from '../modules/Device'

const { width, height } = Dimensions.get('window')

export default class PhotoViewScreen extends Component {
  static options(passProps) {
    const statusBar = _.get(passProps, 'options.statusBar')
    return {
      statusBar: {
        ...statusBar
      },
    };
  }

  static defaultProps = {
    data: {
      images: []
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.onPressClose = this.onPressClose.bind(this)
    this.onToggleUtility = this.onToggleUtility.bind(this)

    this.state = {
      showUtility: true,
    }
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
    }
  }

  onToggleUtility() {
    // const showUtility = this.state.showUtility
    // this.setState({
    //   showUtility: !showUtility
    // })
  }

  onPressClose() {
    dismissModalPhotoView(this.props.componentId)
  }

  renderHeader() {
    const { showUtility } = this.state
    const headerHeight = Device.statusBarSize().height + Device.topBarSize().height

    return (showUtility &&
      <View style={[styles.headerContainer, { height: headerHeight }]}>
        <TouchableOpacity onPress={this.onPressClose} style={styles.close}>
          <View>
            <Image
              source={Images.close_white}
              style={{
                width: 18,
                height: 18,
              }}
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let dataSource = this.props.data

    return (
      <View style={styles.container}>
        {
          this.renderHeader()
        }
        <PhotoView
          data={dataSource}
          onToggleUtility={this.onToggleUtility}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})
