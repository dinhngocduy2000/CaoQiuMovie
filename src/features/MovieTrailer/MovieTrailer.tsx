import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
type Props = {};

const MovieTrailer = (props: Props) => {
  const {navigation, route}: any = props;
  const {videoKey} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  console.log(videoKey);

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
          {backgroundColor: 'rgba(0, 0, 0, 0.7)'},
        ]}
        onPress={navigation.goBack}
      />
      <View
        style={{
          width: '100%',
          height: 400,
        }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#ff5524'} />
        ) : (
          <View>
            <YoutubePlayer height={400} play={true} videoId={videoKey} />
          </View>
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
