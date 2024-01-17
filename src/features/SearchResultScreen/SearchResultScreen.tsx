import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchInputComponent from '../../libraries/components/SearchInputs/SearchInputComponent';
import {axios_get} from '../../apiHelper/api';
import {api_url} from '../../apiHelper/URL_ENUM';
import {SearchResult} from '../../libraries/types/searchResult';
import {NOW_PLAYING_RESULT} from '../../libraries/types/now_playing_res';
import MovieOverviewComponent from '../../libraries/components/MovieOverview/MovieOverviewComponent';
import {ActivityIndicator} from 'react-native';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import {getScreenHeight} from '../../libraries/utils/getScreenHeight';
import {getScreenWidth} from '../../libraries/utils/getScreenWidth';

type Props = {};

const SearchResultScreen = (props: Props) => {
  const {route, navigation}: any = props;
  const [searchText, setSearchText] = useState<string>('');
  const {searchTitle} = route?.params || '';
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<NOW_PLAYING_RESULT[]>([]);
  const fetchSearchResult = async (searchText: string) => {
    if (searchTitle || searchText) {
      setLoading(true);
      console.log('START SEARCHING: ', searchResults);

      const data = {
        query: searchText,
        include_adult: 'false',
        language: 'en-US',
        page: '2',
      };
      try {
        const res: SearchResult = await axios_get(api_url.SEARCH_MOVIES, data);
        setSearchResults(res.results);
        console.log('SEARCH RESULT: ', res.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchSearchResult(searchTitle);
  }, [searchTitle]);

  return (
    <View style={styles.search_result_ctn}>
      <SafeAreaView style={{marginBottom: 30}}>
        <SearchInputComponent
          defaultValue={searchTitle || ''}
          placeholder="Search your movies..."
          isSearch
          onChangeText={text => {
            console.log(text);
            setSearchText(text);
          }}
          onSubmitEditing={() => fetchSearchResult(searchText)}
        />
      </SafeAreaView>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLOR_ENUM.DARK_MODE,
            justifyContent: 'center',
            height: getScreenHeight(),
            width: '100%',
          }}>
          <ActivityIndicator size={'large'} color={'#FF5524'} />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          numColumns={2}
          renderItem={item => (
            <MovieOverviewComponent
              navigation={navigation}
              movieId={item.item.id}
              marginBottom={30}
              imageWidth={getScreenWidth() / 2.5}
              marginRight={0}
              posterPath={item.item.poster_path}
              title={item.item.title}
            />
          )}
        />
      )}
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  search_result_ctn: {
    backgroundColor: COLOR_ENUM.DARK_MODE,
    flex: 1,
    paddingHorizontal: 30,
  },
});
