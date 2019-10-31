import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  Text,
} from 'react-native'
import _ from 'lodash'
import PhotoSlideShowItem from './PhotoSlideShowItem'
import Colors from '../../constants/colors'
import Images from '../../constants/images'
import i18next from 'i18next';
import Fonts from '../../constants/fonts';
import CommonStyles from '../../constants/styles'

const { width, height } = Dimensions.get('window')

export default class PhotoSlideShow extends Component {
  static defaultProps = {
    data: {
      images: []
    },
    rightIcon: Images.close_1,
    onPressRightIcon: null,
  }

  constructor(props) {
    super(props)
    this.onPressRightIcon = this.onPressRightIcon.bind(this)

    this.state = {
      visibleItem: null,
    }

    this.scrollX = new Animated.Value(0)
    this.flatList = null
  }

  onPressRightIcon() {
    this.props.onPressRightIcon && this.props.onPressRightIcon(this.state.visibleItem)
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length === 1) this.setState({ visibleItem: viewableItems[0].item })
  }

  renderItem = ({ item, index }) => {
    return (
      <PhotoSlideShowItem
        data={item}
      />
    )
  }

  keyExtractor = (item, index) => (_.get(item, 'url') || _.get(item, 'uri') || index).toString()

  renderRightIcon() {
    const { rightIcon, onPressRightIcon } = this.props

    if (!onPressRightIcon) return
    return (
      <TouchableOpacity
        style={styles.rightIconContainer}
        onPress={this.onPressRightIcon}
      >
        <Image
          source={rightIcon}
          style={{
            width: 24,
            height: 24,
          }}
          resizeMode='contain'
        />
      </TouchableOpacity>
    )
  }

  renderDotIndicator() {
    const images = _.get(this.props, 'data.images') || []
    if (images.length <= 1) return

    let position = Animated.divide(this.scrollX, width)

    return (
      <View
        style={styles.indicatorContainer}
      >
        {images.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={i}
              style={[styles.dotIndicator, { opacity }]}
            />
          )
        })}
      </View>
    )
  }

  render() {
    const images = _.get(this.props, 'data.images')

    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => this.flatList = ref}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderItem}
          data={images}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
          )}
          onContentSizeChange={(contentWidth, contentHeight) => {
            if (Platform.OS === 'android' && this.scrollX._value >= contentWidth) {
              this.flatList.scrollToOffset({
                offset: contentWidth - 1,
                animated: true
              })
            }
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
        {this.renderDotIndicator()}
        {this.renderRightIcon()}
      </View>
    )
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          style={styles.noImage}
          resizeMode='contain'
          source={Images.ic_no_img_available} />
        <Text style={styles.textNoImage}>{i18next.t('NoImageAvailable')}</Text>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    width,
    height: 254,
    backgroundColor: Colors.gray_9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotIndicator: {
    height: 8,
    width: 8,
    backgroundColor: Colors.white,
    margin: 6,
    borderRadius: 4,
  },
  rightIconContainer: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImage: {
    width: 96,
    height: 96
  },
  textNoImage: {
    ...CommonStyles.textJp18,
    fontFamily: Fonts.hiraKakuProW6,
    color: Colors.orange,
    marginTop: 24
  }
})
