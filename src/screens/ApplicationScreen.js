import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native'
import {
  setRootToLoginScreen,
  setRootToHomeScreen,
  setRootToTutorialScreen,
  pushUserBasicInfoScreen,
  showModalAppDetail
} from '../navigator'
import Colors from '../constants/colors'
import { Background, TopBarView, LoadingIndicator } from '../components'
import _ from 'lodash'
import { Helper, HUD, i18next } from '../utils'
import ItemApplication from '../components/ItemApplication'

const { width, height } = Dimensions.get('window')

export default class ApplicationScreen extends Component {
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

    this.state = {
      loading: false,
      refreshing: false,
      applications: []
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
    const filter = {
      IS_ACTIVE: 1
    }
    const data = {
      session_code,
      direct_sale_id,
      filter
    }
    this.props.getAllApp(data)
      .then(response => {
        const applications = _.get(response, 'data.data')
        this.setState({ applications, loading: false, refreshing: false })
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
    const { loading } = this.state

    return (
      <View style={[styles.container]}>
        <Background />
        <TopBarView
          back
          title={i18next.t('Application')}
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
    const { applications, loading, refreshing } = this.state
    const contentContainerStyle = !loading && !refreshing ?
      { justifyContent: 'center', alignItems: 'center' } : null

    return (
      <FlatList
        data={applications}
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
      <ItemApplication
        item={item}
        width={width - 48}
        height={height / 6}
        onPressItem={() => {
          console.log('here');
          
          showModalAppDetail(item)
        }} />
    )
  }

  keyExtractor = (item, index) => (_.get(item, '_id') || index).toString()
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  list: {
    marginTop: 24,
    paddingBottom: 48
  }
})
