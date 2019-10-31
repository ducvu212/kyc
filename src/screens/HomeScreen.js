import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { StyleSheet, View, FlatList, Dimensions, Text, SafeAreaView } from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  setRootToTutorialScreen,
  pushUserBasicInfoScreen,
  showModalProductDetails
} from '../navigator'
import Images from '../constants/images'
import CommonStyles from '../constants/styles'
import Colors from '../constants/colors'
import { Background, TopBarView, LoadingIndicator, ItemProduct } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'

const { width, height } = Dimensions.get('window')

export default class HomeScreen extends Component {
  static options(passProps) {
    return {
      statusBar: {
        backgroundColor: 'transparent',
        visible: true,
        style: 'dark'
      },
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.onRefresh = this.onRefresh.bind(this)
    // this.onPressItem = this.onPressItem.bind(this)

    this.state = {
      loading: false,
      refreshing: false,
      products: []
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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
    const sections = _.get(this.props, 'user.me.SESSION', null)
    const session_code = _.last(sections).CODE
    const direct_sale_id = _.get(this.props, 'user.me._id', null)
    const token_collection = _.get(this.props, 'user.me.token_collection', 'null')
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

  onRefresh() {
    const { refreshing } = this.state
    if (refreshing) return
    this.setState({
      refreshing: true,
      loading: true
    }, () => {
      this.getData()
    })
  }

  render() {
    const { loading, products } = this.state
    return (
      <View style={[styles.container]}>
        <Background />
        <TopBarView
          back
          title={i18next.t('Home')}
          showBottomBorder={true}
        />
        {
          loading ?
            <LoadingIndicator
              center={true}
              size='small'
            />
            :
            this.renderBody()
        }

      </View>
    )
  }

  renderBody = () => {
    const { products, loading, refreshing } = this.state
    const contentContainerStyle = !loading && !refreshing ?
      { justifyContent: 'center', alignItems: 'center' } : null

    return (
      <FlatList
        data={products}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        contentContainerStyle={[styles.list, contentContainerStyle]}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
      />
    )
  }

  renderItem({ item }) {

    return (
      <ItemProduct
        item={item}
        width={width - 48}
        height={height / 3}
        onPressItem={() => {
          showModalProductDetails(item)
        }} />
    )
  }

  keyExtractor = (item, index) => (_.get(item, '_id') || index).toString()

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flex: 1,
  },
  list: {
    marginTop: 24,
    paddingBottom: 48
  }
})
