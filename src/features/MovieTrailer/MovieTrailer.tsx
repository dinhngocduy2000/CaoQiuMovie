import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import YouTube from 'react-native-youtube';

type Props = {};

const MovieTrailer = (props: Props) => {
  const {navigation, route}: any = props;
  const {videoKey} = route.params;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.movieTrailer_ctn}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={navigation.goBack}
      />
      <View
        style={{
          width: '100%',
        }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#ff5524'} />
        ) : (
          <YouTube
            apiKey="AIzaSyAXen-VYL0QrSuNUSQa-yNSTzyGn6FsiWA"
            videoId={videoKey} // The YouTube video ID
            play // control playback of video with true/false
            modestbranding={true}
            fullscreen={true} // control whether the video should play in fullscreen or inline
            // onReady={e => this.setState({ isReady: true })}
            // onChangeQuality={e => this.setState({ quality: e.quality })}
            // onError={e => this.setState({ error: e.error })}
            style={{height: 400}}
          />
        )}
      </View>
    </View>
  );
};

export default MovieTrailer;

const styles = StyleSheet.create({
  movieTrailer_ctn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
