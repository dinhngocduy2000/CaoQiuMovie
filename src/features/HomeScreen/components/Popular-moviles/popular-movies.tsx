import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MovieOverviewComponent from '../../../../libraries/components/MovieOverview/MovieOverviewComponent';
import {NOW_PLAYING_RESULT} from '../../../../libraries/types/now_playing_res';
import {POPULAR_MOVIE} from '../../../../libraries/types/popular_list';
import {axios_get} from '../../../../apiHelper/api';
import {api_url} from '../../../../apiHelper/URL_ENUM';

type Props = {
  navigation: any;
  refreshing: boolean;
};

const PopularMovies = ({navigation, refreshing}: Props) => {
  const [popularList, setPopularList] = useState<NOW_PLAYING_RESULT[]>([]);
  const fetchPopularList = async () => {
    console.log('START FETCHING...');
    const data = {language: 'en-US', page: '1'};
    try {
      const res: POPULAR_MOVIE = await axios_get(api_url.MOVIE_POPULAR, data);
      setPopularList(res.results);
      console.log('POPULAR MOVIES: ', res);
    } catch (err: any) {
      console.log('ERROR FETCHING POPULAR LIST: ', err);
    } finally {
      console.log('DONE FETCHING POPULAR LIST...');
    }
  };
  useEffect(() => {
    fetchPopularList();
  }, []);
  useEffect(() => {
    refreshing && fetchPopularList();
  }, [refreshing]);

  return (
    <View>
      <Text style={styles.text_title}>Popular</Text>
      {popularList.length > 0 && (
        <FlatList
          data={popularList}
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
      )}
    </View>
  );
};

export default PopularMovies;

const styles = StyleSheet.create({
  text_title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 30,
    paddingTop: 25,
  },
});
