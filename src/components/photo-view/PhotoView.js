import React, {Component} from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import _ from 'lodash'
import ImageViewer from './ImageViewer'

const { width, height } = Dimensions.get('window')

export default class PhotoView extends Component {
  static defaultProps = {
    data: {
      images: [],
    },
    loading: false,
    onToggleUtility: null,
  }

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.renderListEmptyComponent = this.renderListEmptyComponent.bind(this)

    this.state = {
      scrollable: true,
    }
  }

  handleScroll(status) {
    if (this.state.scrollable !== status) {
      this.setState({
        scrollable: status,
      }, () => {
        this.props.onToggleUtility && this.props.onToggleUtility()
      })
    }
  }

  scrollToIndex = (currentIndex, swipeDirection) => {
    const images = _.get(this.props, 'data.images')
    if (!images) return
    let index = null
    if (swipeDirection === 'left' && currentIndex > 0 && currentIndex < images.length) {
      index = currentIndex - 1
    } else if (swipeDirection === 'right' && currentIndex >= 0 && currentIndex < images.length - 1) {
      index = currentIndex + 1
    }
    if (!index) return
    this.setState({
      scrollable: true,
    }, () => {
      this.photoViewList.scrollToIndex({
        index,
        animated: true
      })
    })
  }

  keyExtractor = (item) => item.id.toString()

  renderItem = ({item, index}) => {
    const { images } = this.props.data
    return (
      <View style={{
          width: index !== images.length - 1 ? width + 20 : width,
          height: 'auto'
        }}
      >
        <ImageViewer
          imageWidth={width}
          source={{uri: item.url}}
          handleScroll={this.handleScroll}
          scrollToIndex={this.scrollToIndex}
          index={index}
          dataLength={images.length}
        />
      </View>
    )
  }

  renderListEmptyComponent() {
    const { data, loading } = this.props
    let view = null
    if (data.images.length === 0 && loading) {
      view = (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='small' color='white' />
        </View>
      )
    }
    return view
  }

  render() {
    const images = _.get(this.props, 'data.images') || []

    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={this.state.scrollable}
          horizontalScroll={this.state.scrollable}
          ref={ref => this.photoViewList = ref}
          scrollEventThrottle={1}
          renderItem={this.renderItem}
          data={images}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderListEmptyComponent}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          snapToInterval={width + 20}
          decelerationRate='fast'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
