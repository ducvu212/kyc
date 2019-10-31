import React from 'react';
import _ from 'lodash'
import Colors from '../../constants/colors';

import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends React.Component {

  static options(passProps) {
    const statusBar = _.get(passProps, 'options.statusBar')
    return {
      statusBar: {
        backgroundColor: 'transparent',
        visible: true,
        ...statusBar
      },
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.overlayBg} opacity={0.5} />
        <View style={styles.viewIndicator}>
          <ActivityIndicator style={styles.activityIndicator} size="large" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlayBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.black,
  },
  viewIndicator: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 100,
    width: 100,
    justifyContent: 'center',
    borderRadius: 8
  },
  activityIndicator: {
    // marginTop: 100
  },

});