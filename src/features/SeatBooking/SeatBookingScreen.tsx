import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import {log} from 'console';
type Props = {};

const SeatBookingScreen = (props: Props) => {
  const {route}: any = props;
  const {videoKey} = route.params;

  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <Text>SeatBookingScreen</Text>
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({});
