import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IMAGE_URL, axios_get} from '../../apiHelper/api';
import {MovieDetails, videos_result} from '../../libraries/types/movie_detail';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {convertToHour} from '../../libraries/utils/convertMinutesToHours';
import {SvgXml} from 'react-native-svg';
import SVG_MovieDetail from '../assets/svg/svg_movieDetail';
import MovieTag from '../../libraries/components/MovieTags/movieTag';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import homeSVGs from '../assets/svg/svg_home';
import {FlatList} from 'react-native-gesture-handler';
import {fadeIn} from '../../libraries/utils/fadeAnimation';
type Props = {};

const MovieDetail = (props: Props) => {
  const {navigation, back, route, layout}: any = props;
  const {movieId} = route.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const av = new Animated.Value(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  av.addListener(() => {
    return;
  });
  const fetchMovieDetail = async () => {
    const data = {
      language: 'en-US',
      append_to_response: 'credits,videos',
    };
    try {
      const res: any = await axios_get('/movie/' + movieId, data);
      console.log('MOVIE DETAIL: ', res.videos);
      setMovieDetails(res);
    } catch (err) {
      console.log('ERROR FETCHING MOVIE DETAIL: ');
    } finally {
      console.log('DONE FETCHING MOVIE DETAIL');
    }
  };
  useEffect(() => {
    fetchMovieDetail();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('gestureStart', (e: Event) => {
      // Do somethingnav
      navigation.removeListener;
    });

    return unsubscribe;
  }, [navigation]);

  return movieDetails ? (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{
        backgroundColor: 'black',
        width: windowWidth,
        flex: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'black',
          flex: 1,
          paddingBottom: insets.bottom,
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <Animated.View
          style={[
            styles.header_background,
            {height: windowHeight, opacity: fadeAnim2},
          ]}>
          <ImageBackground
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => {
              setIsLoading(false);
              fadeIn(500, fadeAnim2);
              console.log(
                'LOADING ENDS',
                movieDetails.videos.results.filter(
                  (video: videos_result) =>
                    video.type === 'Trailer' && video.official === true,
                ),
              );
            }}
            source={{
              uri: IMAGE_URL + '/original' + movieDetails?.backdrop_path,
            }}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
        </Animated.View>
        {loading && movieDetails ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'black',
              justifyContent: 'center',
              height: windowHeight,
              width: '100%',
            }}>
            <ActivityIndicator size={'large'} color={'#FF5524'} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              width: windowWidth,
              paddingTop: insets.top + 80,
            }}>
            <View
              style={{
                flex: 1,
                width: windowWidth,
                alignItems: 'center',
              }}>
              <Animated.View
                style={{
                  width: '100%',
                  opacity: fadeAnim,
                }}>
                <Image
                  source={{
                    uri: IMAGE_URL + '/original' + movieDetails?.poster_path,
                  }}
                  loadingIndicatorSource={{
                    uri: 'https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Emotes-face-smile-icon.png',
                  }}
                  onLoadEnd={() => fadeIn(500, fadeAnim)}
                  style={{
                    width: '100%',
                    height: 500,
                    resizeMode: 'contain',
                  }}
                />
                <TouchableHighlight
                  onPress={() => {
                    // setPlayTrailer(true);
                    navigation.push('MovieTrailer', {
                      videoKey: movieDetails.videos.results.find(
                        (video: videos_result) =>
                          video.type === 'Trailer' && video.official === true,
                      )?.key,
                    });
                  }}
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: 'white',
                    borderRadius: 30,
                    position: 'absolute',
                    top: '45%',
                    left: windowWidth / 2 - 30,
                  }}>
                  <SvgXml
                    xml={SVG_MovieDetail.play_video}
                    height={60}
                    width={60}
                  />
                </TouchableHighlight>
              </Animated.View>

              <View
                style={{
                  width: '75%',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <SvgXml
                    width={20}
                    height={20}
                    xml={SVG_MovieDetail.run_time}
                  />

                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '600',
                      marginLeft: 5,
                    }}>
                    {convertToHour(movieDetails?.runtime)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  {movieDetails?.title}
                </Text>

                <MovieTag tags={movieDetails?.genres || []} />
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontSize: 16,
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  {movieDetails?.tagline}
                </Text>
              </View>
            </View>
            <View style={{width: windowWidth, padding: 23}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                  width: windowWidth / 2,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SvgXml xml={homeSVGs.rating} />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '600',
                      marginHorizontal: 3,
                    }}>
                    {movieDetails?.vote_average.toFixed(1)}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
                    {'(' + movieDetails?.vote_count + ')'}
                  </Text>
                </View>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
                  {moment(movieDetails?.release_date).format('LL')}
                </Text>
              </View>
              <Text style={{color: 'white', fontSize: 15}}>
                {movieDetails?.overview}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                width: windowWidth,
                paddingLeft: 23,
                marginBottom: 23,
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                Top Cast
              </Text>
              <FlatList
                data={movieDetails?.credits.cast}
                keyExtractor={item => item.credit_id}
                style={{marginTop: 20, flex: 1}}
                horizontal
                renderItem={item => {
                  return item.item.order < 10 ? (
                    <View
                      style={{
                        width: 75,
                        marginRight: 20,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          borderRadius: 30,
                          width: 50,
                          minHeight: 75,
                        }}
                        height={75}
                        width={50}
                        source={{
                          uri: IMAGE_URL + '/w500' + item.item.profile_path,
                        }}
                      />
                      <Text style={{color: 'white', fontSize: 12}}>
                        {item.item.name}
                      </Text>
                    </View>
                  ) : null;
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('HI');
                navigation.push('SeatBooking', {
                  videoKey: movieDetails.videos.results[0].key,
                });
              }}>
              <View
                style={{
                  width: 125,
                  height: 36,
                  borderRadius: 20,
                  backgroundColor: '#FF5524',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                  Select Seats
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  ) : (
    <View style={{flex: 1, backgroundColor: 'black', height: '100%'}}>
      <ActivityIndicator size={'large'} color={'#FF5524'} />
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  header_background: {
    // height: 50,
    // backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});
