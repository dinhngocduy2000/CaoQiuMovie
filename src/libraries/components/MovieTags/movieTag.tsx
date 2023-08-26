import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genre} from '../../types/genre_list';

type Props = {
  tags: genre[];
};

const MovieTag = (props: Props) => {
  const {tags} = props;
  return (
    <View style={styles.category_ctn}>
      {tags?.map((genre: genre, number: number) => (
        <View style={styles.categoryView} key={genre.id}>
          <Text style={{color: 'white'}}>{genre.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default MovieTag;

const styles = StyleSheet.create({
  category_ctn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryView: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
});
