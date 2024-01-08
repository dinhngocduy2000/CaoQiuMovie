import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {SvgXml} from 'react-native-svg';
import svgs from '../../../features/assets/svg/svg_tabbar';

type Props = {
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  onSubmitEditing?: any;
  defaultValue?: string;
  isPassword?: boolean;
  isSearch?: boolean;
  style?: {};
};

const SearchInputComponent = (props: Props) => {
  const {
    onChangeText,
    placeholder,
    onSubmitEditing,
    defaultValue,
    isSearch,
    isPassword,
    style,
  } = props;
  return (
    <View style={[styles.search_ctn, style]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'lightgray'}
        onChangeText={title => {
          if (onChangeText) {
            onChangeText(title);
          }
        }}
        defaultValue={defaultValue}
        secureTextEntry={isPassword || false}
        style={styles.search_input}
        onSubmitEditing={() => {
          if (onSubmitEditing) {
            console.log('SUMITTING');

            onSubmitEditing();
          }
        }}
        returnKeyType="done"
      />
      {isSearch === true && (
        <SvgXml
          xml={svgs.search_icon}
          onPress={() => console.log('SEARCH')}
          width={20}
          height={20}
          style={{position: 'absolute', right: 30, top: 15}}
        />
      )}
    </View>
  );
};

export default SearchInputComponent;

const styles = StyleSheet.create({
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
});
