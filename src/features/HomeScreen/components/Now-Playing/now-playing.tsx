import {
  Animated,
  AppState,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {fadeIn, fadeOut} from '../../../../libraries/utils/fadeAnimation';
import {genre, genre_list} from '../../../../libraries/types/genre_list';
import {IMAGE_URL, axios_get} from '../../../../apiHelper/api';
import {api_url} from '../../../../apiHelper/URL_ENUM';
import {
  NOW_PLAYING,
  NOW_PLAYING_RESULT,
} from '../../../../libraries/types/now_playing_res';
import {SvgXml} from 'react-native-svg';
import MovieTag from '../../../../libraries/components/MovieTags/movieTag';
import homeSVGs from '../../../assets/svg/svg_home';

type Props = {
  navigation: any;
  setSelectedMovie: React.Dispatch<
    React.SetStateAction<NOW_PLAYING_RESULT | undefined>
  >;
  fadeAnims: Animated.Value[];
  refreshing: boolean;
};

const NowPlayingList = ({
  navigation,
  setSelectedMovie,
  fadeAnims,
  refreshing,
}: Props) => {
  const width = Dimensions.get('window').width;
  const [genres, setGenres] = useState<genre[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<NOW_PLAYING_RESULT[]>([]);
  const convertMovieGenre = (movieGenres: number[]): genre[] => {
    const result: any[] = [];
    if (movieGenres?.length > 0) {
      genres.map((genre: genre) => {
        movieGenres.map((number: number) => {
          if (number === genre.id) {
            result.push(genre);
          }
        });
      });
    }
    return result;
  };
  const fetchNowPlaying = async () => {
    console.log('START FETCHING...');

    const data = {language: 'en-US', page: 1};
    try {
      const res: NOW_PLAYING = await axios_get(api_url.MOVIE_NOW_PLAYING, data);
      setNowPlaying(res.results);
      setSelectedMovie(res.results[0]);
      console.log('NOW PLAYING MOVIES: ', res.results);
    } catch (err) {
      console.log('ERROR: ', err);
    } finally {
      console.log('DONE FETCHING!');
    }
  };
  const fetchGenreList = async () => {
    console.log('START FETCHING...');
    const data = {language: 'en'};
    try {
      const res: genre_list = await axios_get(api_url.GENRE_LIST, data);
      setGenres(res.genres);
      console.log('GENRE LIST: ', res.genres);
    } catch (err) {
      console.log('ERROR: ', err);
    } finally {
      console.log('DONE FETCHING!');
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFocus(true);
      fadeIn(500, fadeAnims[0]);
      console.log('IS FOCUSING');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', (nextAppState: any) => {
      setIsFocus(false);
      console.log('IS BLURING ', nextAppState);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log('use effect triggered');

    fetchGenreList();
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    if (refreshing) {
      //   fetchGenreList();
      console.log('REFRESHING...');

      fetchNowPlaying();
    }
  }, [refreshing]);

  useEffect(() => {
    console.log('APPSTATE CHECK: ' + AppState.currentState);
  }, [AppState]);

  const renderCarouselItem = (index: number): React.JSX.Element => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsFocus(false);
          navigation.push('MovieDetail', {
            movieId: nowPlaying[index].id,
          });
        }}>
        <Animated.View style={[styles.carousel_view, {opacity: fadeAnims[1]}]}>
          <Image
            style={styles.carousel_image}
            onLoadEnd={() => fadeIn(500, fadeAnims[1])}
            source={{
              uri: IMAGE_URL + '/w500' + nowPlaying[index].poster_path,
            }}
          />
          <View style={styles.movie_info_view}>
            <View style={styles.movie_rating}>
              <SvgXml width={30} height={30} xml={homeSVGs.rating} />
              <Text style={styles.rating_number}>
                {nowPlaying[index].vote_average}{' '}
                {`(${nowPlaying[index].vote_count})`}
              </Text>
            </View>
            <Text style={styles.movie_title}>{nowPlaying[index].title}</Text>
            {genres.length > 0 && (
              <MovieTag tags={convertMovieGenre(nowPlaying[index].genre_ids)} />
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.carousel_ctn}>
      <Text style={styles.text_title}>Now Playing</Text>
      <Carousel
        loop
        width={width}
        height={800}
        style={{marginVertical: -60}}
        autoPlay={isFocus === true ? true : false}
        data={nowPlaying}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        autoPlayInterval={5000}
        mode="parallax"
        onSnapToItem={index => {
          setSelectedMovie(nowPlaying[index]);
          console.log('current index:', nowPlaying[index]);
        }}
        onScrollBegin={() => {
          console.log('abc');
          fadeOut(1000, fadeAnims[0]);
        }}
        onScrollEnd={() => {}}
        renderItem={({index}) => renderCarouselItem(index)}
      />
    </View>
  );
};

export default NowPlayingList;

const styles = StyleSheet.create({
  carousel_ctn: {
    flex: 1,
  },
  text_title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 30,
    paddingTop: 25,
  },
  carousel_view: {
    height: 800,
    width: '100%',
    padding: 0,
  },
  carousel_image: {
    flex: 4,
    width: '100%',
    borderRadius: 30,
  },
  movie_info_view: {
    alignItems: 'center',
  },
  movie_rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  rating_number: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: 5,
  },
  movie_title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 10,
  },
});
