import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet, View, BackHandler, Dimensions, ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  showModalFrontId,
  dismissModal
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { Background, TopBarView, LoadingIndicator, ButtonForm } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'
import ItemProductDetails from '../components/ItemProductDetails'

const { width, height } = Dimensions.get('window')

export default class ProductDetailsScreen extends Component {
  static options(passProps) {
    return {
      statusBar: {
        backgroundColor: 'transparent',
        visible: true,
        style: 'light'
      },
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.onPressLeftBarButton = this.onPressLeftBarButton.bind(this)
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)

    this.state = {
      loading: false,
      products: []
    }
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
      this.setState({ loading: true }, () => {
        this.getData()
      })
    }
  }

  getData = () => {
    const dataPass = _.get(this.props, 'data', null)
    if (!dataPass) return
    const sections = _.get(this.props, 'user.me.SESSION', null)
    const session_code = _.last(sections).CODE
    const direct_sale_id = _.get(this.props, 'user.me._id', null)
    const token_collection = _.get(this.props, 'data.TOKEN_COLLECTION', 'null')
    const filter = { IS_ACTIVE: 1 }
    const data = {
      session_code,
      direct_sale_id,
      token_collection,
      filter
    }
    this.props.getAllProduct(data)
      .then(response => {
        const products = _.get(response, 'data.data')
        this.setState({ products, loading: false, refreshing: false })
      })
      .catch(error => {
        this.setState({ loading: false, refreshing: false })
        console.log('error', error);
      })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  componentDidDisappear() {

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  onPressBackAndroid() {
    dismissModal(this.props.componentId)
    return true
  }

  onPressLeftBarButton() {
    dismissModal(this.props.componentId)
  }


  render() {
    const { loading } = this.state
    return (
      <View style={[styles.container]}>
        <Background />
        <TopBarView
          imageLeft={Images.ic_close}
          tintColor={Colors.orange}
          title={i18next.t('ProductDetails')}
          onPressLeftBarButton={this.onPressLeftBarButton}
        />
        <SafeAreaView style={{ flex: 1 }}>

          {
            loading ?
              <LoadingIndicator
                center={true}
                size='small'
              />
              :
              this.renderBody()
          }
        </SafeAreaView>

      </View>
    )
  }


  renderBody = () => {
    const { products, loading, refreshing } = this.state
    const contentContainerStyle = !loading && !refreshing ?
      { justifyContent: 'center', alignItems: 'center' } : { paddingBottom: 24 }

    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps='handled'>

        <FlatList
          data={products}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={[styles.list, contentContainerStyle]}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />
      </ScrollView>
    )
  }

  renderItem({ item }) {
    return (
      <ItemProductDetails
        item={item}
        width={width - 48}
        height={height / 3.5}
        onPressItem={() => {
          showModalFrontId()
        }} />
    )
  }

  keyExtractor = (item, index) => (_.get(item, '_id') || index).toString()
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent
  },
})
