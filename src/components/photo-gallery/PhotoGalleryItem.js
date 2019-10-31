import React, { Component } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native'
import Images from '../../constants/images'
import Colors from '../../constants/colors'
import _ from 'lodash'

const { width, height } = Dimensions.get('window')

export default class PhotoGalleryItem extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((!this.props.data && nextProps.data) || (this.props.selected !== nextProps.selected)) return true
    return false
  }

  onPress() {
    const { data } = this.props
    if (this.props.onPress) {
      this.props.onPress(data)
    }
  }

  render() {
    const imgSource = _.get(this.props, 'data.node.image.uri')
    const selected = _.get(this.props, 'selected')

    if (!imgSource) return null

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onPress}
      >
        <Image
          style={styles.imageThumbnail}
          source={{uri: imgSource}}
        />
        {
          selected && (
            <View
              style={styles.selectedContainer}
            >
              <Image
                source={Images.selected}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          )
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 1,
    borderRadius: 4,
    overflow: 'hidden',
    width: (width - 4) / 3,
    height: (width - 4) / 3,
  },
  imageThumbnail: {
    width: (width - 4) / 3,
    height: (width - 4) / 3,
  },
  selectedContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    position: 'absolute',
    right: 10,
    top: 10,
  }
})
