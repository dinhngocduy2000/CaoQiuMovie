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
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
type Props = {};

const HomeScreen = (props: Props) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const movieCategory = ['action', 'thriller', 'crime'];
  const [genres, setGenres] = useState<genre[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NOW_PLAYING_RESULT[]>([]);
  const fetchNowPlaying = async () => {
    const data = {language: 'en-US', page: 1};
    try {
      const res: NOW_PLAYING = await axios_get(api_url.MOVIE_NOW_PLAYING, data);
      setNowPlaying(res.results);
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
      console.log('ERROR FETCHING GENRE: ', err);
    } finally {
      console.log('DONE FETCHING!');
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
  }, []);
  return (
    <SafeAreaView style={styles.safe_area_ctn}>
      <ScrollView keyboardDismissMode="on-drag" style={styles.home_ctn}>
        <View style={styles.header_ctn}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.search_ctn}>
              <TextInput
                placeholder="Search your Movies..."
                placeholderTextColor={'#FFFFFF52'}
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
            autoPlay={true}
            data={nowPlaying}
            scrollAnimationDuration={1000}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            autoPlayInterval={3000}
            mode="parallax"
            onSnapToItem={index =>
              console.log('current index:', nowPlaying[index])
            }
            renderItem={({index}) => (
              <TouchableOpacity>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        {convertMovieGenre(nowPlaying[index].genre_ids).map(
                          (genre: genre, number: number) => (
                            <View style={styles.categoryView} key={genre.id}>
                              <Text style={{color: 'white'}}>{genre.name}</Text>
                            </View>
                          ),
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <Text style={styles.text_title}>Popular</Text>
          <FlatList
            data={movieArrays}
            keyExtractor={item => item.id}
            horizontal
            style={{paddingHorizontal: 30, marginTop: 10}}
            renderItem={item => (
              <TouchableOpacity style={styles.movie_ctn}>
                <View>
                  <Image source={item.item.image} />
                  <Text
                    style={[
                      styles.movie_title,
                      {fontSize: 14, fontWeight: '600', marginTop: 15},
                    ]}>
                    {item.item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <Text style={styles.text_title}>Upcoming</Text>
          <FlatList
            data={movieArrays}
            keyExtractor={item => item.id}
            horizontal
            style={{paddingHorizontal: 30, marginTop: 10}}
            renderItem={item => (
              <TouchableOpacity style={styles.movie_ctn}>
                <View>
                  <Image source={item.item.image} />
                  <Text
                    style={[
                      styles.movie_title,
                      {fontSize: 14, fontWeight: '600', marginTop: 15},
                    ]}>
                    {item.item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    // paddingTop: 10,
  },
  header_ctn: {
    paddingTop: 15,
    paddingHorizontal: 30,
  },
  search_ctn: {
    width: '100%',
    borderColor: '#202020',
    borderWidth: 1,
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
    // resizeMode: 'contain',
    borderRadius: 30,
  },
  movie_info_view: {
    alignItems: 'center',
  },
  movie_rating: {
    // flex: 1,
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
  categoryView: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
  },
  movie_ctn: {
    marginRight: 25,
  },
});
