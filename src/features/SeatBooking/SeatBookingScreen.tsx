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
      <View
        style={{
          height: 700,
          width: '100%',
        }}>
        <YouTube
          apiKey="AIzaSyAXen-VYL0QrSuNUSQa-yNSTzyGn6FsiWA"
          videoId={videoKey} // The YouTube video ID
          play // control playback of video with true/false
          modestbranding={true}
          fullscreen={true} // control whether the video should play in fullscreen or inline
          // onReady={e => this.setState({ isReady: true })}
          // onChangeQuality={e => this.setState({ quality: e.quality })}
          // onError={e => this.setState({ error: e.error })}
          style={{height: 300}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({});
