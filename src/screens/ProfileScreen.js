import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import CommonStyles from '../constants/styles';
import Colors from '../constants/colors';
import { i18next, HUD, Helper } from '../utils';
import {
  back,
  showActionSheetOptions
} from '../navigator';
import {
  TopBarView,
  Background,
  LoadingIndicator,
  ItemImageRow,
  ItemDocuments
} from '../components';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  SectionList
} from 'react-native';
// import DismissKeyboard from 'dismissKeyboard';
import ViewMemberProfile from '../components/ViewMemberProfile';
import Images from '../constants/images';

export default class ProfileScreen extends React.Component {

  static options(passProps) {
    HUD.mergeOptions({ statusBar: { style: 'dark' } })
    return {
      statusBar: {
        style: 'dark'
      },
    }
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.onPressBackAndroid = this.onPressBackAndroid.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    // this.renderSectionFooter = this.renderSectionFooter.bind(this)
    // this.renderSectionHeader = this.renderSectionHeader.bind(this)

    this.state = {
      user: {

      },
      refreshing: false,
      isEditable: false,
      loading: true,
      enableKeyboardAvoiding: false,
    }
    this.bottomTabEventListener = null
  }

  componentDidAppear() {
    if (!this.didAppearFirst) {
      this.didAppearFirst = true
      this.doHandleChangeBottomTabs()
    }
    this.setState({ enableKeyboardAvoiding: true })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)) {
      return false
    }
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  componentDidDisappear() {
    this.setState({ enableKeyboardAvoiding: false })
  }

  componentWillUnmount() {
    this.bottomTabEventListener && this.bottomTabEventListener.remove()
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBackAndroid)
  }

  doHandleChangeBottomTabs = () => {
    this.bottomTabEventListener = Navigation.events()
      .registerBottomTabSelectedListener(() => {
        back(this.props.componentId)
      });
  }

  onPressBackAndroid(){
    this.back()
    return true
  }

  back = () => {
    const { isEditable } = this.state
    if (isEditable) {
      this.setState({ isEditable: false })
      return
    }
    back(this.props.componentId)
  }

  onRefresh() {
    if (this.state.refreshing) return
    this.setState({ refreshing: true }, () => {
      // this.doGetMemberInfo()
    })
  }

  render() {
    const {
      isEditable,
      loading,
    } = this.state

    return (
      <View style={styles.container}>
        <Background />
        <TopBarView
          back
          title={i18next.t('Profile')}
          showBottomBorder={true}
        />
        {
          // !loading ?
            this.renderBody() 
            // <LoadingIndicator
            //   center={true}
            //   size='small'
            // />
        }
      </View>
    );
  }

  renderBody() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <SectionList
          sections={[
            // { title: i18next.t('Image'), data: _.chunk(imageList, 3), renderItem: this.renderItemImage },
            // { title: i18next.t('Documents'), data: docList, renderItem: this.renderItemDocuments }
          ]}
          keyExtractor={this.keyExtractor}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ListHeaderComponent={this.renderHeader}
          // refreshing={this.state.refreshing}
          // onRefresh={this.onRefresh}
        // renderSectionHeader={this.renderSectionHeader}
        // renderSectionFooter={this.renderSectionFooter}
        />
      </SafeAreaView>
    )
  }

  renderHeader() {

    const {
      user,
    } = this.props

    return (
      <ViewMemberProfile
        user={user}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  rightTitleStyle: {
    color: Colors.orange,
    ...CommonStyles.textJp14,
    alignSelf: 'flex-start',
    marginRight: 12
  },
  leftTitleStyle: {
    ...CommonStyles.textJp14,
    color: Colors.orange,
    marginLeft: 8,
  }
})
