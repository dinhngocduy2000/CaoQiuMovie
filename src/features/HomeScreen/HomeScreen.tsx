import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ImageBackground,
  Animated,
  RefreshControl,
  AppState,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {IMAGE_URL} from '../../apiHelper/api';
import {NOW_PLAYING_RESULT} from '../../libraries/types/now_playing_res';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchInputComponent from '../../libraries/components/SearchInputs/SearchInputComponent';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import {fadeIn} from '../../libraries/utils/fadeAnimation';
import UpComingMovies from './components/upcoming-movies/upcoming-movies';
import PopularMovies from './components/Popular-moviles/popular-movies';
import NowPlayingList from './components/Now-Playing/now-playing';
import {getScreenHeight} from '../../libraries/utils/getScreenHeight';
import {getScreenWidth} from '../../libraries/utils/getScreenWidth';

const HomeScreen = ({navigation}: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const [searchTitle, setSearchTitle] = useState<string>('');
  const insets = useSafeAreaInsets();
  const [selectedMovie, setSelectedMovie] = useState<NOW_PLAYING_RESULT>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });
  const handleSubmitSearch = () => {
    console.log('SEARCHING');
    navigation.navigate('SearchResult', {searchTitle: searchTitle});
  };
  const onRefresh = () => {
    console.log('REFRESHING...' + AppState);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('HOME SCREEN FOCUSING');

      AppState.currentState === 'active' && onRefresh();
    });

    return unsubscribe;
  }, [navigation, AppState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('blur');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.safe_area_ctn}>
      <ScrollView
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            progressViewOffset={40}
            style={{zIndex: 10}}
            colors={[COLOR_ENUM.PRIMARY_COLOR]}
            tintColor={COLOR_ENUM.PRIMARY_COLOR}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={[styles.home_ctn]}>
        <Animated.View
          style={{
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <ImageBackground
            style={[
              {
                height: getScreenHeight() / 3,
                width: getScreenWidth(),
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
        <>
          <NowPlayingList
            navigation={navigation}
            setSelectedMovie={setSelectedMovie}
            fadeAnims={[fadeAnim, fadeAnim2]}
            refreshing={refreshing}
          />
        </>
        <>
          <PopularMovies navigation={navigation} refreshing={refreshing} />
        </>
        <>
          <UpComingMovies navigation={navigation} refreshing={refreshing} />
        </>
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
});
