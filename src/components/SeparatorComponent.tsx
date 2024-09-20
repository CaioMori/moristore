import React from 'react';
import {StyleSheet, View} from 'react-native';

const style = StyleSheet.create({
  componentStyle: {
    height: 16,
  },
});

const SeparatorComponent = () => {
  return <View style={style.componentStyle} />;
};

export default SeparatorComponent;
