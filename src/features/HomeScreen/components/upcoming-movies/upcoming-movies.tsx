import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NOW_PLAYING,
  NOW_PLAYING_RESULT,
} from '../../../../libraries/types/now_playing_res';
import {axios_get} from '../../../../apiHelper/api';
import {api_url} from '../../../../apiHelper/URL_ENUM';
import MovieOverviewComponent from '../../../../libraries/components/MovieOverview/MovieOverviewComponent';

type Props = {
  navigation: any;
  refreshing: boolean;
};

const UpComingMovies = ({navigation, refreshing}: Props) => {
  const [upcoming, setUpcoming] = useState<NOW_PLAYING_RESULT[]>([]);
  const fetchUpcomingList = async () => {
    const data = {language: 'en-US', page: '1'};
    try {
      console.log('START FETCHING...');

      const res: NOW_PLAYING = await axios_get(api_url.MOVIE_UPCOMING, data);
      setUpcoming(res.results);
      console.log('POPULAR MOVIES: ', res);
    } catch (err: any) {
      console.log('ERROR FETCHING POPULAR LIST: ', err);
    } finally {
      console.log('DONE FETCHING POPULAR LIST...');
    }
  };
  useEffect(() => {
    fetchUpcomingList();
  }, []);

  useEffect(() => {
    refreshing && fetchUpcomingList();
  }, [refreshing]);

  return (
    <View>
      <Text style={styles.text_title}>Upcoming</Text>
      <FlatList
        data={upcoming}
        keyExtractor={item => item.id.toString()}
        horizontal
        style={{paddingHorizontal: 30, marginTop: 10}}
        renderItem={item => {
          return (
            <MovieOverviewComponent
              navigation={navigation}
              movieId={item.item.id}
              title={item.item.title}
              posterPath={item.item.poster_path}
            />
          );
        }}
      />
    </View>
  );
};

export default UpComingMovies;

const styles = StyleSheet.create({
  text_title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 30,
    paddingTop: 25,
  },
});
