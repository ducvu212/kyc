#!/bin/sh
cd ../../ && RNC_ROOT=./node_modules/react-native-config/ && export SYMROOT=$RNC_ROOT/ios/ReactNativeConfig && export BUILD_DIR=$RNC_ROOT/ios/ReactNativeConfig && ruby $RNC_ROOT/ios/ReactNativeConfig/BuildDotenvConfig.ruby
