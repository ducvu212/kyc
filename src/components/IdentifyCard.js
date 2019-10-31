import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  showActionSheetOptions,
  showModalCamera,
  showModalCameraRoll
} from '../navigator'
import Images from '../constants/images'
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import i18next from 'i18next'
import CardView from 'react-native-cardview'
import AppHandler from '../modules/AppHandler'

export default class IconButtonForm extends PureComponent {

  constructor(props) {
    super(props)
    this.onPressAvatar = this.onPressAvatar.bind(this)
    this.state = {
      source: null
    }
  }

  onPressAvatar() {
    // showModalPhotoView({ images: [{ id: 1, url: me.avatar_url }] })
    const data = {
      maxSelect: 1
    }
    const callback = async (selectedData) => {
      if (selectedData && selectedData.length > 0) {
        const avatar_url = selectedData[0].assetPath
        this.setState({ source: avatar_url })
      }
    }
    showModalCameraRoll(data, callback)
  }

  render() {

    const { width, height } = this.props
    const { source } = this.state

    return (
      <View>
        <Text style={{ marginTop: 32, alignSelf: 'center', fontSize: 22 }}>{i18next.t('UploadFrontIdCard')}</Text>
        <TouchableOpacity
          onPress={this.onPressAvatar}>
          <CardView
            cardElevation={7}
            cardMaxElevation={5}
            cornerRadius={10}
            style={{ width, height, backgroundColor: Colors.gray_5, marginTop: 64, alignSelf: 'center' }}>
            {
              source &&
              <Image
                resizeMode='contain'
                style={{ width, height, }}
                source={{uri: source}}
              />
            }
          </CardView>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
