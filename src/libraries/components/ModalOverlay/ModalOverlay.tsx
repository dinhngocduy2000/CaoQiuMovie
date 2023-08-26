import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  navigation: any;
};

const ModalOverlay = (props: Props) => {
  const {navigation}: any = props;
  return (
    <View
      // onPress will never be called 😢
      style={[
        StyleSheet.absoluteFillObject,
        {backgroundColor: 'rgba(0,0,0,0.7)'},
      ]}
    />
  );
};

export default ModalOverlay;

const styles = StyleSheet.create({});
