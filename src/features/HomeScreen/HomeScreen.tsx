import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {Svg, SvgXml} from 'react-native-svg';
import svgs from '../assets/svg/svg_tabbar';
import homeSVGs from '../assets/svg/svg_home';
import movieArrays from './testData./testData';
import {IMAGE_URL, axios_get} from '../../apiHelper/api';
import {api_url} from '../../apiHelper/URL_ENUM';
import {
  NOW_PLAYING,
  NOW_PLAYING_RESULT,
} from '../../libraries/types/now_playing_res';
import {genre, genre_list} from '../../libraries/types/genre_list';
import {POPULAR_MOVIE} from '../../libraries/types/popular_list';
import MovieTag from '../../libraries/components/MovieTags/movieTag';
import {StackHeaderProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
type Props = {};

const HomeScreen = ({navigation}: any) => {
  const width = Dimensions.get('window').width;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const height = Dimensions.get('window').height;
  const [genres, setGenres] = useState<genre[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NOW_PLAYING_RESULT[]>([]);
  const insets = useSafeAreaInsets();
  const [upcoming, setUpcoming] = useState<NOW_PLAYING_RESULT[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [popularList, setPopularList] = useState<NOW_PLAYING_RESULT[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<NOW_PLAYING_RESULT>();
  const fetchNowPlaying = async () => {
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

  useEffect(() => {
    fetchNowPlaying();
    fetchGenreList();
    fetchPopularList();
    fetchUpcomingList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFocus(true);
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
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <View style={styles.safe_area_ctn}>
      <ScrollView keyboardDismissMode="on-drag" style={[styles.home_ctn]}>
        <Animated.View
          style={{
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <ImageBackground
            fadeDuration={2}
            style={[
              {
                height: height / 3,
                width: width,
                position: 'absolute',
              },
            ]}
            blurRadius={3}
            // resizeMode="contain"
            source={{
              uri: IMAGE_URL + '/w300' + selectedMovie?.backdrop_path,
            }}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
        </Animated.View>
        <View style={[styles.header_ctn, {paddingTop: insets.top}]}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.search_ctn}>
              <TextInput
                placeholder="Search your Movies..."
                placeholderTextColor={'white'}
                style={styles.search_input}
                returnKeyType="done"
              />
              <SvgXml
                xml={svgs.search_icon}
                onPress={() => console.log('SEARCH')}
                width={20}
                height={20}
                style={{position: 'absolute', right: 30, top: 15}}
              />
            </View>
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
            renderItem={({index}) => (
              <TouchableOpacity
                onPress={() => {
                  setIsFocus(false);
                  navigation.push('MovieDetail', {
                    movieId: nowPlaying[index].id,
                  });
                }}>
                <View style={styles.carousel_view}>
                  <Image
                    style={styles.carousel_image}
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
                </View>
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('MovieDetail', {
                        movieId: item.item.id,
                      })
                    }
                    style={styles.movie_ctn}>
                    <View style={{flex: 1}}>
                      <Image
                        source={{
                          uri: IMAGE_URL + '/w300' + item.item.poster_path,
                        }}
                        style={{
                          borderRadius: 30,
                          width: 150,
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
                        {item.item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.removeListener;
                    navigation.push('MovieDetail', {
                      movieId: item.item.id,
                    });
                  }}
                  style={styles.movie_ctn}>
                  <View style={{flex: 1}}>
                    <Image
                      source={{
                        uri: IMAGE_URL + '/w300' + item.item.poster_path,
                      }}
                      style={{
                        borderRadius: 30,
                        width: 150,
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
                        },
                      ]}>
                      {item.item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
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
    backgroundColor: '#000',
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
