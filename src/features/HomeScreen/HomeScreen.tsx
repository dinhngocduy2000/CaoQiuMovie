import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Animated,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {Svg, SvgXml} from 'react-native-svg';
import homeSVGs from '../assets/svg/svg_home';
import {IMAGE_URL, axios_get} from '../../apiHelper/api';
import {api_url} from '../../apiHelper/URL_ENUM';
import {
  NOW_PLAYING,
  NOW_PLAYING_RESULT,
} from '../../libraries/types/now_playing_res';
import {genre, genre_list} from '../../libraries/types/genre_list';
import {POPULAR_MOVIE} from '../../libraries/types/popular_list';
import MovieTag from '../../libraries/components/MovieTags/movieTag';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchInputComponent from '../../libraries/components/SearchInputs/SearchInputComponent';
import MovieOverviewComponent from '../../libraries/components/MovieOverview/MovieOverviewComponent';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import {fadeIn, fadeOut} from '../../libraries/utils/fadeAnimation';
type Props = {};

const HomeScreen = ({navigation}: any) => {
  const width = Dimensions.get('window').width;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  const height = Dimensions.get('window').height;
  const [genres, setGenres] = useState<genre[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NOW_PLAYING_RESULT[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const insets = useSafeAreaInsets();
  const [upcoming, setUpcoming] = useState<NOW_PLAYING_RESULT[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [popularList, setPopularList] = useState<NOW_PLAYING_RESULT[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<NOW_PLAYING_RESULT>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const windowHeight = Dimensions.get('window').height;
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

  const handleSubmitSearch = () => {
    console.log('SEARCHING');
    navigation.navigate('SearchResult', {searchTitle: searchTitle});
  };

  useEffect(() => {
    fetchNowPlaying();
    fetchGenreList();
    fetchPopularList();
    fetchUpcomingList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFocus(true);
      fadeIn(500, fadeAnim);
      console.log('IS FOCUSING');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsFocus(false);
      console.log('IS BLURING');
    });

    return unsubscribe;
  }, [navigation]);
  const onRefresh = React.useCallback(() => {
    console.log('REFRESHING...');
    setRefreshing(true);
    fetchNowPlaying();
    fetchGenreList();
    fetchPopularList();
    fetchUpcomingList();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);
  //   useEffect(()=>{
  //     Animated.timing(opacity, {
  //         toValue: 1,
  //         duration: 300,
  //         easing: Easing.spring,
  //         useNativeDriver: true
  //     }).start(()=>{
  //         setPreviousImage(props.source);
  //         opacity.setValue(0);
  //     })
  // }, [props.source])
  // useEffect(() => {
  //   fadeIn(500, fadeAnim);
  // }, [selectedMovie]);
  return refreshing ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_ENUM.DARK_MODE,
        justifyContent: 'center',
        height: windowHeight,
        width: '100%',
      }}>
      {/* <SvgXml xml={svgs.logo} width={200} height={200} /> */}
      <Image
        source={{
          uri: 'https://media.tenor.com/RcX3hUY425kAAAAi/toothless-dragon-toothless.gif',
        }}
        style={{width: 400, height: 400}}
      />
      <Text style={{color: 'white', fontSize: 24}}>Refreshing...</Text>
    </View>
  ) : (
    <View style={styles.safe_area_ctn}>
      <ScrollView
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.home_ctn]}>
        <Animated.View
          style={{
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <ImageBackground
            style={[
              {
                height: height / 3,
                width: width,
                position: 'absolute',
              },
            ]}
            blurRadius={3}
            onLoadEnd={() => fadeIn(100, fadeAnim)}
            // resizeMode="contain"
            source={{
              uri: IMAGE_URL + '/w300' + selectedMovie?.backdrop_path,
            }}>
            <LinearGradient
              colors={['#00000000', COLOR_ENUM.DARK_MODE]}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
        </Animated.View>
        <View style={[styles.header_ctn, {paddingTop: insets.top}]}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <SearchInputComponent
              placeholder="Search your Movies..."
              isSearch
              onChangeText={setSearchTitle}
              onSubmitEditing={handleSubmitSearch}
            />
          </TouchableWithoutFeedback>
        </View>
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
              fadeOut(1000, fadeAnim);
            }}
            onScrollEnd={() => {}}
            renderItem={({index}) => (
              <TouchableOpacity
                onPress={() => {
                  setIsFocus(false);
                  navigation.push('MovieDetail', {
                    movieId: nowPlaying[index].id,
                  });
                }}>
                <Animated.View
                  style={[styles.carousel_view, {opacity: fadeAnim2}]}>
                  <Image
                    style={styles.carousel_image}
                    onLoadEnd={() => fadeIn(500, fadeAnim2)}
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
                    <Text style={styles.movie_title}>
                      {nowPlaying[index].title}
                    </Text>
                    {genres.length > 0 && (
                      <MovieTag
                        tags={convertMovieGenre(nowPlaying[index].genre_ids)}
                      />
                    )}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            )}
          />
        </View>
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
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe_area_ctn: {
    flex: 1,
    backgroundColor: COLOR_ENUM.DARK_MODE,
  },
  home_ctn: {
    flex: 1,
  },
  header_ctn: {
    paddingTop: 15,
    paddingHorizontal: 30,
  },
  search_ctn: {
    width: '100%',
    borderColor: 'white',
    borderWidth: 2,
    height: 50,
    borderRadius: 16,
    position: 'relative',
    marginTop: 20,
  },
  search_input: {
    color: 'white',
    flex: 1,
    paddingHorizontal: 30,
    fontSize: 15,
  },
  text_title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 30,
    paddingTop: 25,
  },
  carousel_ctn: {
    flex: 1,
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

  movie_ctn: {
    marginRight: 25,
    width: 150,
  },
});
