import React, { Component } from 'react'
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Images from './images/images'

const { width, height } = Dimensions.get('window')

export default class ImageViewer extends Component {
  static defaultProps = {
    cropWidth: width, // Parent view's width
    cropHeight: height, // Parent view's height
    imageWidth: 100,
    pinchToZoom: true,
    enableDoubleClickZoom: true,
    clickDistance: 10,
    maxOverflow: 100, // Max distance horizontal panning trigger scroll list
    doubleClickInterval: 200,
    minScale: 1,
    maxScale: 3,
  }

  constructor(props) {
    super(props)
    this.onImageLoad = this.onImageLoad.bind(this)
    this.onImageLoadEnd = this.onImageLoadEnd.bind(this)
    this.onImageLoadError = this.onImageLoadError.bind(this)

    this.state = {
      loading: true,
      error: false,
    }
    // actual image height scale on screen
    this.actualHeight = 0
  }

  panToMove = false

  lastPositionX = null
  positionX = 0
  animatedPositionX = new Animated.Value(0)

  lastPositionY = null
  positionY = 0
  animatedPositionY = new Animated.Value(0)

  scale = 1
  animatedScale = new Animated.Value(1)
  zoomLastDistance = null
  zoomCurrentDistance = 0

  imagePanResponder = null

  lastTouchStartTime = 0

  horizontalWholeOuterCounter = 0

  horizontalWholeCounter = 0
  verticalWholeCounter = 0

  centerDiffX = 0
  centerDiffY = 0

  singleClickTimeout

  lastClickTime = 0

  doubleClickX = 0
  doubleClickY = 0

  isDoubleClick = false

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.loading !== this.state.loading ||
      nextState.error !== this.state.error ||
      nextState.enablePan !== this.state.enablePan
    ) {
      return true
    }
    return false
  }

  componentWillMount() {
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: evt => {
        this.lastPositionX = null
        this.lastPositionY = null
        this.zoomLastDistance = null
        this.horizontalWholeCounter = 0
        this.verticalWholeCounter = 0
        this.lastTouchStartTime = new Date().getTime()
        this.isDoubleClick = false

        if (this.singleClickTimeout) {
          clearTimeout(this.singleClickTimeout)
        }

        if (evt.nativeEvent.changedTouches.length > 1) {
          const centerX = (evt.nativeEvent.changedTouches[0].pageX + evt.nativeEvent.changedTouches[1].pageX) / 2
          this.centerDiffX = centerX - this.props.cropWidth / 2

          const centerY = (evt.nativeEvent.changedTouches[0].pageY + evt.nativeEvent.changedTouches[1].pageY) / 2
          this.centerDiffY = centerY - this.props.cropHeight / 2
        }

        if (evt.nativeEvent.changedTouches.length <= 1) {
          if (new Date().getTime() - this.lastClickTime < (this.props.doubleClickInterval || 0)) {
            this.lastClickTime = 0
            this.doubleClickX = evt.nativeEvent.changedTouches[0].pageX
            this.doubleClickY = evt.nativeEvent.changedTouches[0].pageY

            this.isDoubleClick = true

            if (this.props.enableDoubleClickZoom) {
              if (this.scale > 1 || this.scale < 1) {
                this.panToMove = false
                this.scale = 1
                this.positionX = 0
                this.positionY = 0
                if (this.props.handleScroll) {
                  this.props.handleScroll(true)
                }
              } else {
                this.panToMove = true
                const beforeScale = this.scale
                this.scale = 2
                const diffScale = this.scale - beforeScale
                this.positionX = ((this.props.cropWidth / 2 - this.doubleClickX) * diffScale) / this.scale
                this.positionY = 0
                if (this.props.handleScroll) {
                  this.props.handleScroll(false)
                }
              }

              this.animate()
            }
          } else {
            this.lastClickTime = new Date().getTime()
          }
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (this.isDoubleClick) {
          return
        }

        if (evt.nativeEvent.changedTouches.length <= 1) {
          let diffX = gestureState.dx - (this.lastPositionX || 0)
          if (this.lastPositionX === null) {
            diffX = 0
          }

          let diffY = gestureState.dy - (this.lastPositionY || 0)
          if (this.lastPositionY === null) {
            diffY = 0
          }

          this.lastPositionX = gestureState.dx
          this.lastPositionY = gestureState.dy

          this.horizontalWholeCounter += diffX
          this.verticalWholeCounter += diffY

          if (this.panToMove) {
            if (this.props.imageWidth * this.scale > this.props.cropWidth) {
              if (this.horizontalWholeOuterCounter > 0) {
                if (diffX < 0) {
                  if (this.horizontalWholeOuterCounter > Math.abs(diffX)) {
                    this.horizontalWholeOuterCounter += diffX
                    diffX = 0
                  } else {
                    diffX += this.horizontalWholeOuterCounter
                    this.horizontalWholeOuterCounter = 0
                  }
                } else {
                  this.horizontalWholeOuterCounter += diffX
                }
              } else if (this.horizontalWholeOuterCounter < 0) {
                if (diffX > 0) {
                  if (Math.abs(this.horizontalWholeOuterCounter) > diffX) {
                    this.horizontalWholeOuterCounter += diffX
                    diffX = 0
                  } else {
                    diffX += this.horizontalWholeOuterCounter
                    this.horizontalWholeOuterCounter = 0
                  }
                } else {
                  this.horizontalWholeOuterCounter += diffX
                }
              } else {
              }

              this.positionX += diffX / this.scale

              const horizontalMax = (this.props.imageWidth * this.scale - this.props.cropWidth) / 2 / this.scale
              if (this.positionX < -horizontalMax) {
                this.horizontalWholeOuterCounter += -1 / 1e10
              } else if (this.positionX > horizontalMax) {
                this.horizontalWholeOuterCounter += 1 / 1e10
              }
              this.animatedPositionX.setValue(this.positionX)
            } else {
              this.horizontalWholeOuterCounter += diffX
            }

            if (this.horizontalWholeOuterCounter > (this.props.maxOverflow || 0)) {
              this.horizontalWholeOuterCounter = this.props.maxOverflow || 0
            } else if (this.horizontalWholeOuterCounter < -(this.props.maxOverflow || 0)) {
              this.horizontalWholeOuterCounter = -(this.props.maxOverflow || 0)
            }

            if (this.horizontalWholeOuterCounter !== 0) {
              if (this.props.scrollToIndex) {
                if (this.horizontalWholeOuterCounter >= this.props.maxOverflow && this.props.index !== 0) {
                  this.scale = 1
                  this.positionX = 0
                  this.positionY = 0
                  this.animatedScale.setValue(1)
                  this.props.handleScroll(true)
                  this.props.scrollToIndex && this.props.scrollToIndex(this.props.index, 'left')
                } else if (this.horizontalWholeOuterCounter <= -this.props.maxOverflow && this.props.index !== this.props.dataLength - 1) {
                  this.scale = 1
                  this.positionX = 0
                  this.positionY = 0
                  this.animatedScale.setValue(1)
                  this.props.handleScroll(true)
                  this.props.scrollToIndex && this.props.scrollToIndex(this.props.index, 'right')
                }
                return
              }
            }

            if (this.actualHeight * this.scale > this.props.cropHeight) {
              this.positionY += diffY / this.scale
              this.animatedPositionY.setValue(this.positionY)
            } else {
              this.positionY += diffY / this.scale
              this.animatedPositionY.setValue(this.positionY)

              // this.scale = this.scale - diffY / 1000
              // this.animatedScale.setValue(this.scale)
            }
          }
        } else {
          if (this.props.pinchToZoom) {
            this.panToMove = true
            if (this.props.handleScroll && this.scale > 1) {
              this.props.handleScroll(false)
            }
            let minX
            let maxX
            if (evt.nativeEvent.changedTouches[0].locationX > evt.nativeEvent.changedTouches[1].locationX) {
              minX = evt.nativeEvent.changedTouches[1].pageX
              maxX = evt.nativeEvent.changedTouches[0].pageX
            } else {
              minX = evt.nativeEvent.changedTouches[0].pageX
              maxX = evt.nativeEvent.changedTouches[1].pageX
            }

            let minY
            let maxY
            if (evt.nativeEvent.changedTouches[0].locationY > evt.nativeEvent.changedTouches[1].locationY) {
              minY = evt.nativeEvent.changedTouches[1].pageY
              maxY = evt.nativeEvent.changedTouches[0].pageY
            } else {
              minY = evt.nativeEvent.changedTouches[0].pageY
              maxY = evt.nativeEvent.changedTouches[1].pageY
            }

            const widthDistance = maxX - minX
            const heightDistance = maxY - minY
            const diagonalDistance = Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance)
            this.zoomCurrentDistance = Number(diagonalDistance.toFixed(1))

            if (this.zoomLastDistance !== null) {
              const distanceDiff = (this.zoomCurrentDistance - this.zoomLastDistance) / 200
              let zoom = this.scale + distanceDiff

              if (zoom < (this.props.minScale || 0)) {
                zoom = this.props.minScale || 0
              }
              if (zoom > (this.props.maxScale || 0)) {
                zoom = this.props.maxScale || 0
              }

              const beforeScale = this.scale
              this.scale = zoom
              const diffScale = this.scale - beforeScale
              this.positionX -= (this.centerDiffX * diffScale) / this.scale
              this.positionY -= (this.centerDiffY * diffScale) / this.scale

              this.animatedScale.setValue(this.scale)
              this.animatedPositionX.setValue(this.positionX)
              this.animatedPositionY.setValue(this.positionY)
            }
            this.zoomLastDistance = this.zoomCurrentDistance
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.isDoubleClick) {
          return
        }

        const moveDistance = Math.sqrt(gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy)

        if (evt.nativeEvent.changedTouches.length === 1 && moveDistance < (this.props.clickDistance || 0)) {
          this.singleClickTimeout = setTimeout(() => {
          }, this.props.doubleClickInterval)
        } else {
          if (this.props.responderRelease) {
            this.props.responderRelease(gestureState.vx, this.scale)
          }

          this.panResponderReleaseResolve()
        }
      },
      onPanResponderTerminate: () => {}
    })
  }

  panResponderReleaseResolve = () => {
    if (this.props.imageWidth * this.scale <= this.props.cropWidth) {
      this.positionX = 0
    }

    if (this.actualHeight * this.scale <= this.props.cropHeight) {
      this.positionY = 0
    }

    if (this.actualHeight * this.scale > this.props.cropHeight) {
      const verticalMax = (this.actualHeight * this.scale - this.props.cropHeight) / 2 / this.scale
      if (this.positionY < -verticalMax) {
        this.positionY = -verticalMax
      } else if (this.positionY > verticalMax) {
        this.positionY = verticalMax
      }
    }

    if (this.props.imageWidth * this.scale > this.props.cropWidth) {
      const horizontalMax = (this.props.imageWidth * this.scale - this.props.cropWidth) / 2 / this.scale
      if (this.positionX < -horizontalMax) {
        this.positionX = -horizontalMax
      } else if (this.positionX > horizontalMax) {
        this.positionX = horizontalMax
      }
    }

    if (this.scale <= 1) {
      this.props.handleScroll(true)
    }
    this.animate()
    this.horizontalWholeOuterCounter = 0
  }

  animate(callback) {
    Animated.parallel([
      Animated.timing(this.animatedScale, {
        toValue: this.scale,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedPositionX, {
        toValue: this.positionX,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedPositionY, {
        toValue: this.positionY,
        duration: 100,
        useNativeDriver: true
      })
    ], {
      useNativeDriver: true
    }).start(() => {
      if (callback) {
        callback()
      }
    })
  }

  onImageLoad(event) {
    this.actualHeight = width * (event.nativeEvent.height / event.nativeEvent.width)
  }

  onImageLoadEnd() {
    this.setState({
      loading: false
    })
  }

  onImageLoadError() {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const { loading, error } = this.state
    const parentStyles = StyleSheet.flatten(this.props.style)
    const panResponders = !error ? this.imagePanResponder.panHandlers : null

    return (
      <View
        style={[
          styles.container,
          parentStyles,
          {
            width: this.props.cropWidth,
            height: this.props.cropHeight,
          }
        ]}
        { ...panResponders }
      >
        {
          loading && <ActivityIndicator style={styles.activityIndicator} size='small' />
        }
        {
          this.renderBody()
        }
      </View>
    )
  }

  renderBody() {
    const { source } = this.props
    const { error } = this.state
    const animateConf = {
      transform: [
        {
          scale: this.animatedScale
        },
        {
          translateX: this.animatedPositionX
        },
        {
          translateY: this.animatedPositionY
        }
      ]
    }
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)

    return error ?
      (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              loading: true,
              error: false,
            })
          }}
          style={styles.reloadContainer}
        >
          <FastImage source={Images.reload} style={styles.reloadIcon} />
        </TouchableOpacity>
      )
      :
      (
        <Animated.View
          style={animateConf}
          renderToHardwareTextureAndroid
        >
          <View
            style={{
              width: this.props.imageWidth,
              height: '100%',
            }}
          >
            <AnimatedFastImage
              style={{ width, flex: 1 }}
              resizeMode={FastImage.resizeMode.contain}
              source={source}
              onLoad={this.onImageLoad}
              onLoadEnd={this.onImageLoadEnd}
              onError={this.onImageLoadError}
            />
          </View>
        </Animated.View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  activityIndicator: {
    position: 'absolute',
  },
  reloadContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  reloadIcon: {
    width: 25,
    height: 25,
  },
})
