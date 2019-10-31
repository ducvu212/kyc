import React, { Component } from 'react'
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import _ from 'lodash'
import CameraRoll from '@react-native-community/cameraroll'
import Device from '../../modules/Device'
import Colors from '../../constants/colors'
import { i18next, Helper } from '../../utils'
import CustomTopBar from './CustomTopBar'
import PhotoGalleryItem from './PhotoGalleryItem'
import Camera from './camera-view/Camera'
import Utils from './Utils'
import CommonStyles from '../../constants/styles'
import Fonts from '../../constants/fonts'

const { width, height } = Dimensions.get('window')

const ASSET_TYPE = {
  ALL: 'All',
  PHOTOS: 'Photos',
  VIDEOS: 'Videos',
}

const FETCH_DATA_PER_BATCH = 20

export default class PhotoGallery extends Component {
  static defaultProps = {
    maxSelect: null,
    selectedData: [],
  }

  constructor(props) {
    super(props)
    this.checkPermissions = this.checkPermissions.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.fetchDataMore = this.fetchDataMore.bind(this)
    this.onPressItem = this.onPressItem.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressRightBarButton = this.onPressRightBarButton.bind(this)
    this.onPressTitle = this.onPressTitle.bind(this)
    this.onPressCloseCamera = this.onPressCloseCamera.bind(this)
    this.renderCamera = this.renderCamera.bind(this)
    this.onPressSaveNewPhoto = this.onPressSaveNewPhoto.bind(this)
    this.onPressSelectFromCamera = this.onPressSelectFromCamera.bind(this)

    this.state = {
      dataSource: [],
      selectedData: [],
      pageInfo: null,
      hasSelected: false,
      assetType: ASSET_TYPE.PHOTOS,
      loading: true,
      permissionNotGranted: true,
      showCamera: false,
    }

    this.animatedMarginTop = new Animated.Value(height)
  }

  async componentDidMount() {
    this.checkPermissions()
  }

  checkPermissions() {
    Utils.checkPhotoPermission().then(granted => {
      if (granted) {
        this.setState({
          permissionNotGranted: false
        }, () => {
          const selectedData = _.get(this.props, 'selectedData') || []
          const hasSelected = _.findIndex(selectedData, item => item.isStored) !== -1
          this.setState({
            hasSelected,
          }, () => {
            this.fetchData()
          })
        })
      } else {
        this.setState({
          loading: false,
          permissionNotGranted: true,
        })
      }
    }).catch(error => {
      this.setState({
        loading: false,
      })
    })
  }

  getPhotos = (config) => {
    const { assetType } = this.state

    const defaultConfig = {
      assetType,
      // mimeTypes:['image/png)'],
      ...config
    }

    return Utils.getMedia(FETCH_DATA_PER_BATCH, defaultConfig)
  }

  fetchData() {
    const selectedData = _.get(this.props, 'selectedData')
    let selectedDataState = []
    this.setState({
      loading: true
    })
    this.getPhotos().then(response => {
      let dataSource = _.get(response, 'edges')
      const pageInfo = _.get(response, 'page_info')
      if (dataSource) {
        dataSource = _.map(dataSource, item => {
          if (selectedData.length > 0) {
            const index = _.findIndex(selectedData, (i) => _.get(item, 'node.image.uri') === _.get(i, 'uri'))
            if (index !== -1) {
              selectedDataState.push(item)
              item.selected = true
              return item
            }
          }
          item.selected = false
          return item
        })
      }
      this.setState({
        dataSource,
        selectedData: selectedDataState,
        // hasSelected: selectedDataState.length > 0,
        pageInfo,
        loading: false
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  fetchDataMore() {
    const selectedData = _.get(this.props, 'selectedData')
    const endCursor = _.get(this.state, 'pageInfo.end_cursor')
    const hasNext = _.get(this.state, 'pageInfo.has_next_page')
    const { loading } = this.state

    let selectedDataState = [...this.state.selectedData]

    if (!loading && hasNext) {
      this.setState({
        loading: true
      })
      this.getPhotos({ after: endCursor }).then(response => {
        let dataSource = _.get(response, 'edges')
        const pageInfo = _.get(response, 'page_info')
        if (dataSource) {
          dataSource = _.map(dataSource, item => {
            if (selectedData.length > 0) {
              const index = _.findIndex(selectedData, (i) => _.get(item, 'node.image.uri') === _.get(i, 'uri'))
              if (index !== -1) {
                selectedDataState.push(item)
                item.selected = true
                return item
              }
            }
            item.selected = false
            return item
          })
        }
        this.setState({
          dataSource: [
            ...this.state.dataSource,
            ...dataSource
          ],
          selectedData: selectedDataState,
          pageInfo,
          loading: false
        })
      }).catch(error => {
        this.setState({
          loading: false
        })
      })
    }
  }

  onPressItem(item) {
    const itemSelected = !item.selected
    const { maxSelect } = this.props
    let selectedData = [...this.state.selectedData]
    let dataSource = [...this.state.dataSource]
    let hasSelected = true

    if (maxSelect !== 1 && itemSelected && selectedData.length === maxSelect) return

    if (itemSelected) {
      selectedData = maxSelect === 1 ? [item] : _.concat(selectedData, item)
    } else {
      if (selectedData.length <= 1) hasSelected = false
      _.remove(selectedData, i => _.isEqual(item.node, i.node))
    }

    dataSource = _.map(dataSource, i => {
      const equal = _.isEqual(item.node, i.node)
      if (equal) i.selected = itemSelected
      if (!equal && maxSelect === 1) i.selected = false
      return i
    })

    this.setState({
      dataSource: [
        ...dataSource
      ],
      selectedData: [
        ...selectedData
      ],
      hasSelected
    })
  }

  onPressTitle() {
    const value = this.animatedMarginTop._value === height ?
      Device.topBarSize().height + Device.statusBarSize().height : height
    Animated.timing(this.animatedMarginTop, {
      toValue: value,
      duration: 200
    }).start()
  }

  onPressLeftBarButton() {
    if (this.props.onPressLeftBarButton) {
      this.props.onPressLeftBarButton()
    }
  }

  onPressRightBarButton() {
    let selectedData = [...this.state.selectedData]
    if (this.props.onPressRightBarButton && selectedData.length > 0) {
      const results = selectedData.map(item => {
        let result = _.get(item, 'node.image')
        let assetPath = this.convertUriToPath(item.node.image.uri)
        return {
          ...result,
          assetPath,
          isStored: true,
        }
      })
      this.props.onPressRightBarButton(results)
      return
    }

    this.setState({
      showCamera: true
    }, () => {
      Animated.timing(this.animatedMarginTop, {
        toValue: 0,
        duration: 200,
      }).start()
    })
  }

  onPressCloseCamera() {
    Animated.timing(this.animatedMarginTop, {
      toValue: height + Device.topBarSize().height,
      duration: 200,
    }).start(() => {
      this.setState({
        showCamera: false
      })
    })
  }

  onPressSaveNewPhoto(newPhoto) {
    const photo = {
      ...newPhoto,
      selected: false
    }
    const dataSource = [...this.state.dataSource]
    this.setState({
      dataSource: [
        photo,
        ...dataSource
      ]
    })
  }

  onPressSelectFromCamera(newPhoto) {
    const photos = [{
      ...newPhoto,
      assetPath: newPhoto.uri
    }]
    this.props.onPressRightBarButton(photos)
  }

  onEndReached() {
    this.fetchDataMore()
  }

  convertUriToPath = (uri) => {
    let assetPath = uri
    if (Platform.OS === 'ios') {

      const photoId = uri.substring(5, 41)
      const ext = 'png'
      assetPath = `assets-library://asset/asset.${ext}?id=${photoId}&ext=${ext}`
    }

    return assetPath
  }

  keyExtractor = (item, index) => _.get(item, 'node.timestamp').toString()

  renderItem = ({ item, index }) => {
    return (
      <PhotoGalleryItem
        data={item}
        selected={item.selected}
        onPress={this.onPressItem}
      />
    )
  }

  renderCamera() {
    return (
      <Animated.View
        style={{
          height: '100%',
          position: 'absolute',
          top: this.animatedMarginTop,
        }}
      >
        <Camera
          onPressCloseCamera={this.onPressCloseCamera}
          onPressSaveNewPhoto={this.onPressSaveNewPhoto}
          onPressSelectFromCamera={this.onPressSelectFromCamera}
        />
      </Animated.View>
    )
  }

  renderNotAuthorizedView() {
    return (
      <View style={styles.notAuthorizedContainer}>
        <Text style={styles.notAuthorizedText}>
          { i18next.t('AccessToThePhotosGalleryHasBeenProhibited') }
        </Text>
        {
          Platform.OS === 'ios' && (
            <TouchableOpacity
              style={styles.allowAccessButton}
              onPress={() => Helper.handleOpenLink('app-settings:')}
            >
              <Text style={styles.allowAccessButtonText}>{i18next.t('AllowAccess')}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }

  render() {
    const { hasSelected, dataSource, showCamera, permissionNotGranted, loading } = this.state

    return (
      <View style={styles.container}>
        <CustomTopBar
          title={i18next.t('CameraRoll')}
          back
          onPressLeftBarButton={this.onPressLeftBarButton}
          onPressRightBarButton={this.onPressRightBarButton}
          hasSelected={hasSelected}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ marginTop: 2, flexGrow: 1 }}>
            {
              !permissionNotGranted ?
                (
                  <FlatList
                    data={dataSource}
                    renderItem={this.renderItem}
                    numColumns={3}
                    keyExtractor={this.keyExtractor}
                    onEndreachedThreshold={0.5}
                    onEndReached={this.onEndReached}
                  />
                )
                :
                (
                  !loading && this.renderNotAuthorizedView()
                )
            }
          </View>
        </SafeAreaView>
        {
          showCamera && this.renderCamera()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  notAuthorizedContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    marginHorizontal: 24,
    paddingTop: 24,
  },
  notAuthorizedText: {
    color: Colors.gray_1,
    textAlign: 'center',
    ...CommonStyles.textJp16,
    ...Platform.select({
      android: {
        lineHeight: 32,
      },
    }),
    fontFamily: Fonts.hiraKakuProW3,
  },
  allowAccessButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    width: 125,
    alignItems: 'center',
    backgroundColor: Colors.blue_3,
  },
  allowAccessButtonText: {
    ...CommonStyles.textJp14,
    fontFamily: Fonts.hiraKakuProW3,
    color: Colors.white,
  },
})
