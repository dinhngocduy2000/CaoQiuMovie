import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IMAGE_URL} from '../../../apiHelper/api';

type Props = {
  navigation: any;
  movieId: number;
  posterPath: string;
  title: string;
  marginRight?: number;
  marginBottom?: number;
  imageWidth?: number;
};

const MovieOverviewComponent = ({
  navigation,
  title,
  movieId,
  posterPath,
  marginRight,
  marginBottom,
  imageWidth,
}: Props) => {
  const movie_ctn = {
    marginRight: marginRight === undefined ? 25 : marginRight,
    marginBottom: marginBottom === undefined ? 0 : marginBottom,

    width: imageWidth === undefined ? 150 : imageWidth,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('MovieDetail', {
          movieId: movieId,
        })
      }
      style={[movie_ctn]}>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: IMAGE_URL + '/w300' + posterPath,
          }}
          style={{
            borderRadius: 30,
            width: imageWidth === undefined ? 150 : imageWidth,
            minHeight: 250,
          }}
        />
        <Text
          style={[
            styles.movie_title,
            {
              fontSize: 14,
              fontWeight: '600',
              marginTop: 15,
              flex: 1,
              flexWrap: 'wrap',
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieOverviewComponent;

const styles = StyleSheet.create({
  movie_title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 10,
  },
});
